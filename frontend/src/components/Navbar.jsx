// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
const { posts, addPost, editPost, removePost, loading, error } = useApp();

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">📰 MERN Blog</h1>
      <div className="flex gap-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/new" className="hover:underline">Create Post</Link>
      </div>
    </nav>
  );
}
