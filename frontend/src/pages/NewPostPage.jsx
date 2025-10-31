// src/pages/NewPostPage.jsx
import { useParams } from "react-router-dom";
import PostForm from "../components/PostForm";
import ProtectedRoute from "../components/ProtectedRoute";

export default function NewPostPage() {
  const { id } = useParams(); // For edit mode

  return (
    <ProtectedRoute>
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">
          {id ? "Edit Post" : "Create New Post"}
        </h1>
        <PostForm />
      </div>
    </ProtectedRoute>
  );
}
