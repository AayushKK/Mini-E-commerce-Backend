
import express from 'express';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import 'dotenv/config';
import mongoose from 'mongoose';
import './config/cloudinary.js';
const app = express();
import cors from 'cors';
mongoose.connect(process.env.MONGO_URI).then((val) => {
  app.listen(3000, () => {
    console.log('Database connected and listening');
  });

}).catch((err) => {
  console.log(err);
});


// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:5173', 'https://e-commerce-front-sage.vercel.app'],
  credentials: true
}));

// Or for development (allows all origins)
app.use(cors());
app.use(express.json());

app.use(express.static('uploads'));

app.get('/', (req, res) => {
  return res.status(200).json([11, 22, 44, 55]);
});


app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);






// import express from "express";
// import multer from "multer";
// import { v2 as cloudinary } from 'cloudinary';
// import fs from 'fs';
// import dotenv from 'dotenv';

// // Load environment variables
// dotenv.config();
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads');
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${file.originalname}`);
//   }
// });

// const app = express();


// const upload = multer({
//   storage
// });



// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });





// app.post('/', upload.single('image'), (req, res) => {
//   console.log(req.file.path);
//   cloudinary.uploader.upload(req.file.path, (err, result) => {
//     if (err) return res.status(400).json({ message: `${err}` });
//     fs.unlink(req.file.path, (err) => {
//       if (err) return res.status(400).json({ message: `${err}` });
//     });
//     return res.status(200).json(result.secure_url);
//   });


// })


// app.listen(5000, () => {
//   console.log('Server listening on port 5000');
// });
