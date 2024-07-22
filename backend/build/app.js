"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./middleware/auth");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const post_controller_1 = require("./controller/post.controller");
const fileUpload_1 = require("./controller/fileUpload");
const multer_1 = __importDefault(require("./middleware/multer"));
const dotenv_1 = __importDefault(require("dotenv"));
const login_controller_1 = require("./controller/login/login.controller");
const commonRes_1 = require("./utils/commonRes");
const blog_controller_1 = require("./controller/blog/blog.controller");
const cart_controller_1 = require("./controller/cart/cart.controller");
const client_1 = require("@prisma/client");
const checkoutcontroller_1 = require("./controller/cart/checkoutcontroller");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
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
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
const prisma = new client_1.PrismaClient();
io.on("connection", (socket) => {
    socket.on("JOIN_ROOM", (room) => __awaiter(void 0, void 0, void 0, function* () {
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
    }));
    socket.on("NEW_MESSAGE", (msg) => __awaiter(void 0, void 0, void 0, function* () {
        const { room, id, text, name, messages } = msg;
        io.to(room).emit("NEW_MESSAGE", { id, text, name, messages });
        console.log(`Message in room ${room} from ${id}: ${text} : ${name} :${messages === null || messages === void 0 ? void 0 : messages.text}`);
        try {
            yield prisma.chat_bot.create({
                data: {
                    socketId: socket.id,
                    name,
                    room,
                },
            });
            console.log(`User ${socket.id} joining room ${room} saved to database.`);
        }
        catch (error) {
            console.error(`Error saving user ${socket.id} joining room ${room} to database: `, error);
        }
    }));
    socket.on("disconnect", () => {
        console.log(`Socket ${socket.id} disconnected`);
    });
});
// Define routes
app.post(`${commonRes_1.baseUrl}/register`, login_controller_1.signUp);
app.post(`${commonRes_1.baseUrl}/login`, login_controller_1.login);
app.post(`${commonRes_1.baseUrl}/post-data`, multer_1.default.single('image'), auth_1.requireAuth, blog_controller_1.authorPost);
app.get(`${commonRes_1.baseUrl}/author-get`, blog_controller_1.authorGetPost);
app.put(`${commonRes_1.baseUrl}/author-update`, blog_controller_1.updatePost);
app.delete(`${commonRes_1.baseUrl}/author-delete`, blog_controller_1.deletePost);
app.get(`${commonRes_1.baseUrl}/post-get`, blog_controller_1.getPostById);
app.get(`${commonRes_1.baseUrl}/get`, blog_controller_1.allPost);
app.get(`${commonRes_1.baseUrl}/post`, post_controller_1.getAuthorPosts);
app.post('/upload', multer_1.default.single('image'), fileUpload_1.fileUpload);
app.get('/upload-get', fileUpload_1.fileUploadGet);
app.post('/category', post_controller_1.categoryPost);
app.get('/all-category', auth_1.requireAuth, post_controller_1.categoryPostGet);
app.get('/category-single', post_controller_1.categoryPostbyId);
app.post(`${commonRes_1.baseUrl}/comment`, post_controller_1.commentPost);
app.get(`${commonRes_1.baseUrl}/comment-get`, post_controller_1.getAllComment);
app.put(`${commonRes_1.baseUrl}/comment-update`, post_controller_1.updateAllPost);
app.put(`${commonRes_1.baseUrl}/comment-delete`, post_controller_1.deleteAllComment);
app.get(`${commonRes_1.baseUrl}/product-all`, cart_controller_1.cartData);
app.post(`${commonRes_1.baseUrl}/product/create`, cart_controller_1.productAdd);
app.get(`${commonRes_1.baseUrl}/all-chat`, cart_controller_1.chatData);
app.post(`${commonRes_1.baseUrl}/cart-create`, checkoutcontroller_1.checkoutPage);
app.get(`${commonRes_1.baseUrl}/cart-all`, checkoutcontroller_1.checkoutPageAll);
app.get(`${commonRes_1.baseUrl}/cart-all-day`, checkoutcontroller_1.checkoutPageAllDayWise);
app.get(`${commonRes_1.baseUrl}/create-payment-intent`, checkoutcontroller_1.checkoutPagePayment);
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
//# sourceMappingURL=app.js.map