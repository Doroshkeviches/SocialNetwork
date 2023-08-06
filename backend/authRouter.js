const Router = require('express');
const router = new Router();
const controller = require('./authController');
const { check } = require('express-validator');
const minPasswordLenght = 4;
const maxPasswordLenght = 10;

router.post(
  `/registration`,
  [
    check('username', 'Username cannot be empty').notEmpty(),
    check(
      'password',
      `Password must be more than ${minPasswordLenght} and less than ${maxPasswordLenght} characters`
    ).isLength({ min: 4, max: 10 }),
  ],
  controller.registration
);
router.post('/authorization', controller.authorization)
router.post('/addNewPost', controller.addNewPost)
router.get('/getAllPosts', controller.getAllPosts)
router.get('/getMyPosts', controller.getMyPosts)
router.get('/chats', controller.getRoomId)
router.get('/getAllUsers', controller.getAllUsers)


router.post('/increasePostLike', controller.increasePostLike)
router.post('/decreasePostLike', controller.decreasePostLike)
router.post('/addComment', controller.addComment)







module.exports = router;
