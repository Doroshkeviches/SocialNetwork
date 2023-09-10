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
    origin: urlLocal,
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
const client = new MongoClient(
  'mongodb+srv://Doroshkeviches:Doroshkeviches@cluster0.reh70fb.mongodb.net/RS_Clone?retryWrites=true&w=majority',
)
const users = {}
io.on('connection', (socket) => {
  socket.on('join', async (roomId) => {
    try {
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
  let id

  // функция принимает `id` адресата, тип события и полезную нагрузку - данные для передачи
  const emit = (userId, event, data) => {
    // определяем получателя
    const receiver = users[userId]
    if (receiver) {
      // вызываем событие
      receiver.emit(event, data)
    }
  }
  socket
    .on('init', (value) => {
      id = value
      users[id] = socket
      console.log(id, 'connected')
      socket.emit('init', { id })
    })
    .on('request', (data) => {
      console.log(data, 'request')
      emit(data.to, 'request', { from: id })
    })
    .on('call', (data) => {
      console.log(data, 'call')

      emit(data.to, 'call', { ...data, from: id })
    })
    .on('end', (data) => {
      console.log(data, 'end')

      emit(data.to, 'end')
    })
    .on('disconnect', () => {
      console.log('disconect')

      delete users[id]
      console.log(id, 'disconnected')
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
