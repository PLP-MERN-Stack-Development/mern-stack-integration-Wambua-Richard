// src/components/PostDetail.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { useEffect } from 'react';

export default function PostDetail() {
  const { id } = useParams();
  const { data: post, loading, error, fetchData, deleteData } = useApi(`posts`);
  const navigate = useNavigate();

  useEffect(() => { fetchData(id); }, [id]);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      await deleteData(id);
      navigate('/');
    }
  };

  if (loading) return <p>Loading post...</p>;
  if (error) return <p className="text-red-600">{error.message}</p>;
  if (!post) return null;

  return (
    <div className="max-w-2xl mx-auto mt-6 p-4">
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p className="text-sm text-gray-500 mb-4">
        {post.author} • {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <p className="mb-6 text-gray-800">{post.content}</p>

      <div className="flex gap-3">
        <button
          onClick={() => navigate(`/edit/${id}`)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
