import React, { useEffect, useState } from "react";
import axios from "axios";
import PrimaryButton from "../../components/common/PrimaryButton";
import InputField from "../../components/common/InputField";
import FileUpload from "../../components/common/FileUpload";
import useUserStore from "../../store/AuthStore";
import { toast } from "react-toastify";
import { API_URL } from "../../config";

const CreateEvent = () => {
  const { user, fetchUser } = useUserStore();
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    image: null,
    strDate: "",
    endDate: "",
    description: "",
    price: "",
    // status: "",
  });

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();

    const eventData = {
      user: user?._id,
      name: form.name,
      image: image,
      price: form.price,
      description: form.description,
      status: "active",
      startDate: new Date(form.strDate),
      endDate: new Date(form.endDate),
    };

    try {
      const response = await axios.post(`${API_URL}/events`, eventData, {
        withCredentials: true,
      });

      toast.success("Event created successfully!");

      // Reset the form after successful creation
      setForm({
        name: "",
        description: "",
        price: "",
        image: null,
        strDate: "",
        endDate: "",
        status: "",
      });
      setImage(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create event");
      console.error("Event creation error:", error);
    }
  };

  // const statusOptions = [
  //   { value: "active", label: "Active" },
  //   { value: "inactive", label: "Inactive" },
  // ];

  return (
    <div className="flex ">
      <section className="flex-1 p-10  m-5">
        <form onSubmit={handleAddEvent} className="space-y-5">
          <InputField
            label="Event Name"
            id="name"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="Enter event name"
            required
          />
          <FileUpload
            name="image"
            label="Event Image"
            imageSize={
              "Image size should be less than 5 MB, and Minimum Height and Width should be 300px1200px "
            }
            setFile={setImage} // Pass setImage to update the image state
            required
          />
          <InputField
            label="Price"
            type="number"
            placeholder={"Enter price"}
            name="price"
            value={form.price}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Starting Date"
            type="date"
            name="strDate"
            value={form.strDate}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="End Date"
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleInputChange}
            required
          />

          <textarea
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Details"
            name="description"
            value={form.description}
            onChange={handleInputChange}
            required
          />

          {/* <SelectField
            label="Status"
            id="status"
            name="status"
            value={form.status}
            onChange={handleInputChange}
            options={statusOptions}
            placeholder="Select status"
            required
          /> */}

          <PrimaryButton type="submit" value="Create Event" />
        </form>
      </section>
    </div>
  );
};

export default CreateEvent;
