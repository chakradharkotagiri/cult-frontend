import React from "react";
import { useForm } from "react-hook-form";
import ImageUpload from "../FormElements/ImageUpload";
import Card from "../FormElements/Card";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    //stimulating an API call
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("Submitting the Form ", data);
  }

  return (
    <div className="flex justify-center items-center bg-gradient-to-b from-gray-200 to-gray-400">
      <Card className="mt-2 bg-gray-200">
        <form className="text-2xl" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-10">
            <h1 className="flex justify-center mb-10 text-4xl font-bold">Signup Form</h1>
            <label>First name : </label>
            <input
              className="bg-slate-100 border-2 border-black rounded-md"
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
              className="bg-slate-100 border-2 border-black rounded-md"
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
            <label>Email: </label>
            <input
              className="bg-slate-100 border-2 border-black rounded-md"
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
          <ImageUpload />
          <div>
            <label>Password:</label>
            <input
              type="password"
              className="bg-slate-100 border-2 border-black rounded-md"
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
            className="bg-slate-100 border-2 border-black mt-10 rounded-md"
            type="submit"
            disabled={isSubmitting}
            value={isSubmitting ? "Submitting" : "Submit"}
          />
        </form>
      </Card>
    </div>
  );
};

export default Signup;
