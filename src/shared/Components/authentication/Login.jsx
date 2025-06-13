import React from "react";
import {useEffect} from "react";
import { useForm  } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Card from "../FormElements/Card";
const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

const DUMMY_USER = {
  username: "chakri",
  password: "12345"
};

useEffect(() => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    navigate("/");
  }
}, []);

  async function onSubmit(data) {
    //stimulating an API call
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("Submitting the Form ", data);

    if (data.email === DUMMY_USER.username && data.password === DUMMY_USER.password) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      alert("Invalid credentials. Try username: chakri, password: 1234");
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
                      className="bg-[#3D3D3D] font-sans text-lg p-1 border-2 border-white rounded-md mt-1"
                      {...register("email", {
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
                      className="bg-[#3D3D3D] border-2 border-white rounded-md mt-1"
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
                  value={isSubmitting?"Submitting": "Submit"}/>
                </form>
              </div>
            </Card>
          </div>
          <div className="hidden md:block">
            <img className=" w-[1400px] h-[850px] object-cover" src="../../../../image.png"></img>
          </div>
      
     </div>
  );
};

export default Login;
