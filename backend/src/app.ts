import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from "cors";
import { requireAuth } from './middleware/auth';
import cookieParser from "cookie-parser";
import { categoryPost, categoryPostGet, categoryPostbyId, commentPost, deleteAllComment, getAllComment, getAuthorPosts, updateAllPost } from './controller/post.controller';
import { fileUpload, fileUploadGet } from './controller/fileUpload';
import upload from './middleware/multer';
import dotenv from 'dotenv';
import { login, signUp } from './controller/login/login.controller';
import { baseUrl } from './utils/commonRes';

import { allPost, authorGetPost, authorPost, deletePost, getPostById, updatePost } from './controller/blog/blog.controller';
import { cartData, chatData, productAdd } from './controller/cart/cart.controller';
import { PrismaClient } from "@prisma/client";
import { checkoutPage, checkoutPageAll, checkoutPageAllDayWise, checkoutPagePayment } from './controller/cart/checkoutcontroller';

dotenv.config();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 4000;

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:80']
};

// middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());


const prisma = new PrismaClient();

io.on("connection", (socket) => {
  socket.on("JOIN_ROOM", async (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
    io.to(room).emit("USER_JOINED", socket.id);

    const dummyMessages = [
      `Welcome to the chat!`,
      "How are you!",
      "Tell us your issue!",
      "Fill up the form<br>1. Name<br>2. Email<br>3. Address<br>4. Issue",
    ];

    dummyMessages.forEach((message) => {
      io.to(room).emit("NEW_MESSAGE", { id: "System", text: message });
    });
  });

  socket.on("NEW_MESSAGE", async (msg) => {
    const { room, id, text, name, messages } = msg;
    io.to(room).emit("NEW_MESSAGE", { id, text , name, messages });
    console.log(`Message in room ${room} from ${id}: ${text} : ${name} :${messages?.text}`);
    
     try {
      await prisma.chat_bot.create({
        data: {
          socketId: socket.id,
          name,
          room,
        },
      });
      console.log(`User ${socket.id} joining room ${room} saved to database.`);
    } catch (error) {
      console.error(`Error saving user ${socket.id} joining room ${room} to database: `, error);
  }
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});


// Define routes
app.post(`${baseUrl}/register`, signUp);
app.post(`${baseUrl}/login`, login);
app.post(`${baseUrl}/post-data`, upload.single('image'), requireAuth, authorPost);
app.get(`${baseUrl}/author-get`, authorGetPost);
app.put(`${baseUrl}/author-update`, updatePost);
app.delete(`${baseUrl}/author-delete`, deletePost);
app.get(`${baseUrl}/post-get`, getPostById);
app.get(`${baseUrl}/get`, allPost);
app.get(`${baseUrl}/post`, getAuthorPosts);
app.post('/upload', upload.single('image'), fileUpload);
app.get('/upload-get', fileUploadGet);
app.post('/category', categoryPost);
app.get('/all-category', requireAuth, categoryPostGet);
app.get('/category-single', categoryPostbyId);
app.post(`${baseUrl}/comment`, commentPost);
app.get(`${baseUrl}/comment-get`, getAllComment);
app.put(`${baseUrl}/comment-update`, updateAllPost);
app.put(`${baseUrl}/comment-delete`, deleteAllComment);

app.get(`${baseUrl}/product-all`, cartData);
app.post(`${baseUrl}/product/create`, productAdd);
app.get(`${baseUrl}/all-chat`, chatData);


app.post(`${baseUrl}/cart-create`, checkoutPage)
app.get(`${baseUrl}/cart-all`, checkoutPageAll)
app.get(`${baseUrl}/cart-all-day`, checkoutPageAllDayWise)
app.get(`${baseUrl}/create-payment-intent`, checkoutPagePayment)









// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// const axios = require('axios');

// io.on("connection", (socket) => {
//   socket.on("JOIN_ROOM", async (room, name) => {
//     socket.join(room);
//     console.log(`User ${socket.id} joined room ${room}`);
//     io.to(room).emit("USER_JOINED", { id: socket.id, name });

//     // Save user joining information to an API
//     try {
//       await axios.post('https://your-api-endpoint.com/user-joined', {
//         socketId: socket.id,
//         room,
//         name,
//         joinedAt: new Date()
//       });
//       console.log(`User ${socket.id} joining room ${room} saved to API.`);
//     } catch (error) {
//       console.error(`Error saving user ${socket.id} joining room ${room} to API: `, error);
//     }

//     // Notify admin
//     const adminRoom = 'admin'; // Assumes the admin is connected to a room called 'admin'
//     io.to(adminRoom).emit("USER_JOINED_NOTIFICATION", { id: socket.id, room, name });

//     const dummyMessages = [
//       `Welcome to the chat! ${name}`,
//       "How are you!",
//       "Tell us your issue!",
//       "Fill up the form<br>1. Name<br>2. Email<br>3. Address<br>4. Issue",
//     ];

//     dummyMessages.forEach((message) => {
//       io.to(room).emit("NEW_MESSAGE", { id: "System", text: message });
//     });
//   });

//   socket.on("NEW_MESSAGE", (msg) => {
//     const { room, id, text, name } = msg;
//     io.to(room).emit("NEW_MESSAGE", { id, text, name });
//     console.log(`Message in room ${room} from ${id}: ${text} : ${name}`);
//   });

//   socket.on("disconnect", () => {
//     console.log(`Socket ${socket.id} disconnected`);
//   });
// });
