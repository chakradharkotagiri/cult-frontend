import React from "react";
import { useForm } from "react-hook-form";
import ImageUpload from "../FormElements/ImageUpload";
import Card from "../FormElements/Card";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("avatar", data.avatar[0]); // From <input type="file" name="avatar" />
  
    try {
      const res = await fetch("http://localhost:5002/api/auth/signup", {
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
  

  // use formik in all forms with Yup for validations , Try to use custom YUP validations

  return (
    <div className="flex justify-center h-screen items-center bg-gradient-to-l from-[#1A1A1A] to-[#1A1A1A] ">
      <Card className=" bg-gradient-to-l from-[#1A1A1A] to-[#1A1A1A] ">
        <form className="text-2xl text-white" onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <h1 className="flex justify-center mb-10 text-4xl font-bold">
              Signup Form
            </h1>
            <label>First name : </label>
            <input
              className="bg-slate-100 text-black border-2 border-black rounded-md"
              {...register("firstName", {
                required: true,
                maxLength: 20,
                minLength: { value: 3, message: "minimum length is 3" },
              })}
            />
            {errors.firstName && (
              <p className="text-red-700 bg ml-28 ">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="mt-10">
            <label>Last name : </label>
            <input
              className="bg-slate-100 border-2 text-black border-black rounded-md"
              {...register("lastName", {
                required: true,
                minLength: { value: 3, message: "minimum length is 3" },
                maxLength: 20,
              })}
            />
            {errors.lastName && (
              <p className="text-red-700 bg ml-28 ">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div className="mt-10">
            <label>Username: </label>
            <input
              className="bg-slate-100 text-black border-2 border-black rounded-md"
              {...register("username", {
                required: true,
                minLength: { value: 3, message: "Minimum length is 3" },
              })}
            />
            {errors.username && (
              <p className="text-red-700">{errors.username.message}</p>
            )}
          </div>

          <div className="mt-10">
            <label>Email: </label>
            <input
              className="bg-slate-100 text-black border-2 border-black rounded-md"
              {...register("email", {
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                  message:
                    "Please enter a valid Gmail address ending with @gmail.com",
                },
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <ImageUpload register={register} />
          <div>
            <label>Password:</label>
            <input
              type="password"
              className="bg-slate-100 text-black border-2 border-black rounded-md"
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
            className="bg-[#1A1A1A] border-2 text-lg  border-black mt-10 rounded-md"
            type="submit"
            disabled={isSubmitting}
            value={isSubmitting ? "Submitting" : "Submit"}
          />
          <p className="mt-4 text-sm">
            Already have an account?{" "}
            <span
              className="text-blue-500 underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
