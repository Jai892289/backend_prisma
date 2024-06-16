import express from 'express';
import cors from "cors";
import { requireAuth } from './middleware/auth';
import cookieParser from "cookie-parser";
import { categoryPost, categoryPostGet, categoryPostbyId, commentPost, deleteAllComment, getAllComment, getAuthorPosts, updateAllPost } from './controller/post.controller';
import { fileUpload, fileUploadGet } from './controller/fileUpload';
import upload from './middleware/multer';
import dotenv from 'dotenv';
import { login, signUp } from './controller/login/login.controller';
import { baseUrl } from './utils/commonRes';

import { allPost, authorGetPost, authorPost, deletePost, getPostById , updatePost} from './controller/blog/blog.controller';

const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config();

const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:80'] 
};


// middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// middleware

app.post(`${baseUrl}/register`, signUp)
app.post(`${baseUrl}/login`, login)



app.post(`${baseUrl}/post-data`, upload.single('image'),requireAuth, authorPost)
app.get(`${baseUrl}/author-get`, authorGetPost)
app.put(`${baseUrl}/author-update`, updatePost)
app.delete(`${baseUrl}/author-delete`, deletePost)



app.get(`${baseUrl}/post-get`, requireAuth, getPostById)
app.get(`${baseUrl}/get`, allPost)
app.get(`${baseUrl}/post`,requireAuth, getAuthorPosts)



app.post('/upload', upload.single('image'), fileUpload);
app.get('/upload-get', fileUploadGet);


app.post('/category', categoryPost)
app.get('/all-category', requireAuth, categoryPostGet)
app.get('/category-single', categoryPostbyId)


app.post('/comment',requireAuth, commentPost);
app.get('/comment-get', getAllComment);
app.put('/comment-update', updateAllPost);
app.put('/comment-delete', deleteAllComment);


// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});