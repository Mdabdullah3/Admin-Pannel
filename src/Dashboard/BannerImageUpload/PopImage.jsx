import React, { useEffect, useState } from "react";
import FileUpload from "../../components/common/FileUpload";
import PrimaryButton from "../../components/common/PrimaryButton";
import axios from "axios";
import { API_URL } from "../../config";
import { toast } from "react-toastify";
import useUserStore from "../../store/AuthStore";
const PopImage = () => {
  const [popUpImage, setpopUpImage] = useState();
  const [popUpImageMobile, setpopUpImageMobile] = useState();
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      user: user?._id,
      banner: "PopUp",
      popupImage: popUpImage || "",
      popupImageMobile: popUpImageMobile || "",
    };

    try {
      const response = await axios.post(`${API_URL}/others`, requestBody);
      toast.success("Pop Up Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div>
      <h1 className="text-xl font-semibold my-4">Upload An Image</h1>
      <form action="" className=" space-y-4" onSubmit={handleSubmit}>
        <FileUpload
          label="Popup Image Upload"
          name="popupimage"
          imageSize="Image size should be less than 5 MB, and Minimum Height and Width should be 400px400px"
          setFile={setpopUpImage}
        />
        <FileUpload
          label="Popup Image Upload For Mobile"
          name="popupimagemobile"
          imageSize="Image size should be less than 5 MB, and Minimum Height and Width should be 200px200px"
          setFile={setpopUpImageMobile}
        />
        <PrimaryButton value="Upload" />
      </form>
    </div>
  );
};

export default PopImage;
