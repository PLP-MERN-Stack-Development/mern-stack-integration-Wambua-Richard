import { createContext, useState, useEffect } from "react";
import {
  getPosts,
  getCategories,
  createPost,
  updatePost,
  deletePost,
} from "../services/api";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [postsRes, categoriesRes] = await Promise.all([
        getPosts(),
        getCategories(),
      ]);
      setPosts(postsRes.data);
      setCategories(categoriesRes.data);
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // Optimistic UI Updates
  const addPost = async (newPost) => {
    try {
      const tempId = Date.now();
      const optimisticPost = { _id: tempId, ...newPost };
      setPosts((prev) => [optimisticPost, ...prev]);

      const response = await createPost(newPost);
      setPosts((prev) =>
        prev.map((p) => (p._id === tempId ? response.data : p))
      );
    } catch {
      setError("Failed to create post");
      loadInitialData();
    }
  };

  const editPost = async (id, updatedData) => {
    try {
      setPosts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, ...updatedData } : p))
      );
      await updatePost(id, updatedData);
    } catch {
      setError("Failed to update post");
      loadInitialData();
    }
  };

  const removePost = async (id) => {
    try {
      const oldPosts = [...posts];
      setPosts(posts.filter((p) => p._id !== id));
      await deletePost(id);
    } catch {
      setError("Failed to delete post");
      loadInitialData();
    }
  };

  return (
    <AppContext.Provider
      value={{
        posts,
        categories,
        loading,
        error,
        addPost,
        editPost,
        removePost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
