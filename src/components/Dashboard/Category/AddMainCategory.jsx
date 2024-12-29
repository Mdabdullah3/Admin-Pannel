import React, { useState, useEffect } from "react";
import InputField from "../../common/InputField";
import PrimaryButton from "../../common/PrimaryButton";
import useCategoryStore from "../../../store/categoryStore";
import FileUpload from "../../common/FileUpload";
import { toast } from "react-toastify";
import InputToggle from "../../common/InputToggle";

const AddMainCategory = () => {
  const [image, setImage] = useState(null);
  const { addCategory, loading } = useCategoryStore();
  const [iconImage, setIconImage] = useState(null);
  // const status = [
  //   { id: 1, label: "Active", value: "active" },
  //   { id: 2, label: "Inactive", value: "inactive" },
  // ];

  const [form, setForm] = useState({
    name: "",
    shippingCharge: "",
    shippingChargeType: "percentage",
    status: "",
    commission: "",
    commissionType: "percentage",
    transactionCost: "",
    transactionCostType: "percentage",
    vat: "",
    vatType: "percentage",
    image: image,
    iconImage: iconImage,
    isHomeShown: false,
  });

  useEffect(() => {
    setForm((prevForm) => ({ ...prevForm, image, iconImage }));
  }, [image, iconImage]);

  const toggleDiscountType = (field) => {
    setForm((prevForm) => ({
      ...prevForm,
      [`${field}Type`]:
        prevForm[`${field}Type`] === "percentage" ? "flat" : "percentage",
    }));
  };

  // Validation function to ensure percentage is less than or equal to 100
  const validatePercentage = (value, field) => {
    if (form[`${field}Type`] === "percentage" && (value < 0 || value > 100)) {
      toast.error(`${field} percentage must be between 0 and 100%`);
      return false;
    }
    return true;
  };

  const validateForm = () => {
    let isValid = true;

    // Validate individual percentage fields
    if (
      !validatePercentage(Number(form.shippingCharge) || 0, "Shipping Charge")
    )
      isValid = false;
    if (!validatePercentage(Number(form.commission) || 0, "Commission"))
      isValid = false;
    if (
      !validatePercentage(Number(form.transactionCost) || 0, "Transaction Cost")
    )
      isValid = false;
    if (!validatePercentage(Number(form.vat) || 0, "VAT")) isValid = false;

    // Validate that all percentages together are reasonable
    const totalPercentage =
      (form.shippingChargeType === "percentage"
        ? Number(form.shippingCharge) || 0
        : 0) +
      (form.commissionType === "percentage"
        ? Number(form.commission) || 0
        : 0) +
      (form.transactionCostType === "percentage"
        ? Number(form.transactionCost) || 0
        : 0) +
      (form.vatType === "percentage" ? Number(form.vat) || 0 : 0);

    if (totalPercentage > 100) {
      toast.error("Total percentage across all fields cannot exceed 100%");
      isValid = false;
    }

    return isValid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await addCategory(form);
    } catch (error) {
      toast.error("Failed to add category. Please try again.");
    }
  };

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-5"
      onSubmit={handleSubmit}
    >
      <InputField
        label="Category Name"
        placeholder="Category Name"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <div className="flex items-start">
        <InputField
          label={`Shipping Charge (${
            form.shippingChargeType === "percentage" ? "%" : "Flat Amount"
          })`}
          value={form.shippingCharge}
          onChange={(e) => setForm({ ...form, shippingCharge: e.target.value })}
          placeholder={`Enter ${
            form.shippingChargeType === "percentage"
              ? "Percentage"
              : "Flat Amount"
          } Shipping Charge`}
        />
        <button
          type="button"
          className="px-4 py-3 border rounded mt-7"
          onClick={() => toggleDiscountType("shippingCharge")}
        >
          {form.shippingChargeType === "percentage" ? "%" : "Flat"}
        </button>
      </div>
      <div className="flex items-start">
        <InputField
          label={`Category Commission (${
            form.commissionType === "percentage" ? "%" : "Flat Amount"
          })`}
          value={form.commission}
          onChange={(e) => setForm({ ...form, commission: e.target.value })}
          placeholder={`Enter ${
            form.commissionType === "percentage" ? "Percentage" : "Flat Amount"
          } Commission`}
        />
        <button
          type="button"
          className="px-4 py-3 border rounded mt-7"
          onClick={() => toggleDiscountType("commission")}
        >
          {form.commissionType === "percentage" ? "%" : "Flat"}
        </button>
      </div>
      <div className="flex items-start">
        <InputField
          label={`Transaction Cost (${
            form.transactionCostType === "percentage" ? "%" : "Flat Amount"
          })`}
          value={form.transactionCost}
          onChange={(e) =>
            setForm({ ...form, transactionCost: e.target.value })
          }
          placeholder={`Enter ${
            form.transactionCostType === "percentage"
              ? "Percentage"
              : "Flat Amount"
          } Transaction Cost`}
        />
        <button
          type="button"
          className="px-4 py-3 border rounded mt-7"
          onClick={() => toggleDiscountType("transactionCost")}
        >
          {form.transactionCostType === "percentage" ? "%" : "Flat"}
        </button>
      </div>
      <div className="flex items-start">
        <InputField
          label={`Category VAT (${
            form.vatType === "percentage" ? "%" : "Flat Amount"
          })`}
          value={form.vat}
          onChange={(e) => setForm({ ...form, vat: e.target.value })}
          placeholder={`Enter ${
            form.vatType === "percentage" ? "Percentage" : "Flat Amount"
          } VAT`}
        />
        <button
          type="button"
          className="px-4 py-3 border rounded mt-7"
          onClick={() => toggleDiscountType("vat")}
        >
          {form.vatType === "percentage" ? "%" : "Flat"}
        </button>
      </div>

      <FileUpload label="Category Image" setFile={setImage} name="image" />
      <div className="-mt-10">
        <FileUpload
          label="Icon Image"
          setFile={setIconImage}
          name="iconImage"
        />
      </div>
      <div>
        <InputToggle
          label="Is Home Show?"
          value={form.isHomeShown}
          onChange={(e) => setForm({ ...form, isHomeShown: e.target.checked })}
        />
      </div>
      <PrimaryButton
        value={loading ? "Adding..." : "Add Category"}
        disabled={loading}
      />
    </form>
  );
};

export default AddMainCategory;
