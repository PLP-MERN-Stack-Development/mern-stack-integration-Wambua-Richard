// src/components/PostForm.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';

export default function PostForm({ isEdit = false }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { postData, putData, fetchData, data: post } = useApi('posts');

  const [formData, setFormData] = useState({ title: '', content: '', author: '' });

  useEffect(() => {
    if (isEdit && id) {
      fetchData(id);
    }
  }, [isEdit, id]);

  useEffect(() => {
    if (post && isEdit) {
      setFormData({
        title: post.title,
        content: post.content,
        author: post.author,
      });
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await putData(id, formData);
    } else {
      await postData(formData);
    }
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">
        {isEdit ? 'Edit Post' : 'Create New Post'}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Post Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          className="border p-2 rounded"
          rows="6"
          placeholder="Write your content..."
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Author"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {isEdit ? 'Update Post' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}
