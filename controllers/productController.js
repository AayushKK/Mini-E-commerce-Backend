import Product from '../models/Product.js';
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary';

// Helper to upload buffer to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: "products" }, (err, result) => {
      if (err) reject(err);
      else resolve(result.secure_url);
    }).end(fileBuffer);
  });
};



export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const getProducts = async (req, res) => {




  try {

    // search , sort, fields, operator, limit, page , skip

    const excludesFields = ['sort', 'search', 'limit', 'fields', 'skip', 'page'];

    const queryObj = { ...req.query };


    excludesFields.forEach((label) => delete queryObj[label]);

    if (req.query.search) {
      queryObj.title = { $regex: req.query.search, $options: 'i' }
      // queryObj.brand = { $regex: req.query.search, $options: 'i' }
    }


    let qStr = JSON.stringify(queryObj);



    qStr = qStr.replace(/\b(gte|gt|lte|lt|eq)\b/g, match => `$${match}`);


    let query = Product.find(JSON.parse(qStr));


    if (req.query.sort) {
      const filterSorts = req.query.sort?.split(/[\s,]+/).filter(Boolean).join(' ');
      query = query.sort(filterSorts);

    }

    if (req.query.fields) {
      const filterFlelds = req.query.fields?.split(/[\s,]+/).filter(Boolean).join(' ');
      query = query.select(filterFlelds);

    }


    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const response = await query.skip(skip).limit(limit);

    return res.status(200).json({ length: response.length, products: response });
  } catch (err) {
    return res.status(400).json({ err: `${err}` });
  }
}

export const addProduct = async (req, res) => {
  const { title, description, price, category, stock } = req.body;
  try {
    let imageUrl = null;

    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer);
    }

    await Product.create({
      title,
      description,
      price,
      stock,
      image: imageUrl,
      category
    });

    return res.status(201).json({ message: 'Product added successfully' });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  const { title, description, price, category, stock } = req.body;
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Update fields
    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stock = stock || product.stock;

    if (req.file) {
      const newImageUrl = await uploadToCloudinary(req.file.buffer);
      product.image = newImageUrl;
    }

    await product.save();
    return res.status(200).json({ message: 'Product updated successfully' });

  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const removeProduct = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await Product.findByIdAndDelete(id);

    // (Optional) Delete Cloudinary image here if you're storing public_id too

    return res.status(200).json({ message: 'Product deleted successfully' });

  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};