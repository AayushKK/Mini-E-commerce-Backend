// import { v4 as uuidv4 } from 'uuid';



// const imageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp', 'image/svg'];

// export const fileCheck = (req, res, next) => {
//   const file = req.files?.image;
//   if (!file) {
//     return res.status(400).json({ message: 'image is required' });
//   }
//   if (!imageTypes.includes(file.mimetype)) {
//     return res.status(400).json({ message: 'Invalid file type' });
//   }
//   const imagePath = `/${uuidv4()}-${file.name}`;

//   file.mv(`./uploads/${imagePath}`, (err) => {
//     if (err) return res.status(400).json({ message: `${err}` });
//     req.imagePath = imagePath;
//     return next();
//   });


// }

// export const updateFileCheck = (req, res, next) => {

//   const file = req.files?.image;
//   if (!file) return next();

//   if (!imageTypes.includes(file.mimetype)) return res.status(400).json({ message: 'please provide a valid image' });
//   const imagePath = `/${uuidv4()}-${file.name}`;

//   file.mv(`./uploads${imagePath}`, (err) => {
//     if (err) return res.status(400).json({ message: `${err}` });
//     req.imagePath = imagePath;
//     return next();
//   });



// }


import multer from "multer";


const imageTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp", "image/svg"];

// Configure Multer for file upload
const storage = multer.memoryStorage(); // Use memory storage for direct Cloudinary upload

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!imageTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type. Only images are allowed."), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;