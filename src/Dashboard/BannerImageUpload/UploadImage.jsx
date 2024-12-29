import React, { useEffect, useState } from "react";
import FileUpload from "../../components/common/FileUpload";
import PrimaryButton from "../../components/common/PrimaryButton";
import axios from "axios";
import { API_URL } from "../../config";
import { toast } from "react-toastify";
import useUserStore from "../../store/AuthStore";
import InputField from "../../components/common/InputField";
const UploadImage = () => {
  const [image, setimage] = useState();
  const [link, setLink] = useState("");
  const [MobileImage, setMobileImage] = useState();
  const { user, fetchUser } = useUserStore();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      user: user?._id,
      image: image || "",
      link: link || "",
      banner: "BannerImage",
      mobileBanner: MobileImage || "",
    };

    try {
      const response = await axios.post(`${API_URL}/others`, requestBody);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div>
      <h1 className="text-xl font-semibold my-4">Upload An Image</h1>
      <form action="" className=" space-y-4" onSubmit={handleSubmit}>
        <FileUpload
          label="Banner Image Upload"
          name="image"
          setFile={setimage}
          imageSize="Image size should be less than 5 MB, and Minimum Height and Width should be 300px1200px "
        />
        <FileUpload
          label="Banner Image For Mobile"
          name="mobileimage"
          imageSize="Image size should be less than 5 MB, and Minimum Height and Width should be 200px400px "
          setFile={setMobileImage}
        />
        <InputField
          placeholder={"Enter Link"}
          label="Link"
          name="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <PrimaryButton value="Upload" />
      </form>
    </div>
  );
};

export default UploadImage;
