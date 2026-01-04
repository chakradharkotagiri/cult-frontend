import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Form } from "react-bootstrap";
import defaultImage from "../../../assets/defaultImage.jpeg";
import blankImage from "../../../assets/blankImage.png";
import "react-toastify/dist/ReactToastify.css";

const ImageUpload = ({ className, register = () => ({}), onImageSelect }) => {
  const [image, setImage] = useState({
    file: defaultImage,
    placeholder: blankImage,
  });

  const handleImageChange = (event) => {
    const localFile = event.target.files[0];
    if (
      localFile.type === "image/png" ||
      localFile.type === "image/jpeg" ||
      localFile.type === "image/jpg"
    ) {
      const reader = new FileReader();
      reader.onload = (r) => {
        setImage({
          placeholder: r.target.result,
          file: event.target.files[0],
        });
        if (onImageSelect) {
          onImageSelect(event.target.files[0]);
        }
      };
      reader.readAsDataURL(localFile);
    } else {
      toast.error("Invalid File Type");
      setImage((prev) => ({ ...prev, file: null }));
    }
  };

  return (
    <div className={`${className} font-Inter `}>
      <table className="mt-10 text-xl h-[300px] ml-[30px] border-collapse">
        <tbody>
          <tr className="align-middle">
            <div>
              <div>
                <td className="text-center  py-2 w-1/4">Add Image</td>
              </div>
              <div>
                <td className="text-center  py-2 w-3/4">
                  <img
                    className="h-[150px] w-36 mx-auto mb-2 border-black border-2 rounded-md"
                    src={image.placeholder}
                    alt="Image"
                  />
                  <Form.Control
                    className="mt-10"
                    type="file"
                    accept="image/*"
                    {...register("avatar", { required: true })}
                    onChange={handleImageChange}
                  />
                </td>
              </div>
            </div>
          </tr>
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default ImageUpload;
