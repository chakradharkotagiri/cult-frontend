import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../shared/hooks/ProfileContext";
import { toast } from "react-toastify";
import {API_URL} from "../config"
const EditProfileForm = () => {
  const { profile, setProfile } = useContext(ProfileContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(profile?.firstName || "");
  const [lastName, setLastName] = useState(profile?.lastName || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(profile?.avatar || "");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || "");
      setLastName(profile.lastName || "");
      setBio(profile.bio || "");
      setPreview(profile.avatar || "");
    }
  }, [profile]);

  if (!profile) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("bio", bio);
    if (image) formData.append("profileImage", image); 

    try {
      const res = await fetch(
        `${API_URL}/api/posts/update-profile/${profile._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await res.json();
      console.log("Updated user response:", data);

      if (res.ok) {
        setProfile({ ...data.updatedUser, _id: data.updatedUser._id });
        toast.success("Profile updated successfully!");
        setTimeout(() => navigate("/profile"), 1500); // auto-redirect
      } else {
        toast.error(data.error || "Update failed.");
      }
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-[#1C1C1C] min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="text-white w-full max-w-md p-6 bg-[#1a1a1a] rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

        <div className="mb-4">
          <label className="block mb-2">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 bg-[#333] border border-[#555] rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 bg-[#333] border border-[#555] rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-4 py-2 bg-[#333] border border-[#555] rounded"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Profile Picture</label>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-20 h-20 object-cover mb-2 rounded-full"
            />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-300 transition w-full"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
