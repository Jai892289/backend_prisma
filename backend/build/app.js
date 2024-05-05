"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import multer from 'multer';
// import path from 'path';
// import { PrismaClient } from '@prisma/client';
// import cors from "cors";
const user_controller_1 = require("./controller/user.controller");
const getAllUser_controller_1 = require("./controller/getAllUser.controller");
const dataController = new getAllUser_controller_1.DataController();
const app = (0, express_1.default)();
const port = 4000;
// middleware
app.use(express_1.default.json());
// app.use(express.static('public'));
// route
app.post("/post", user_controller_1.userController);
app.get("/find/:id", user_controller_1.updateController);
// app.get("/get", getAllData)
app.delete("/delete/:id", user_controller_1.deleteUser);
app.put("/update/:id", user_controller_1.updateUser);
app.get('/allData', (req, res) => dataController.getAllData(req, res));
app.get("/all", user_controller_1.getAllDatas);
app.post("/allBasic", user_controller_1.getAllBasicPay);
app.post("/ded", user_controller_1.getAllDeduction);
// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public'); 
//   },
//   filename: (req, file, cb) => {
//     // const filename = `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`;
//     // cb(null, filename); 
//             cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage });
// const corsOptions = {
//   credentials: true,
//   origin: 'http://localhost:5173', 
// };
// app.use(cors(corsOptions));
// app.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ success: false, message: 'No file uploaded' });
//     }
//     const image  = req.file.filename;
//     const fileData = await prisma.file.create({
//       data: {
//         image,
//       },
//     });
//     res.status(201).json({ success: true, message: 'File uploaded successfully', file: fileData });
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// });
// app.get('/file', async (req, res) => {
//   try {
//     const files = await prisma.file.findMany();
//     res.json({
//       data: {
//         files
//     }
//     });
//   } catch (error) {
//     console.error('Error fetching files:', error);
//     res.status(500).send('Internal server error');
//   }
// });
// app.post('/user', (req, res) => {
// })
//# sourceMappingURL=app.js.map