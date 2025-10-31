🔄 Week 4: Deep Dive into MERN Stack Integration
🚀 Objective

Build a full-stack MERN (MongoDB, Express.js, React.js, Node.js) blog application demonstrating seamless integration between front-end and back-end components — including database operations, API communication, authentication, and state management.

📖 Project Overview

This project is a Blog Management System built with the MERN stack.
Users can:

View all blog posts with pagination

Read single post details

Create, edit, or delete posts (authenticated users)

Upload featured images

Add and view comments

Filter and search posts by category or keyword

The project demonstrates complete full-stack integration:

MongoDB for data storage

Express.js for API routing and validation

React.js for the dynamic front-end

Node.js for the server-side environment

🧩 Directory Structure
mern-blog-app/
│
├── backend/                     # Express.js back-end
│   ├── models/                 # Mongoose models (Post, Category, User, Comment)
│   ├── routes/                 # API route definitions
│   ├── middleware/             # Authentication & error handling
│   ├── controllers/            # Logic for each route
│   ├── uploads/                # Uploaded images
│   ├── .env.example            # Sample server environment variables
│   └── server.js               # Entry point for the server
│
├── frontend/                     # React.js front-end
│   ├── src/
│   │   ├── components/         # Reusable UI components (Navbar, PostList, etc.)
│   │   ├── pages/              # Page-level components (Home, PostPage, NewPostPage)
│   │   ├── context/            # Context API for state management
│   │   ├── services/           # API service (axios instance)
│   │   ├── hooks/              # Custom hooks for API calls and form logic
│   │   ├── App.jsx             # App entry with routing
│   │   └── main.jsx            # React DOM rendering
│   ├── .env.example            # Sample client environment variables
│   └── vite.config.js          # Vite configuration with proxy setup
│
└── README.md                   # Project documentation

⚙️ Technologies Used
Frontend

React.js (Vite)

React Router

Tailwind CSS

Axios

Context API / useReducer

React Hook Form / Yup (form validation)

Backend

Node.js

Express.js

MongoDB + Mongoose

Multer (file uploads)

JSON Web Tokens (JWT)

bcrypt.js (password hashing)

express-validator / Joi (validation)

🧪 Tasks Breakdown
Task 1: Project Setup

Created server (/server) and client (/client) folders

Configured MongoDB connection using Mongoose

Setup Express.js server with middleware (CORS, JSON parser)

Configured Vite React front-end with API proxy

Managed secrets with .env variables

Task 2: Back-End Development

Designed RESTful API endpoints:

GET /api/posts – Fetch all posts

GET /api/posts/:id – Fetch single post

POST /api/posts – Create a new post

PUT /api/posts/:id – Update post

DELETE /api/posts/:id – Delete post

GET /api/categories – Fetch all categories

POST /api/categories – Create new category

Implemented Mongoose models (Post, Category, User, Comment)

Added input validation and error handling middleware

Task 3: Front-End Development

Created key components:

Navbar.jsx

PostList.jsx

PostDetails.jsx

PostForm.jsx

Set up React Router for navigation

Implemented custom hook for API communication (useApi.js)

Task 4: Integration and Data Flow

Created a centralized api.js for backend communication

Managed global state with Context API

Implemented form validation (create/edit post)

Added optimistic UI updates and loading/error states

Task 5: Advanced Features

User Authentication (JWT-based login & registration)

Protected Routes for post creation/editing

Image Uploads using Multer

Pagination, Search, and Filtering

Comments System per blog post

🧠 API Documentation (Sample)
Method	Endpoint	Description	Auth Required
GET	/api/posts	Get all posts (supports pagination & search)	❌
GET	/api/posts/:id	Get single post	❌
POST	/api/posts	Create new post	✅
PUT	/api/posts/:id	Update post	✅
DELETE	/api/posts/:id	Delete post	✅
GET	/api/categories	Fetch all categories	❌
POST	/api/categories	Create new category	✅
POST	/api/auth/register	Register a user	❌
POST	/api/auth/login	Login user	❌
GET	/api/posts/:id/comments	Get comments for a post	❌
POST	/api/posts/:id/comments	Add a comment	✅
🛠️ Setup Instructions
1️⃣ Prerequisites

Make sure you have:

Node.js v18+

MongoDB (local or Atlas)

npm or yarn

2️⃣ Clone Repository
git clone <your-repo-url>
cd mern-blog-app

3️⃣ Setup Backend
cd server
cp .env.example .env
npm install
npm run dev


Example .env for server:

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/blog
JWT_SECRET=supersecretkey
CLOUDINARY_URL=your_cloudinary_upload_url  # optional for image hosting

4️⃣ Setup Frontend
cd client
cp .env.example .env
npm install
npm run dev


Example .env for client:

VITE_API_URL=http://localhost:5000/api


The client will run on http://localhost:5173

🧰 Testing the App

Register a new user → /register

Log in → token stored in localStorage

Create a new post with title, body, category, and image

View post list with pagination and filtering

Add comments to a post

Try editing or deleting posts as an authenticated user

💅 Example Screens (optional)

You can include screenshots such as:

Home page with posts list

Post details view

Create/Edit post form

Login/Register forms

(Add them under a /screenshots folder and reference here)

🚀 Deployment
Front-End (Netlify or GitHub Pages)

Build project:

cd client
npm run build


Deploy dist/ folder to Netlify or GitHub Pages.

Back-End (Render / Vercel / Railway)

Push your server folder to a GitHub repo.

Connect to Render or Railway.

Add environment variables (same as .env).

Deploy your backend — note the API base URL and update VITE_API_URL in your client .env.

✅ Expected Outcome

A fully functional MERN blog app

Authentication, CRUD operations, file uploads, pagination, and comments

Responsive UI and well-structured code

Seamless data flow between React and Express

🧾 Submission Instructions

Accept your GitHub Classroom assignment invitation.

Clone your personal repository.

Complete all tasks and commit frequently.

Push your code to GitHub regularly.

Include:

Complete client and server code

.env.example files

Screenshots

This README file

Autograding will check your submission automatically.

The instructor will review after autograding completes.

✨ Author

Name: Richard Wambua
Course: PLP MERN Stack Development
Week 4: Deep Dive into MERN Stack Integration