import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import { PrismaClient } from '@prisma/client';
// import cors from "cors";
import { deleteUser, getAllBasicPay, getAllDatas ,  getAllDeduction, login, signUp, updateController, updateUser, userController } from './controller/user.controller';
// import { DataController } from './controller/getAllUser.controller';

// const dataController = new DataController();
import { getAllData } from './controller/user.controller';
import cors from "cors";

const app = express();
const port = 4000;

const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:80'] 
};


// middleware
app.use(express.json());
app.use(cors(corsOptions));


// app.use(express.static('public'));


// route
app.post("/post", userController)
app.get("/find/:id", updateController)
// app.get("/get", getAllData)
app.delete("/delete/:id", deleteUser)
app.put("/update/:id", updateUser)

// app.get('/allData', (req, res) => dataController.getAllData(req, res));


app.get("/all", getAllDatas)


app.post("/allBasic", getAllBasicPay)
app.post("/ded", getAllDeduction)



app.get('/getAllData', getAllData)



app.post('/register', signUp)
app.post('/login', login)


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



