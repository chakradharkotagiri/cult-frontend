import React, { useState, useContext } from "react";
import ImageUpload from "../shared/Components/FormElements/ImageUpload";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BackButton from "../shared/Components/FormElements/Backbutton";
import { ProfileContext } from "../shared/hooks/ProfileContext";
import {API_URL} from "../config"
 
export const NewPost = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const { profile } = useContext(ProfileContext);
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("User not logged in");

      if (!imageFile) {
        alert("Please upload an image");
        return;
      }

      const formData = new FormData();
      formData.append("image", imageFile); // ✅ Correct image handling
      formData.append("caption", data.caption);

      const res = await fetch(`${API_URL}/api/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Auth header
        },
        body: formData,
      });

      const result = await res.json();
      console.log("Upload result:", result);

      if (res.ok) {
        alert("Post created successfully!");
        navigate("/"); // ✅ Navigate after success
      } else {
        alert(result.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Check console for details.");
    }
  }

  return (
    <div className="text-center h-screen bg-[#1A1A1A] text-[#FFFFFF]">
      <div className="flex items-center p-10 justify-center gap-10">
        <div>
          <BackButton className="bg-gray-700 text-white px-4 mr-44 py-2 rounded hover:bg-gray-600" />
        </div>
        <div className="text-4xl">NewPost</div>
      </div>

      <ImageUpload
        className="grid mt-5 place-items-center"
        onImageSelect={(file) => setImageFile(file)}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-10">
          <label className="text-2xl">Caption: </label>
          <input
            className="bg-slate-100 border-2 text-black border-black text-2xl rounded-md"
            placeholder="Enter your caption"
            {...register("caption", {
              required: "Caption is required",
              minLength: { value: 3, message: "Minimum length is 3 letters" }
            })}
          />
          {errors.caption && (
            <p className="text-red-700 bg ml-28">{errors.caption.message}</p>
          )}
        </div>
        <input
          className="bg-slate-100 text-black border-2 border-black mt-10 rounded-md px-4 py-2"
          type="submit"
          disabled={isSubmitting}
          value={isSubmitting ? "Submitting..." : "Submit"}
        />
      </form>
    </div>
  );
};
