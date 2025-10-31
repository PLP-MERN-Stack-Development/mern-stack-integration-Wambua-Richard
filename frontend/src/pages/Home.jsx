// src/pages/Home.jsx
import PostList from "../components/PostList";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">📚 Latest Blog Posts</h1>
      <PostList />
    </div>
  );
}
