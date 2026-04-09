# REST API for User Management


## Project Overview

This is a **REST API for User Management** that demonstrates best practices in web development. It includes:
- Complete CRUD operations (Create, Read, Update, Delete)
- Modern, responsive UI with dark/light theme toggle
- Professional architecture with MVC pattern
- Comprehensive error handling and validation
- RESTful API design principles

## ✨ Features

- **Complete REST API** - GET, POST, PUT, DELETE operations
- **User Management** - Create, read, update, and delete users
- **Search Functionality** - Search users by name or email
- **Modern UI** - Professional, user-friendly interface
- **Dark/Light Theme** - Toggle between dark and light themes with sun/moon icons
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Error Handling** - Comprehensive error validation and messages
- **Form Validation** - Client and server-side validation
- **RESTful Principles** - Follows REST API best practices
- **MVC Pattern** - Organized controller and route structure
- **Favicon Support** - Professional favicons included
- **CORS Enabled** - Cross-origin requests supported
- **In-Memory Database** - Quick setup without external DB

## Project Structure

```
rest-api-for-user-management/
├── public/                      # Frontend files
│   ├── index.html              # Main HTML file
│   ├── styles.css              # Styling with theme support
│   ├── script.js               # Client-side JavaScript
│   ├── favicon.ico             # Favicon (32x32)
│   └── favicon-16x16.png       # Favicon 16x16 PNG
├── src/
│   ├── controllers/
│   │   └── userController.js   # User business logic
│   ├── routes/
│   │   └── userRoutes.js       # API routes
│   ├── models/
│   │   └── User.js             # User model (in-memory DB)
│   └── app.js                  # Express app configuration
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── package.json                # Project dependencies
├── server.js                   # Server entry point
└── README.md                   # This file
```

## Technologies Used

| Technology | Purpose | Version |
|-----------|---------|---------|
| **Node.js** | JavaScript Runtime | 14+ |
| **Express.js** | Web Framework | 4.18+ |
| **UUID** | Unique ID Generation | 9.0+ |
| **CORS** | Cross-Origin Support | 2.8+ |
| **dotenv** | Environment Config | 16.0+ |
| **CSS3** | Styling & Themes | Latest |
| **Fetch API** | HTTP Requests | Native |
| **Font Awesome** | Icons | 6.4.0 |
| **Google Fonts** | Typography | Inter |

## Prerequisites

Ensure you have installed:

- **Node.js** (v14.0 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for cloning)

### Verify Installation

```bash
node --version
npm --version
```

## Getting Started

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd user-management-api
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all required packages:
- express
- cors
- dotenv
- uuid
- nodemon (dev dependency)

### Step 3: Setup Environment Variables

```bash
cp .env.example .env
```

Edit `.env` if needed (default values work fine):
```
PORT=5000
NODE_ENV=development
API_BASE_URL=http://localhost:5000/api
CORS_ORIGIN=*
```

### Step 4: Start the Server

#### Development Mode (with auto-reload using nodemon)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

**Expected Output:**
```
Server is running on http://localhost:5000
API Documentation: http://localhost:5000/api/docs
```

### Step 5: Access the Application

- **Frontend UI**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api/docs
- **API Base URL**: http://localhost:5000/api/users

## API Endpoints

### 1. Get All Users

```http
GET /api/users
```

**cURL Example:**
```bash
curl -X GET http://localhost:5000/api/users
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1-555-0101",
      "createdAt": "2026-01-15T10:30:00.000Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "phone": "+1-555-0102",
      "createdAt": "2026-02-10T14:45:00.000Z"
    }
  ]
}
```

---

### 2. Get User by ID

```http
GET /api/users/:id
```

**cURL Example:**
```bash
curl -X GET http://localhost:5000/api/users/550e8400-e29b-41d4-a716-446655440000
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-555-0101",
    "createdAt": "2026-01-15T10:30:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "User not found"
}
```

---

### 3. Create New User

```http
POST /api/users
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "phone": "+1-555-0103"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "phone": "+1-555-0103"
  }'
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440003",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "phone": "+1-555-0103",
    "createdAt": "2026-04-05T10:30:00.000Z"
  }
}
```

**Validation Error Response (400):**
```json
{
  "success": false,
  "error": "Please provide name, email, and phone"
}
```

**Duplicate Email Error (409):**
```json
{
  "success": false,
  "error": "Email already exists"
}
```

---

### 4. Update User

```http
PUT /api/users/:id
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "john.smith@example.com",
  "phone": "+1-555-9999"
}
```

**cURL Example:**
```bash
curl -X PUT http://localhost:5000/api/users/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "email": "john.smith@example.com",
    "phone": "+1-555-9999"
  }'
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Smith",
    "email": "john.smith@example.com",
    "phone": "+1-555-9999",
    "createdAt": "2026-01-15T10:30:00.000Z"
  }
}
```

**Note:** You can update any combination of fields (name, email, phone)

---

### 5. Delete User

```http
DELETE /api/users/:id
```

**cURL Example:**
```bash
curl -X DELETE http://localhost:5000/api/users/550e8400-e29b-41d4-a716-446655440000
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-555-0101",
    "createdAt": "2026-01-15T10:30:00.000Z"
  }
}
```

---

### 6. Search Users

```http
GET /api/users/search?q=query
```

**cURL Example:**
```bash
curl -X GET "http://localhost:5000/api/users/search?q=john"
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1-555-0101",
      "createdAt": "2026-01-15T10:30:00.000Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440003",
      "name": "John Smith",
      "email": "john.smith@example.com",
      "phone": "+1-555-9999",
      "createdAt": "2026-04-05T10:30:00.000Z"
    }
  ]
}
```

---

## Frontend Features

### Theme Toggle
- Click the **sun/moon icon** in the top-right corner to toggle between light and dark themes
- Theme preference is saved in browser localStorage
- Smooth transitions between themes

### Navigation
- **All Users** - View all users in a grid layout
- **Add User** - Create new users with validation
- **Search Users** - Search by name or email
- **API Docs** - View API documentation

### User Cards
Each user card displays:
- User initials avatar
- Full name and email
- Phone number
- Creation date
- Edit and Delete buttons

### Responsive Design
- Desktop: Full sidebar + main content layout
- Tablet: Adjusted spacing and grid
- Mobile: Stacked layout, full-width elements

## Testing the API

### Using cURL

```bash
# Get all users
curl http://localhost:5000/api/users

# Create a user
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Bob","email":"bob@test.com","phone":"+1-555-0104"}'

# Update a user (replace {id} with actual ID)
curl -X PUT http://localhost:5000/api/users/{id} \
  -H "Content-Type: application/json" \
  -d '{"name":"Robert","email":"robert@test.com"}'

# Delete a user
curl -X DELETE http://localhost:5000/api/users/{id}

# Search users
curl "http://localhost:5000/api/users/search?q=bob"
```

### Using Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Create a new collection
3. Add requests for each endpoint above
4. Set headers: `Content-Type: application/json`
5. Test with the provided request bodies

### Using JavaScript Fetch

```javascript
// Get all users
fetch('http://localhost:5000/api/users')
  .then(res => res.json())
  .then(data => console.log(data));

// Create user
fetch('http://localhost:5000/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Bob Wilson',
    email: 'bob@example.com',
    phone: '+1-555-0104'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

## Validation Rules

### Name
- Required field
- Minimum 2 characters
- Maximum 100 characters

### Email
- Required field
- Valid email format (pattern: `^[^\s@]+@[^\s@]+\.[^\s@]+$`)
- Must be unique across all users
- Case-insensitive uniqueness check

### Phone
- Required field
- Minimum 10 characters
- Maximum 20 characters
- Accepts international formats

## Error Handling

The API returns descriptive error messages:

| Status | Error | Description |
|--------|-------|-------------|
| 400 | Missing Fields | Required fields are not provided |
| 400 | Invalid Email | Email format is incorrect |
| 404 | User Not Found | User ID doesn't exist |
| 409 | Duplicate Email | Email already registered |
| 500 | Server Error | Unexpected server error |

## Data Storage

Currently uses **in-memory storage** for quick setup. For production, replace `src/models/User.js` with:
- MongoDB
- PostgreSQL
- MySQL
- Firebase
- Any other database

## Deployment

### Deploy to Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

### Deploy to AWS

Use AWS Elastic Beanstalk or EC2 with Node.js runtime.

## 📖 Learning Outcomes

After completing this assignment, you will understand:

- **Express Routing** - How to define and organize routes
- **Controller Pattern** - Separating business logic from routes
- **REST Principles** - Proper API design and HTTP methods
- **CRUD Operations** - Create, Read, Update, Delete implementations
- **Error Handling** - Validation and error responses
- **Frontend-Backend Integration** - Consuming APIs from UI
- **Responsive Design** - CSS for all device sizes
- **Theme Implementation** - Dark/Light mode with localStorage
- **Professional UI** - Modern design with user experience focus
- **Project Structure** - Organizing code professionally

## File Descriptions

### Backend Files

| File | Purpose |
|------|---------|
| `server.js` | Application entry point |
| `src/app.js` | Express configuration and middleware |
| `src/routes/userRoutes.js` | API route definitions |
| `src/controllers/userController.js` | Business logic |
| `src/models/User.js` | Data model and in-memory DB |

### Frontend Files

| File | Purpose |
|------|---------|
| `public/index.html` | Main UI page |
| `public/styles.css` | Complete styling with themes |
| `public/script.js` | Client-side logic |
| `public/favicon.ico` | Browser favicon |
| `public/favicon-16x16.png` | Favicon PNG |

### Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `.env.example` | Environment template |
| `.gitignore` | Git ignore rules |
| `README.md` | Documentation |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Assignment Requirements Met

- REST API with GET, POST, PUT, DELETE routes
- Controllers & routes structure (MVC pattern)
- Express routing implementation
- Controller pattern implementation
- REST principles followed
- Professional UI design
- Light & Dark theme toggle
- Sun/Moon icon theme indicators
- Favicons included
- README.md documentation
- User-friendly interface
- Responsive design

## Troubleshooting

### Port Already in Use

```bash
# Change port in .env
PORT=3000

# Or kill the process on port 5000
# On Mac/Linux:
lsof -i :5000
kill -9 <PID>

# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors

Ensure `.env` has:
```
CORS_ORIGIN=*
```

### Theme Not Persisting

Clear browser cache and localStorage:
```javascript
localStorage.clear()
```

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation at `/api/docs`
3. Check browser console for errors
4. Ensure server is running on correct port

## Summary

This project provides a **complete, professional solution** for User Management with:
- Full REST API implementation
- Modern, responsive frontend
- Professional architecture
- Comprehensive documentation
- Production-ready code quality

Perfect for learning Express.js, REST APIs, and professional web development practices!

---

**Created by**:   Eissa Iqbal

**Last Updated**: March 26, 2026  

**Version**: 1.0.0
