# 📚 Book Review API

A simple Node.js + Express.js REST API for managing books and user reviews with JWT-based authentication and MongoDB (Atlas).

## 🚀 Features
- ✅ User Signup & Login with JWT token  
- ✅ Add new books (authentication required)  
- ✅ Fetch all books or a specific book by ID  
- ✅ Search books by title  
- ✅ Add reviews to books (authentication required)  

## 🛠️ Tech Stack
- Node.js  
- Express.js  
- MongoDB (Atlas)  
- Mongoose  
- JSON Web Token (JWT)  
- dotenv  

## 🧑‍💻 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/book-review-api.git
cd book-review-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create a `.env` File
Create a `.env` file in the root directory and add the following:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
```
🔁 Replace `<username>` and `<password>` with your MongoDB Atlas credentials.  
🔐 Replace `your_jwt_secret_key` with any secure random string.

### 4. Start the Server
```bash
npm start
```
Server will run at `http://localhost:5000`.

## 📫 API Endpoints

### 🔐 Auth

#### POST `/api/signup`
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

#### POST `/api/login`
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```
**Response:**
```json
{
  "token": "your_jwt_token"
}
```

### 📚 Books

#### POST `/api/books` (Auth required)
**Headers:**
```
Authorization: Bearer <your_token>
```
**Request Body:**
```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "description": "A self-help book about habit formation."
}
```

#### GET `/api/books`
Returns all books.

#### GET `/api/books/:id`
Returns a specific book by ID.

#### GET `/api/search?q=<title>`
Search books by title.

### ✍️ Reviews

#### POST `/api/books/:id/reviews` (Auth required)
**Headers:**
```
Authorization: Bearer <your_token>
```
**Request Body:**
```json
{
  "comment": "Amazing book, very helpful!",
  "rating": 5
}
```

## 🧪 Testing
Use Postman, Thunder Client, or any REST client to test endpoints.  
Make sure to pass the JWT token in the `Authorization` header as shown below:
```
Authorization: Bearer <your_token>
```

## 📄 License
This project is licensed under the MIT License.
