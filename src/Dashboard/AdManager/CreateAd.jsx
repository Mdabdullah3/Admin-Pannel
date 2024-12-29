import React, { useState } from "react";
import InputField from "../../components/common/InputField";
import SelectField from "../../components/common/SelectField";
import PrimaryButton from "../../components/common/PrimaryButton";
import usePackageStore from "../../store/PackageStore";

const CreateAd = () => {
  const { addPackages, loading } = usePackageStore();
  const [form, setForm] = useState({
    name: "",
    user: "668d05a57abb2e4c8bf5c361",
    duration: "",
    price: "",
    maxProduct: "",
    status: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddPackage = (e) => {
    e.preventDefault();
    setForm({
      name: form.name,
      user: form.user,
      duration: form.duration,
      price: form.price,
      maxProduct: form.maxProduct,
      status: form.status,
    });
    addPackages(form);
  };

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  return (
    <div className="flex h-screen">
      <section className="flex-1 p-10">
        <form onSubmit={handleAddPackage} className="mb-5">
          <InputField
            label="Package Name"
            id="name"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="Enter package name"
            required
          />
          <InputField
            label="Duration"
            id="duration"
            name="duration"
            type="number"
            value={form.duration}
            onChange={handleInputChange}
            placeholder="Enter duration in days"
            required
          />
          <InputField
            label="Price"
            id="price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleInputChange}
            placeholder="Enter price"
            required
          />
          <InputField
            label="Max Product"
            id="maxProduct"
            type="number"
            name="maxProduct"
            value={form.maxProduct}
            onChange={handleInputChange}
            placeholder="Enter max products"
            required
          />
          <SelectField
            label="Status"
            id="status"
            name="status"
            value={form.status}
            onChange={handleInputChange}
            options={statusOptions}
            placeholder="Select status"
            required
          />
          <PrimaryButton
            type="submit"
            value={loading ? "Loading..." : "Add Package"}
          />
        </form>
      </section>
    </div>
  );
};

export default CreateAd;
