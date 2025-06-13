import React from "react";
import { useState } from "react";
import {ToastContainer,toast} from "react-toastify"
import { Form } from "react-bootstrap";
import defaultImage from "../../../assets/defaultImage.jpeg";
import blankImage from "../../../assets/blankImage.png"
import "react-toastify/dist/ReactToastify.css";

const ImageUpload = ( {className} ) => {
  const [image, setImage] = useState({

    file: defaultImage,
    placeholder: blankImage
  });

  const handleImageChange = (event) => {
    const localFile = event.target.files[0];
    if (
      localFile.type== "image/png" ||
      localFile.type== "image/jpeg" ||
      localFile.type== "image/jpg"
    ) {
      //show image
      const reader = new FileReader()
      reader.onload=(r)=>{
        setImage({
          placeholder:r.target.result,
          file:event.target.files[0]
        })

        console.log(r.target.result)

      }

      reader.readAsDataURL(event.target.files[0])

    } else {
      toast.error("Invalid File Type")
      image.file=null
    }
    console.log(localFile);
  };

  return (
    <div className={className}>
   <table className="mt-10 text-xl h-[300px] ml-[30px]  border-collapse">
  <tbody>
    <tr className="align-middle">
      <td className="text-left px-4 py-2 w-1/4">Add Image</td>
      <td className="text-center px-4 py-2 w-3/4">
        <img className="h-[200px] w-48 mx-auto mb-2 border-black border-2 rounded-md" src={image.placeholder} alt="Image"  />
        <Form.Control className="mt-10"type="file" onChange={handleImageChange} />
      </td>
    </tr>
  </tbody>
</table>

      <ToastContainer/>
    </div>
  );
};

export default ImageUpload;
