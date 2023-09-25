const express = require('express');
const PORT = process.env.PORT || 5001;
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb')
const authRouter = require('./authRouter');
const app = express();
const http = require("http").createServer(app)
const Chats = require('./models/Chats')
const urlLocal = 'http://localhost:5001'
const urlDeploy = 'https://test4-ulov.onrender.com'

const io = require('socket.io')(http, {
  cors: {
    origin: urlDeploy,
    methods: ["GET", "POST"]
  }
})
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});
app.use('/auth', authRouter);
mongoose.set('strictQuery', false);
// const client = new MongoClient(
//   'mongodb+srv://Doroshkeviches:Doroshkeviches@cluster0.reh70fb.mongodb.net/RS_Clone?retryWrites=true&w=majority',
// )
const users = {}
io.on('connection', (socket) => {
  socket.on('join', async (roomId) => {
    try {
      console.log('join Back')
      let result = await Chats.findOne({
        "_id": roomId
      });
      if (!result) {
        console.log('create')
        await Chats.create({ "_id": roomId, messages: [] })
      }
      socket.join(roomId);
      socket.emit('joined', roomId);
      socket.activeRoom = roomId
    } catch (e) {
      console.log(e)
    }

  })
  socket.on('joinVideo', async (roomId) => {
    try {
      socket.join(roomId);
      console.log('connected? index.js')
      socket.activeRoom = roomId

    } catch (e) {
      console.log(e)
    }
  })
  socket.on('messageVideo', (data) => {
    console.log('messageVideo index.js')
    io.to(socket.activeRoom).emit('message', {
      data
    })
  })
  socket.on('message', async ({ message, author, avatar }) => {
    await Chats.findOneAndUpdate({ "_id": socket.activeRoom }, {
      $push: {
        "messages": {
          message,
          author,
          avatar,
          date: Date.now()
        }
      }
    })

    io.to(socket.activeRoom).emit('message', {
      message,
      author,
      avatar,
      date: Date.now()
    })
  })
})

const start = async () => {
  try {
    await mongoose.connect('mongodb+srv://Doroshkeviches:Doroshkeviches@cluster0.reh70fb.mongodb.net/RS_Clone?retryWrites=true&w=majority');
    http.listen(PORT, () => console.log(`server start on port ${PORT}`));
  } catch (e) {
    console.error(e);
  }
};
start();
