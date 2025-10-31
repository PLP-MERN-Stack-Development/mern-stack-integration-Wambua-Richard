// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PostProvider } from "./context/PostContext";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import NewPostPage from "./pages/NewPostPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <PostProvider>
          <Navbar />
          <div className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts/:id" element={<PostPage />} />
              <Route path="/create" element={<NewPostPage />} />
              <Route path="/edit/:id" element={<NewPostPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </PostProvider>
      </AuthProvider>
    </Router>
  );
}
