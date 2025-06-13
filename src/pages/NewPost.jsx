import React from "react";
import ImageUpload from "../shared/Components/FormElements/ImageUpload";
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom";
import BackButton from "../shared/Components/FormElements/Backbutton";


export const NewPost = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    //stimulating an API call
   await new Promise ((resolve) => setTimeout(resolve,3000));
    console.log("Submitting the Form ", data);

  }

  return (
    <div className=" text-center  h-screen  bg-[#1A1A1A] text-[#FFFFFF]">
      <div className="flex items-bottom p-10 justify-between ">
      <BackButton className=" bg-gray-700 mr-44 text-white px-4 py-2 rounded hover:bg-gray-600" />
      <div className="text-4xl ">NewPost</div>
      <div className="w-72"></div>
      </div>

      <ImageUpload className=" grid mt-5 place-items-center"/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-10">
          <label className=" text-2xl">Caption: </label>
          <input
            className="bg-slate-100 border-2 border-black text-2xl rounded-md"
            placeholder="Enter your caption"
            {...register("caption", {
              required: true,
              maxLenth: 20,
              minLength: { value: 3, message: "minimum length is 3 letters" },
            })}
          />
          {errors.caption && (
            <p className="text-red-700 bg ml-28 ">{errors.caption.message}</p>
          )}
        </div>
        <input
        className="bg-slate-100 text-black border-2 border-black  mt-10 rounded-md"
        type="submit"
        disabled={isSubmitting}
        value={isSubmitting ? "Submitting" : "Submit"}

      />
      </form>
    </div>
  );
};
