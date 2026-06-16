# 🛒 E-Commerce Backend API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)

A RESTful backend API for an e-commerce platform built with **Node.js**, **Express.js**, **MongoDB**, and **Cloudinary**. The API supports user authentication, product management, image uploads, and order processing with secure role-based access control.

---

## 🌐 Live API

**Base URL**

https://mini-e-commerce-backend-3ley.onrender.com

> ⚠️ This project is hosted on Render's free tier. The server may take a few seconds to respond if it has been inactive.

---

## 🚀 Features

### 👤 User Management
- User registration
- User login with JWT authentication
- Get user details
- Update user profile

### 📦 Product Management
- Get all products
- Get a single product
- Add new products (Admin only)
- Update existing products (Admin only)
- Delete products (Admin only)
- Upload product images using Cloudinary

### 🛒 Order Management
- Create orders
- View user orders
- View all orders (Admin only)
- View order details

### 🔒 Security
- JWT Authentication
- Protected routes
- Admin authorization
- Request validation
- File upload validation

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cloudinary
- Multer
- Joi / Custom Validation
- Render

---

## 📁 Project Structure

```text
.
├── .github/
│   └── workflows/
│       └── keep-render-awake.yml
│
├── config/
│   └── cloudinary.js
│
├── controllers/
│   ├── orderController.js
│   ├── productController.js
│   └── userController.js
│
├── middlewares/
│   ├── authCheck.js
│   └── fileCheck.js
│
├── models/
│   ├── Order.js
│   ├── Product.js
│   └── User.js
│
├── routes/
│   ├── orderRoutes.js
│   ├── productRoutes.js
│   └── userRoutes.js
│
├── utils/
│   └── validator.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

### Navigate to Project Directory

```bash
cd YOUR_REPOSITORY
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Start the Development Server

```bash
npm run dev
```

### Start Production Server

```bash
npm start
```

---

# 📡 API Documentation

## 👤 User Routes

Base URL:

```http
/api/users
```

| Method | Endpoint | Description | Access |
|----------|----------|-------------|----------|
| POST | /register | Register a user | Public |
| POST | /login | Login user | Public |
| GET | /:id | Get user by ID | Public |
| PATCH | /:id | Update user profile | Authenticated |

### Register

```http
POST /api/users/register
```

Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login

```http
POST /api/users/login
```

Request Body:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

## 📦 Product Routes

Base URL:

```http
/api/products
```

| Method | Endpoint | Description | Access |
|----------|----------|-------------|----------|
| GET | / | Get all products | Public |
| POST | / | Create product | Admin |
| GET | /:id | Get single product | Public |
| PATCH | /:id | Update product | Admin |
| DELETE | /:id | Delete product | Admin |

### Create Product

```http
POST /api/products
```

Headers:

```http
Authorization: Bearer TOKEN
Content-Type: multipart/form-data
```

Form Data:

| Field | Type |
|---------|---------|
| name | Text |
| price | Number |
| description | Text |
| image | File |

---

## 🛒 Order Routes

Base URL:

```http
/api/orders
```

| Method | Endpoint | Description | Access |
|----------|----------|-------------|----------|
| GET | / | Get all orders | Admin |
| POST | / | Create order | Authenticated |
| GET | /users/:id | Get orders by user | Authenticated |
| GET | /:id | Get order by ID | Public* |

### Create Order

```http
POST /api/orders
```

Headers:

```http
Authorization: Bearer TOKEN
```

Request Example:

```json
{
  "products": [
    {
      "product": "productId",
      "quantity": 2
    }
  ],
  "totalPrice": 1200
}
```

---

## 🔐 Authentication

Protected routes require a JWT token.

Example:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🛡️ Middleware

### Authentication Middleware

```javascript
authCheck
```

Verifies JWT tokens before allowing access to protected routes.

### Admin Authorization

```javascript
adminCheck
```

Restricts access to administrative actions such as creating, updating, and deleting products.

### File Upload Middleware

```javascript
upload.single("image")
```

Handles image uploads for products.

### Validation Middleware

```javascript
validate.body(schema)
```

Validates request payloads before processing.

---

## ☁️ Cloudinary Integration

Product images are uploaded and stored securely using Cloudinary.

Benefits:

- Cloud-based image storage
- Fast image delivery
- Optimized image transformations
- Reduced server storage usage

---

## 🔑 Access Control Matrix

| Feature | Guest | User | Admin |
|----------|---------|---------|---------|
| View Products | ✅ | ✅ | ✅ |
| View Product Details | ✅ | ✅ | ✅ |
| Register/Login | ✅ | ✅ | ✅ |
| Update Profile | ❌ | ✅ | ✅ |
| Create Order | ❌ | ✅ | ✅ |
| View Own Orders | ❌ | ✅ | ✅ |
| View All Orders | ❌ | ❌ | ✅ |
| Add Product | ❌ | ❌ | ✅ |
| Update Product | ❌ | ❌ | ✅ |
| Delete Product | ❌ | ❌ | ✅ |

---

## 🚀 Deployment

This API is deployed on Render.

Live URL:

https://mini-e-commerce-backend-3ley.onrender.com

---

## 🧪 Testing

You can test the API using:

- Postman
- Thunder Client
- Insomnia

Example:

```bash
GET https://mini-e-commerce-backend-3ley.onrender.com/api/products
```

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository

```bash
git fork
```

2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push changes

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed by Aayush Kharel

GitHub: https://github.com/AayushKK

---

⭐ If you found this project useful, consider giving it a star on GitHub!
