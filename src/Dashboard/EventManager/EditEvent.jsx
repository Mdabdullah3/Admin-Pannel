import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useEventStore from "../../store/EventStore";
import InputField from "../../components/common/InputField";
import FileUpload from "../../components/common/FileUpload";
import PrimaryButton from "../../components/common/PrimaryButton";
import { toDataURL } from "../../utils/DataUrl";
import { SERVER } from "../../config";

const EditEvent = () => {
  const { id } = useParams();
  const { event, fetchEventById, updateEvent } = useEventStore();
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const loadEvent = async () => {
      await fetchEventById(id);
    };
    loadEvent();
  }, [fetchEventById, id]);

  useEffect(() => {
    if (event) {
      setFormData({
        description: event.description || "",
        price: event.price || "",
        name: event.name || "",
        startDate: formatDate(event.startDate) || "",
        endDate: formatDate(event.endDate) || "",
      });
    }
  }, [event]);

  useEffect(() => {
    if (event?.image?.secure_url) {
      const avatarUrl = `${SERVER}${event.image.secure_url}`;
      toDataURL(avatarUrl).then((base64) => {
        setImage(base64);
      });
    }
  }, [event?.image?.secure_url]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (img) => {
    setImage(img);
    setFormData({ ...formData, image: img });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateEvent(id, formData);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="p-10 ">
      <h1 className="text-3xl font-bold mb-6">Edit Event</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <InputField
          label="Event Name"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter event name"
          required
        />
        <FileUpload
          name="image"
          label="Event Image"
          setFile={handleImageChange}
          file={image}
          imageSize={
            "Image size should be less than 5 MB, and Minimum Height and Width should be 300px1200px "
          }
        />
        <InputField
          label={"Price"}
          type="number"
          placeholder={"Enter price"}
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        <InputField
          label="Starting Date"
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
        <InputField
          label="End Date"
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Details"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <PrimaryButton type="submit" value="Update Event" />
      </form>
    </div>
  );
};

export default EditEvent;
