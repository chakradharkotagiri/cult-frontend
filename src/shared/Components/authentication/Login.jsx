import React from "react";
import { useEffect,useContext} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Card from "../FormElements/Card";
import {ProfileContext} from "../../hooks/ProfileContext";
import {API_URL} from "../../../config"


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
          password: data.password
        })
      });
  
      const result = await res.json();
  
      if (res.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", result.token); // store JWT
  
        const user = result.user;
  
        // ✅ Update profile context
        setProfile(user);
        localStorage.setItem("profile", JSON.stringify(user));
        
        
        console.log("Profile set in context ✅", user);

  
        navigate("/"); // or "/home" depending on your routing
      } else {
        alert(result.error || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Check backend.");
    }
  }
  
  return (
    <div className="flex min-h-screen bg-gradient-to-l from-[#1A1A1A] to-[#1A1A1A] ">
      <div className="flex sm:w-screen w-screen sm:h-screen  md:h-screen h-screen justify-center  items-center ">
        <Card className="text-center bg-gradient-to-l   h-[700px] from-[#1B1B1B] to-[#3D3D3D]">
          <div className="text-3xl text-white">
            <h1 className="text-2xl  text-white font-semibold">WELCOME BACK</h1>
            <form className="w-96" onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-28 flex  flex-col">
                <label className="ustify-content-start">UserName </label>
                <input
                  className="bg-[#3D3D3D] outline-none font-sans text-lg p-1 pl-3 border-2 border-white rounded-md mt-1"
                  {...register("username", {
                    required: true,
                    message: "userId is mandatory",
                  })}
                />
                {errors.email && <p>{errors.email.message}</p>}
              </div>

              <div className="mt-20 flex flex-col">
                <label>Password:</label>
                <input
                  type="password"
                  className="bg-[#3D3D3D] pl-3 outline-none border-2 border-white rounded-md mt-1"
                  {...register("password", {
                    required: true,
                    minLength: {
                      value: 5,
                      message: "Password is mandatory (Minimum length 5",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-700 bg ml-28 ">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <input
                type="submit"
                disabled={isSubmitting}
                className="border-black border-2 bg-[#1B1B1B] h-8  rounded-lg text-sm w-full justify-center text-white mt-20"
                value={isSubmitting ? "Submitting" : "Submit"}
              />
            </form>
          </div>
          <p className="mt-4 text-white text-sm">
            Don't have an account?{" "}
            <span
              className="text-blue-400 underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Create a new account
            </span>
          </p>
        </Card>
      </div>
      <div className="hidden md:block">
        <img
          className=" w-[1400px] h-[850px] object-cover"
          src="../../../../image.png"
        ></img>
      </div>
    </div>
  );
};

export default Login;
