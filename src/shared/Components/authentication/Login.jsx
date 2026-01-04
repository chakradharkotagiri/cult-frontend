import React, { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../../hooks/ProfileContext";
import { API_URL } from "../../../config";

const Login = () => {
  const navigate = useNavigate();
  const { setProfile } = useContext(ProfileContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/");
    }
  }, []);

  async function onSubmit(data) {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", result.token);

        const user = result.user;
        setProfile(user);
        localStorage.setItem("profile", JSON.stringify(user));

        console.log("Profile set in context ✅", user);

        navigate("/");
      } else {
        alert(result.error || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Check backend.");
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-[#3e3d3d] from-10% via-[#2a2a2a] to-[#0d0d0d] to-60%">
      

      <div className="flex-1 flex flex-col justify-center  items-center px-6">
        <div className="w-full max-w-md text-white">
          <h1 className="text-3xl font-semibold mb-20 font-Inter text-center">WELCOME BACK</h1>
          <form className="flex flex-col space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <label className="font-Inter mb-1 text-lg">Username:</label>
              <input
                className="bg-[#3D3D3D] outline-none font-times mb-20 text-lg p-2 border-2 border-white rounded-md"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p className="text-red-700 mt-1">{errors.username.message}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="font-Inter text-lg mb-1">Password:</label>
              <input
                type="password"
                className="bg-[#3D3D3D] p-2 outline-none mb-20 font-times border-2 border-white rounded-md"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 5, message: "Minimum length 5" },
                })}
              />
              {errors.password && (
                <p className="text-red-700 mt-1">{errors.password.message}</p>
              )}
            </div>

            <input
              type="submit"
              disabled={isSubmitting}
              className="border-black border-2 bg-[#1B1B1B] h-10 rounded-lg text-white font-Inter font-medium"
              value={isSubmitting ? "Submitting" : "Login"}
            />
          </form>

          <p className="mt-6 text-sm font-Inter text-center">
            Don't have an account?{" "}
            <span
              className="text-blue-400 underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Create a new account
            </span>
          </p>
        </div>
      </div>


      <div className="hidden md:flex md:flex-1 h-screen">
        <img
          className="w-full h-full object-cover"
          src="../../../../image.png"
          alt="Login visual"
        />
      </div>
    </div>
  );
};

export default Login;
