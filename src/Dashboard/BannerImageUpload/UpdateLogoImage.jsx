import React, { useEffect, useState } from "react";
import FileUpload from "../../components/common/FileUpload";
import PrimaryButton from "../../components/common/PrimaryButton";
import { SERVER } from "../../config";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import useOtherStore from "../../store/OtherStore";
import { toDataURL } from "../../utils/DataUrl";

const UpdateLogoImage = () => {
  const { id } = useParams();
  const [LogoImage, setLogoImage] = useState(null);
  const { other, fetchOtherById, updateOther } = useOtherStore();

  useEffect(() => {
    fetchOtherById(id);
  }, [id, fetchOtherById]);

  useEffect(() => {
    if (other?.logo) {
      const imageUrl = `${SERVER}${other?.logo?.secure_url}`;
      toDataURL(imageUrl).then((base64) => {
        setLogoImage(base64);
      });
    }
  }, [other]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      banner: "LogoImage",
      logo: LogoImage || "", 
    };

    try {
      updateOther(id, requestBody);
    } catch (error) {
      toast.error("Error updating image.");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold my-4">Upload An Image</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FileUpload
          label="Logo Image Upload"
          name="logoimage"
          imageSize="Image size should be less than 5 MB, and Minimum Height and Width should be 40px40px"
          setFile={setLogoImage} // Directly update LogoImage state
          file={LogoImage} // Pass the current image
        />
        <PrimaryButton value="Upload" />
      </form>
    </div>
  );
};

export default UpdateLogoImage;
