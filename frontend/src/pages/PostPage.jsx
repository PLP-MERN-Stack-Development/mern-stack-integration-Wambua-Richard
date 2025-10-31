// src/pages/PostPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../services/api";
import Comments from "../components/Comments";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPostById(id);
        setPost(res.data);
      } catch {
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!post) return <p className="text-center">Post not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="rounded-lg w-full mb-4 object-cover"
        />
      )}
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 mb-4">By {post.author?.name || "Anonymous"}</p>
      <p className="leading-relaxed text-lg">{post.content}</p>

      {/* Comments Section */}
      <Comments postId={post._id} />
    </div>
  );
}
