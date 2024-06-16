"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
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
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
dotenv_1.default.config();
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:80']
};
// middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
// middleware
app.post(`${commonRes_1.baseUrl}/register`, login_controller_1.signUp);
app.post(`${commonRes_1.baseUrl}/login`, login_controller_1.login);
app.post(`${commonRes_1.baseUrl}/post-data`, multer_1.default.single('image'), auth_1.requireAuth, blog_controller_1.authorPost);
app.get(`${commonRes_1.baseUrl}/author-get`, blog_controller_1.authorGetPost);
app.put(`${commonRes_1.baseUrl}/author-update`, blog_controller_1.updatePost);
app.delete(`${commonRes_1.baseUrl}/author-delete`, blog_controller_1.deletePost);
app.get(`${commonRes_1.baseUrl}/post-get`, auth_1.requireAuth, blog_controller_1.getPostById);
app.get(`${commonRes_1.baseUrl}/get`, blog_controller_1.allPost);
app.get(`${commonRes_1.baseUrl}/post`, auth_1.requireAuth, post_controller_1.getAuthorPosts);
app.post('/upload', multer_1.default.single('image'), fileUpload_1.fileUpload);
app.get('/upload-get', fileUpload_1.fileUploadGet);
app.post('/category', post_controller_1.categoryPost);
app.get('/all-category', auth_1.requireAuth, post_controller_1.categoryPostGet);
app.get('/category-single', post_controller_1.categoryPostbyId);
app.post('/comment', auth_1.requireAuth, post_controller_1.commentPost);
app.get('/comment-get', post_controller_1.getAllComment);
app.put('/comment-update', post_controller_1.updateAllPost);
app.put('/comment-delete', post_controller_1.deleteAllComment);
// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map