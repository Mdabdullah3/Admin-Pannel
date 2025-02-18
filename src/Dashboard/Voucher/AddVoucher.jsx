import React, { useEffect, useState } from "react";
import InputField from "../../components/common/InputField";
import SelectField from "../../components/common/SelectField";
import PrimaryButton from "../../components/common/PrimaryButton";
import useVoucherStore from "../../store/useVoucherStore";
import useUserStore from "../../store/AuthStore";

const AddNewVoucher = () => {
  const { user, fetchUser } = useUserStore();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  const [form, setForm] = useState({
    user: user?._id,
    redeemCode: "",
    startDate: "",
    discountType: "percentage",
    minimumPurchase: "",
    endDate: "",
    discount: "",
    status: "",
  });

  const addVoucher = useVoucherStore((state) => state.addVoucher);
  const loading = useVoucherStore((state) => state.loading);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addVoucher(form);
    setForm({
      user: user?._id,
      redeemCode: "",
      startDate: "",
      endDate: "",
      discountType: "percentage",
      discount: "",
      status: "",
      minimumPurchase: "",
    });
  };
  const toggleDiscountType = () => {
    setForm((prevForm) => ({
      ...prevForm,
      discountType:
        prevForm.discountType === "percentage" ? "flat" : "percentage",
    }));
  };
  return (
    <section className="mt-5">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <InputField
            label="Redeem Code"
            value={form.redeemCode}
            placeholder="Enter Redeem Code"
            onChange={(e) => setForm({ ...form, redeemCode: e.target.value })}
            required
          />
          <InputField
            label="Minimum Purchase"
            value={form.minimumPurchase}
            placeholder="Enter Minimum Purchase"
            onChange={(e) =>
              setForm({ ...form, minimumPurchase: e.target.value })
            }
            required
          />
          <div className="flex items-start">
            <InputField
              label={`Discount (${
                form.discountType === "percentage" ? "%" : "Flat Amount"
              })`}
              value={form.discount}
              placeholder={`Enter ${
                form.discountType === "percentage"
                  ? "Percentage"
                  : "Flat Amount"
              } Discount`}
              onChange={(e) => setForm({ ...form, discount: e.target.value })}
              required
            />
            <button
              type="button"
              className="px-4 py-3 border rounded mt-7"
              onClick={toggleDiscountType}
            >
              {form.discountType === "percentage" ? "%" : "Flat"}
            </button>
          </div>
          <InputField
            label="Start Date"
            type="date"
            value={form.startDate}
            placeholder="Enter Start Date"
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            required
          />
          <InputField
            label="End Date"
            type="date"
            value={form.endDate}
            placeholder="Enter End Date"
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            required
          />
          <SelectField
            label="Status"
            id="status"
            name="status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            options={[
              { value: "active", label: "Active" },
              { value: "expired", label: "Expired" },
            ]}
            required
          />
        </div>

        <PrimaryButton
          value={loading ? "Loading..." : "Add New Voucher"}
          disabled={loading}
        />
      </form>
    </section>
  );
};

export default AddNewVoucher;
