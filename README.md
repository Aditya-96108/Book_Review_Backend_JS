# 📚 Book Review API

A RESTful API for managing books and reviews, built with **Node.js**, **Express**, and **PostgreSQL**.  
Features include user authentication (JWT), book management, review submission, and search functionality.

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd book-review-api
```

2. Install Dependencies

``` bash
npm install

```

3. Set Up PostgreSQL
Install PostgreSQL.

Create a database named book_review_db.

Run the following SQL to create the required tables:

sql
```bash
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    book_id INTEGER REFERENCES books(id),
    user_id INTEGER REFERENCES users(id),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
4. Configure Environment Variables
Create a .env file in the root directory:
env
```bash
PORT=3000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=book_review_db
DB_PASSWORD=your_db_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret
```

🧪 Running the Project Locally
Start the Server
```bash
npm start
Server runs on: http://localhost:3000
```
📡 Key API Endpoints (Explained)
To register a new user, use the POST /auth/signup endpoint with a JSON body containing the username, email, and password. For example:

json
{ "username": "john_doe", "email": "john@example.com", "password": "password123" }
To authenticate an existing user and receive a JWT token, send a request to POST /auth/login with:

json
{ "email": "john@example.com", "password": "password123" }
To add a new book (authentication required), make a request to POST /books with the following data:

json
{ "title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "genre": "Fiction" }
To retrieve all books, use the GET /books endpoint. This supports pagination and filtering through query parameters such as ?page=1&limit=10&author=Scott&genre=Fiction.

To view details of a specific book by its ID, send a GET request to /books/:id.

Authenticated users can submit a review for a book by sending a POST request to /books/:id/reviews with the following payload:

json
{ "rating": 5, "comment": "Amazing book!" }
To update an existing review, send a PUT request to /reviews/:id (authenticated) with updated data like:

json
{ "rating": 4, "comment": "Updated review" }
To delete a review, authenticated users can make a DELETE request to /reviews/:id.

Lastly, to search for books by title or author, use the GET /books/search endpoint with a query parameter like ?q=gatsby.

🔐 All endpoints marked as "Auth" require the Authorization header:
Authorization: Bearer <your-jwt-token>

🔐 Endpoints marked with (Auth) require this header:
Authorization: Bearer <your-jwt-token>


📬 Example API Requests (Postman)
➕ Sign Up
http
```bash
POST http://localhost:3000/auth/signup
Body:
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```
➕ Add a Book
```bash
POST http://localhost:3000/books
Headers:
Authorization: Bearer <your-jwt-token>
Body:
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Fiction"
}
```
💬 Submit a Review
```bash
POST http://localhost:3000/books/1/reviews
Headers:
Authorization: Bearer <your-jwt-token>
Body:
{
  "rating": 5,
  "comment": "Amazing book!"
}

```

🗃️ Database Schema
users: id (PK), username, email (unique), password, created_at
books: id (PK), title, author, genre, created_at
reviews: id (PK), book_id (FK), user_id (FK), rating (1-5), comment, created_at

🧠 Design Decisions
Modular Structure: Organized codebase using MVC (Models, Views, Controllers) pattern for maintainability.

JWT Authentication: Secure user sessions with stateless JWT tokens.

Project Directory Structure :

The project is organized as follows: the root directory book-review-api/ contains the .env, package.json, and README.md files. Inside the src/ directory, you’ll find config/db.js for database configuration; controllers/ with authController.js, bookController.js, and reviewController.js for handling HTTP requests; middleware/ with authMiddleware.js and errorHandler.js for authentication and error handling; models/ with userModel.js, bookModel.js, and reviewModel.js for database operations; routes/ with authRoutes.js, bookRoutes.js, and reviewRoutes.js for API route definitions; utils/ with jwt.js and error.js for utility functions; and finally, app.js and server.js for application setup and server entry point.


Endpoints Existing in the Project 

API Endpoints
POST /auth/signup: Register a new user (Authentication: No)
POST /auth/login: Login and get JWT token (Authentication: No)
POST /books: Add a new book (Authentication: Yes)
GET /books: Get all books (Authentication: No)
GET /books/search: Search books by query (Authentication: No)
GET /books/:id: Get book details (Authentication: No)
POST /books/:id/reviews: Submit a review for a book (Authentication: Yes)
PUT /reviews/:id: Update a review (Authentication: Yes)
DELETE /reviews/:id: Delete a review (Authentication: Yes)

Some Examples : http://localhost:3000/reviews/1
http://localhost:3000/books
