import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useApp } from "../hooks/useApp";

const schema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  category: Yup.string().required("Select a category"),
});

export default function PostForm() {
  const { categories, addPost } = useApp();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    await addPost(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto space-y-4">
      <input
        {...register("title")}
        placeholder="Title"
        className="w-full p-2 border rounded"
      />
      {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

      <textarea
        {...register("content")}
        placeholder="Content"
        className="w-full p-2 border rounded"
      ></textarea>
      {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}

      <select {...register("category")} className="w-full p-2 border rounded">
        <option value="">Select category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Post
      </button>
    </form>
  );
}

// Compare this snippet from mern-stack-integration-Wambua-Richard/frontend/src/components/PostForm.jsx:
// // src/components/PostForm.jsx
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// import { useApp } from "../hooks/useApp";