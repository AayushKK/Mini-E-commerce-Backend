import express from 'express';
import { addProduct, getProduct, getProducts, removeProduct, updateProduct } from '../controllers/productController.js';
import upload from '../middlewares/fileCheck.js';
import { productSchema, validate } from '../utils/validator.js';
import { adminCheck, authCheck } from '../middlewares/authCheck.js';

const router = express.Router();

router.route('/').get(getProducts).post(authCheck, adminCheck, upload.single("image"), validate.body(productSchema), addProduct);

router.route('/:id').get(getProduct).patch(authCheck, adminCheck, upload.single("image"), updateProduct).delete(authCheck, adminCheck, removeProduct);


export default router;