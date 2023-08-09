const User = require('./models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const Post = require('./models/Post');
const Chats = require('./models/Chats');
const generateAccessToken = require('./utils')
class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.errors[0].msg, errors });
      }
      const { username, password, avatar } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: 'A user with the same name already exists' });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({
        username,
        password: hashPassword,
        avatar: avatar || 'https://vk.com/images/camera_200.png'
      });
      await user.save();
      return res.json({ message: `The user has been successfully registered`, isRegistered: true });
    } catch (e) {
      res.status(400).json({ message: 'Registration error', e });
    }
  }

  async authorization(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `User ${username} not found` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Incorrect password` });
      }
      const token = generateAccessToken(user.username);
      return res.json({ token });
    } catch (e) {
      res.status(400).json({ message: 'Authorization error', e });
    }
  }

  async addNewPost(req, res) {
    try {
      const {
        avatar,
        author,
        text,
        image
      } = req.body;
      const post = new Post({
        _id: Math.random(),
        avatar,
        author,
        date: Date.now(),
        text: text ? text : null,
        likes: [],
        comments: [],
        image: image ? image : [],
      })
      await post.save()
      res.status(200).json({
        message: 'Post saved'
      })
    } catch (e) {
      res.status(400).json({ message: 'Authorization error', e });
    }
  }

  async getAllPosts(req, res) {
    try {
      const limit = req.query.limit || 5
      const page = req.query.page || 1
      const skip = (page - 1) * limit
      const posts = await Post.find({}).sort({ "date": -1 }).skip(skip).limit(limit)
      const count = await Post.count()
      res.json({
        count,
        posts: posts
      })
    } catch (e) {
      res.status(400).json({ message: 'Authorization error', e });
    }
  }

  async getMyPosts(req, res) {
    try {
      const { author } = req.query
      const posts = await Post.find({
        author
      })
      res.json(posts)
    } catch (e) {
      res.status(400).json({ message: 'Authorization error', e });
    }
  }

  async increasePostLike(req, res) {
    try {
      const {
        author,
        avatar,
        _id
      } = req.body;
      await Post.findOneAndUpdate({ _id }, {
        $push: {
          likes: {
            author,
            avatar
          }
        }
      })
      res.json({ message: 'post was updated' })
    } catch (e) {
      res.status(400).json({ message: 'Authorization error', e });
    }
  }

  async decreasePostLike(req, res) {
    try {
      const {
        author,
        avatar,
        _id
      } = req.body;
      await Post.findOneAndUpdate({ _id }, {
        $pull: {
          likes: {
            author,
            avatar
          }
        }
      })
      res.json({ message: 'post updated' })
    } catch (e) {
      res.status(400).json({ message: 'error', e });
    }
  }

  async addComment(req, res) {
    try {
      const {
        author,
        avatar,
        text,
        _id
      } = req.body;
      await Post.findOneAndUpdate({ _id }, {
        $push: {
          comments: {
            author,
            avatar,
            text,
            date: Date.now()
          },
          $position: 0
        }
      })
      res.json({ message: 'comment saved' })
    } catch (e) {
      res.status(400).json({ message: 'error', e });
    }
  }

  async getRoomId(req, res) {
    try {
      const { room } = req.query
      const chat = await Chats.findOne({
        "_id": room
      })
      res.json(chat)
    } catch (e) {
      res.status(400).json({ message: 'Authorization error', e });
    }
  }

  async getAllUsers(req, res) {
    try {
      const chat = await User.find({})
      res.json(chat)
    } catch (e) {
      res.status(400).json({ message: 'error', e });
    }
  }
}

module.exports = new AuthController();
