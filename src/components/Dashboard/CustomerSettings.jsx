import { useEffect, useState } from "react";
import { API_URL, SERVER } from "../../config";
import { toDataURL } from "../../utils/DataUrl";
import FileUpload from "../common/FileUpload";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import PrimaryButton from "../common/PrimaryButton";
import useUserStore from "../../store/AuthStore";
import axios from "axios";

const CustomerSettings = ({ id }) => {
  const { updateSingleUser } = useUserStore();
  const [user, setUsers] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: {
      address1: "",
      address2: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
    },
    avatar: null,
    phone: "",
    gender: "",
  });

  useEffect(() => {
    const fetchSingleUser = async () => {
      const response = await axios.get(`${API_URL}/users/${id}`, {
        withCredentials: true,
      });
      setUsers(response.data.data);
    };

    fetchSingleUser();
  }, [id]);
  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        name: user?.name || "",
        email: user?.email || "",
        location: {
          address1: user?.location?.address1 || "",
          address2: user?.location?.address2 || "",
          city: user?.location?.city || "",
          state: user?.location?.state || "",
          postcode: user?.location?.postcode || "",
          country: user?.location?.country || "",
        },
        avatar: null,
        phone: user?.phone || "",
        gender: user?.gender || "",
      }));
    }
    if (user?.avatar?.secure_url) {
      const avatarUrl = user?.avatar?.secure_url.startsWith("/")
        ? `${SERVER}${user?.avatar?.secure_url}`
        : user?.avatar?.secure_url;
      toDataURL(avatarUrl).then((base64) => {
        setAvatar(base64);
        setFormData((prevData) => ({
          ...prevData,
          avatar: base64,
        }));
      });
    }
  }, [user?.avatar?.secure_url, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      location: {
        ...prevData?.location,
        [name]: value,
      },
    }));
  };

  const handleAvatarChange = (newAvatar) => {
    setAvatar(newAvatar);
    setFormData((prevData) => ({
      ...prevData,
      avatar: newAvatar,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSingleUser(formData, id);
  };


  return (
    <form onSubmit={handleSubmit} className="mx-4">
      <FileUpload
        label="Profile Picture"
        name="avatar"
        setFile={handleAvatarChange}
        file={avatar}
      />
      <div className="lg:grid lg:grid-cols-2 gap-4 my-6">
        <div>
          <InputField
            label="Name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <InputField
            label="Email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <InputField
            label="Phone"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <SelectField
            label="Gender"
            id="gender"
            name="gender"
            required
            value={formData.gender}
            onChange={handleChange}
            options={[
              { value: "male", label: "Male" },
              { value: "male", label: "Female" },
              { value: "other", label: "Other" },
            ]}
            placeholder="Select Gender"
          />
          <InputField
            label="Address 1"
            id="address1"
            name="address1"
            value={formData.location.address1}
            onChange={handleLocationChange}
          />
          <InputField
            label="Address 2"
            id="address2"
            name="address2"
            value={formData.location.address2}
            onChange={handleLocationChange}
          />
        </div>
        <div>
          <InputField
            label="City"
            id="city"
            name="city"
            value={formData.location.city}
            onChange={handleLocationChange}
          />
          <InputField
            label="State"
            id="state"
            name="state"
            value={formData.location.state}
            onChange={handleLocationChange}
          />
          <InputField
            label="Postcode"
            id="postcode"
            name="postcode"
            value={formData.location.postcode}
            onChange={handleLocationChange}
          />
          <InputField
            label="Country"
            id="country"
            name="country"
            value={formData.location.country}
            onChange={handleLocationChange}
          />
        </div>
      </div>
      <PrimaryButton type="submit" value="Update Profile" />
    </form>
  );
};

export default CustomerSettings;
