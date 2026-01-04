import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../shared/Components/FormElements/ImageUpload";
import BackButton from "../shared/Components/FormElements/BackButton";
import { ProfileContext } from "../shared/hooks/ProfileContext";
import { API_URL } from "../config";

export const NewPost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [imageFile, setImageFile] = useState(null);
  const { profile } = useContext(ProfileContext);
  const navigate = useNavigate();

  // ✅ Submit Handler
  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("User not logged in");

      if (!imageFile) {
        alert("Please upload an image");
        return;
      }

      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("caption", data.caption);

      const res = await fetch(`${API_URL}/api/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await res.json();
      console.log("Upload result:", result);

      if (res.ok) {
        alert("Post created successfully!");
        navigate("/");
      } else {
        alert(result.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#FFFFFF] font-Inter flex flex-col items-center py-10">
      {/* Header */}
      <div className="flex items-center justify-between w-11/12 md:w-3/4 mb-10">
        <BackButton className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all duration-200" />
        <h1 className="text-4xl font-semibold tracking-wide">New Post</h1>
        <div className="w-24" /> {/* Spacer for layout balance */}
      </div>

      {/* Unified Post Creation Card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-11/12 md:w-3/4 bg-[#2A2A2A] rounded-2xl shadow-md p-10 flex flex-col items-center"
      >
        <h2 className="text-2xl font-medium mb-8">Create New Post</h2>

        {/* Image Upload + Caption */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full">
          {/* Image Upload */}
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <ImageUpload
                className="grid place-items-center"
                onImageSelect={(file) => setImageFile(file)}
              />
            </div>
            
          </div>

          {/* Caption Input */}
          <div className="w-full md:w-1/2 text-center">
            <label className="block text-2xl font-medium mb-3">Caption</label>
            <input
              type="text"
              placeholder="Enter your caption"
              className="w-full bg-slate-100 text-black border-2 border-black rounded-md px-3 py-2 text-lg focus:ring-2 focus:ring-yellow-400 outline-none transition"
              {...register("caption", {
                required: "Caption is required",
                minLength: { value: 3, message: "Minimum length is 3 letters" },
              })}
            />
            {errors.caption && (
              <p className="text-red-500 text-sm mt-2">
                {errors.caption.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-10 bg-yellow-500 text-black font-semibold px-8 py-3 rounded-lg hover:bg-yellow-400 transition-all duration-200 ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
