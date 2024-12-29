import React, { useState } from "react";
import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";
import { toast } from "react-toastify";
import useUserStore from "../../store/AuthStore";
const AddRole = () => {
  const menuOptions = [
    { label: "Vendor", value: "isVendor" },
    { label: "Customer", value: "isCustomer" },
    { label: "Categories", value: "isCategories" },
    { label: "Products", value: "isProducts" },
    { label: "Orders & Reviews", value: "isOrders" },
    { label: "Vouchers", value: "isVouchers" },
    { label: "Ad Manager", value: "isAdManager" },
    { label: "Role Manager", value: "isRoleManager" },
    { label: "Message Center", value: "isMessageCenter" },
    { label: "Finance", value: "isFinance" },
    { label: "Shipment", value: "isShipment" },
    { label: "Support", value: "isSupport" },
    { label: "Event Manager", value: "isEventManager" },
    { label: "Email & Message", value: "isMessage" },
    {
      label: "Dashboard",
      value: "isHasDashboard",
    },
    {
      label: "Banner Image Upload",
      value: "isHasBanner",
    },
  ];
  const { register, loading } = useUserStore();
  const [form, setForm] = useState({
    role: "admin",
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    otherPermissions: menuOptions.reduce(
      (acc, curr) => ({ ...acc, [curr.value]: false }),
      {}
    ),
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm({
        ...form,
        otherPermissions: { ...form.otherPermissions, [name]: checked },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const result = await register(form);
      if (result.status === "success") {
        toast.success("Role Manager added successfully");
      } else {
        toast.error("Failed to add Role Manager");
      }
    } catch (error) {
      // toast.error("An error occurred");
    }
  };

  return (
    <section className="mt-5">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <InputField
            label="role"
            name="role"
            value={form.role}
            required
            disabled={true}
          />
          <InputField
            label="Name"
            name="name"
            value={form.name}
            placeholder="Enter Name"
            onChange={handleChange}
            required
          />
          <InputField
            label="Email"
            name="email"
            value={form.email}
            placeholder="Enter Email"
            onChange={handleChange}
            required
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            placeholder="Enter Password"
            onChange={handleChange}
            required
          />
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            placeholder="Enter Password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="my-4">
          <h1>Allow Permission</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {menuOptions?.map((item) => (
              <div key={item.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={item.value}
                  name={item.value}
                  checked={form.otherPermissions[item.value]}
                  onChange={handleChange}
                />
                <label htmlFor={item.value} className="ml-2">
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        <PrimaryButton
          value={loading ? "Loading..." : "Add Role Manager"}
          disabled={loading}
        />
      </form>
    </section>
  );
};

export default AddRole;
