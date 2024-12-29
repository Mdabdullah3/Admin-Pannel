import React, { useEffect, useState } from "react";
import InputField from "../../common/InputField";
import PrimaryButton from "../../common/PrimaryButton";
import useCategoryStore from "../../../store/categoryStore";
import { useParams } from "react-router-dom";
import FileUpload from "../../common/FileUpload";
import { toDataURL } from "../../../utils/DataUrl";
import { SERVER } from "../../../config";
import InputToggle from "../../common/InputToggle";
import { toast } from "react-toastify";

const EditCategory = () => {
  const [image, setImage] = useState(null);
  const [iconImage, setIconImage] = useState(null);

  const { id } = useParams();
  const { fetchCategoryById, category, updateCategory, loading } =
    useCategoryStore();

  useEffect(() => {
    fetchCategoryById(id);
  }, [fetchCategoryById, id]);

  useEffect(() => {
    if (category?.image?.secure_url) {
      const avatarUrl = `${SERVER}${category.image.secure_url}`;
      toDataURL(avatarUrl).then((base64) => {
        setImage(base64);
      });
    }

    if (category?.iconImage?.secure_url) {
      const avatarUrl = `${SERVER}${category.iconImage.secure_url}`;
      toDataURL(avatarUrl).then((base64) => {
        setIconImage(base64);
      });
    }
    if (category) {
      setForm({
        name: category.name || "",
        shippingCharge: category.shippingCharge || "",
        shippingChargeType: category.shippingChargeType || "percentage",
        status: category.status || "",
        commission: category.commission || "",
        commissionType: category.commissionType || "percentage",
        transactionCost: category.transactionCost || "",
        transactionCostType: category.transactionCostType || "percentage",
        vat: category.vat || "",
        vatType: category.vatType || "percentage",
        isHomeShown: category.isHomeShown || false,
      });
    }
  }, [category]);

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

  const toggleDiscountType = (field) => {
    setForm((prevForm) => ({
      ...prevForm,
      [`${field}Type`]:
        prevForm[`${field}Type`] === "percentage" ? "flat" : "percentage",
    }));
  };
  const validatePercentage = (value, field) => {
    if (form[`${field}Type`] === "percentage" && (value < 0 || value > 100)) {
      toast.error(`${field} percentage must be between 0 and 100%`);
      return false;
    }
    return true;
  };

  const validateForm = () => {
    let isValid = true;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    updateCategory(id, form);
  };

  const handleImageChange = (img) => {
    setImage(img);
    setForm({ ...form, image: img });
  };

  const handleIconImageChange = (img) => {
    setIconImage(img);
    setForm({ ...form, iconImage: img });
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
      {/* <SelectField
        label="Status"
        options={status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
        value={form.status}
      /> */}

      <FileUpload
        label="Category Image"
        setFile={handleImageChange}
        name="image"
        file={image}
      />
      <div className="-mt-10">
        <FileUpload
          label="Icon Image"
          setFile={handleIconImageChange}
          name="iconImage"
          file={iconImage}
        />
      </div>
      <div>
        <InputToggle
          label="Is Home Show?"
          value={form.isHomeShown}
          onChange={(e) => setForm({ ...form, isHomeShown: e.target.checked })}
        />
      </div>
      <PrimaryButton value={loading ? "Updating..." : "Update Category"} />
    </form>
  );
};

export default EditCategory;
