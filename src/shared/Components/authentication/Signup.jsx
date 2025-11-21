import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
// removed ImageUpload import since we use a simple file input now
import Card from "../FormElements/Card";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";

export default function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",          // validate while typing
    reValidateMode: "onChange",
  });

  // watch email to trigger debounced validation when user stops typing
  const emailValue = watch("email");

  useEffect(() => {
    // debounce validation after user stops typing for 700ms
    const id = setTimeout(() => {
      // trigger validation for email field only
      trigger("email");
    }, 700);
    return () => clearTimeout(id);
  }, [emailValue, trigger]);

  async function onSubmit(data) {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    // avatar might be undefined; if present append first file
    if (data.avatar && data.avatar.length > 0) {
      formData.append("avatar", data.avatar[0]);
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Signup successful! Please log in.");
        navigate("/login");
      } else {
        alert(`❌ ${result.error || "Signup failed"}`);
      }
    } catch (err) {
      alert("🚨 Signup failed: " + err.message);
      console.error(err);
    }
  }

  return (
    <div className="flex justify-center min-h-screen items-center bg-gradient-to-l from-[#1A1A1A] to-[#1A1A1A] p-4">
      <Card className="bg-gradient-to-l from-[#1A1A1A] to-[#1A1A1A]">
        <form
          className="text-xl border-2 border-solid text-white p-4 w-[360px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="flex justify-center mb-4 text-3xl font-bold">Signup Form</h1>

          <div className="flex flex-col gap-2">
            <div>
              <label className="block mb-1">First name</label>
              <input
                placeholder="Enter your first name"
                className="w-full h-9 px-2 text-sm placeholder:text-sm placeholder:font-medium bg-slate-100 text-black border-2 border-black rounded-md"
                {...register("firstName", {
                  required: "First name is required",
                  maxLength: { value: 20, message: "Maximum length is 20" },
                  minLength: { value: 3, message: "Minimum length is 3" },
                })}
              />
              {errors.firstName && (
                <p className="text-red-700 text-sm mt-1">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1">Last name</label>
              <input
                placeholder="Enter your last name"
                className="w-full h-9 px-2 text-sm placeholder:text-sm placeholder:font-medium bg-slate-100 text-black border-2 border-black rounded-md"
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: { value: 3, message: "Minimum length is 3" },
                  maxLength: { value: 20, message: "Maximum length is 20" },
                })}
              />
              {errors.lastName && (
                <p className="text-red-700 text-sm mt-1">{errors.lastName.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1">Username</label>
              <input
                placeholder="Choose a username"
                className="w-full h-9 px-2 text-sm placeholder:text-sm placeholder:font-medium bg-slate-100 text-black border-2 border-black rounded-md"
                {...register("username", {
                  required: "Username is required",
                  minLength: { value: 3, message: "Minimum length is 3" },
                })}
              />
              {errors.username && (
                <p className="text-red-700 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1">Email</label>
              <input
                placeholder="you@gmail.com"
                className="w-full h-9 px-2 text-sm placeholder:text-sm placeholder:font-medium bg-slate-100 text-black border-2 border-black rounded-md"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                    message: "Please enter a valid Gmail address ending with @gmail.com",
                  },
                })}
              />
              {errors.email && <p className="text-red-700 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* simplified file chooser: no preview, just the choose file input */}
            <div>
              <label className="block mb-1">Profile image</label>
              <input
                type="file"
                accept="image/*"
                className="w-full text-sm placeholder:text-sm bg-slate-100 text-black border-2 border-black rounded-md px-2 py-1"
                {...register("avatar")}
              />
              {/* optional helper text if you want */}
              <p className="text-xs text-gray-300 mt-1">Choose a profile image (optional)</p>
            </div>

            <div>
              <label className="block mb-1">Password</label>
              <input
                type="password"
                placeholder="Create a password (min 5 chars)"
                className="w-full h-9 px-2 text-sm placeholder:text-sm placeholder:font-medium bg-slate-100 text-black border-2 border-black rounded-md"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 5, message: "Minimum length is 5" },
                })}
              />
              {errors.password && (
                <p className="text-red-700 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <input
              className="w-full bg-[#1A1A1A] border-2 text-lg border-black mt-2 rounded-md px-4 py-2 cursor-pointer disabled:opacity-60"
              type="submit"
              disabled={isSubmitting}
              value={isSubmitting ? "Submitting" : "Submit"}
            />

            <p className="mt-2 text-sm text-center">
              Already have an account?{" "}
              <span className="text-blue-500 underline cursor-pointer" onClick={() => navigate("/login")}>
                Login here
              </span>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
}
