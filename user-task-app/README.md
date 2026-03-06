# User Task API

Backend API for user authentication and task management.

## Tech Stack

- Node.js
- Express.js
- Prisma ORM
- SQLite
- JWT Authentication
- Jest & Supertest for testing

---

## Setup

Clone the repository

git clone <repo-url>

cd user-task-app

Install dependencies

npm install

---

## Environment Variables

Create `.env` file:

DATABASE_URL="file:./dev.db"
JWT_SECRET="your_secret_key"
PORT=5000

---

## Run Server

npm run dev

Server will start at:

http://localhost:5000

---

## Run Tests

npm test

---

## API Endpoints

### Authentication

POST /auth/register  
POST /auth/login  

### Users

GET /users/me  
GET /users (admin only)  
DELETE /users/:id (admin only)

### Tasks

POST /tasks  
GET /tasks  
PUT /tasks/:id  
DELETE /tasks/:id

---

## Security

- Password hashing using bcrypt
- JWT authentication
- Role-based access control
- Environment variables for secrets

## Testing Screenshots

### Register API
![Register](screenshots)

### Login API
![Login](screenshots)

### Create Task
![Create Task](screenshots)

### Get Tasks
![Get Tasks](screenshots)

### Jest Tests
![Tests](screenshots)