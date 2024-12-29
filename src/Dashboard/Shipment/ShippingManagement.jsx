import React, { useEffect, useState } from "react";
import useShippingStore from "../../store/shippingStore";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URL } from "../../config";

const ShippingManagement = () => {
  const { shippingCharges, fetchShippingCharges, updateSingleShippingCharge } =
    useShippingStore();
  const [selected, setSelected] = useState([]);
  const [editedCharges, setEditedCharges] = useState({});
  const [allSelected, setAllSelected] = useState(false);
  const [bulkFee, setBulkFee] = useState("");

  useEffect(() => {
    fetchShippingCharges();
  }, [fetchShippingCharges]);


  // Handle single row selection
  const handleSelect = (id) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  // Handle "Select All" toggle
  const handleSelectAll = () => {
    if (allSelected) {
      setSelected([]);
    } else {
      setSelected(shippingCharges.map(({ _id }) => _id));
    }
    setAllSelected(!allSelected);
  };

  // Handle input change
  const handleInputChange = (id, value) => {
    setEditedCharges((prevCharges) => ({
      ...prevCharges,
      [id]: value,
    }));
  };

  // Handle bulk input change
  const handleBulkInputChange = (value) => {
    setBulkFee(value);
  };

  // Handle single update
  const handleSingleUpdate = async (id) => {
    const newDeliveryFee = editedCharges[id];
    if (newDeliveryFee !== undefined) {
      try {
        await updateSingleShippingCharge(id, newDeliveryFee);
      } catch (error) {
        toast.error("Failed to update shipping charge");
      }
    } else {
      toast.error("No changes detected for this district");
    }
  };

  // Handle bulk update
  const handleBulkUpdate = async () => {
    if (selected.length > 0 && bulkFee) {
      try {
        const requestBody = {
          deliveryFeeIds: selected,
          deliveryFee: parseFloat(bulkFee),
        };

        const response = await axios.patch(
          `${API_URL}/delivery-fees/update-many`,
          requestBody,
          {
            withCredentials: true,
          }
        );
        toast.success("Shipping charges updated successfully!");
        fetchShippingCharges();
      } catch (error) {
        // Handle errors
        toast.error(
          error.response?.data?.message || "Failed to update selected districts"
        );
      }
    } else {
      toast.error("Please select districts and enter a delivery fee");
    }
  };

  return (
    <div className="flex flex-col p-10 relative">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Shipping Management</h1>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-3 px-6 bg-gray-200 text-left text-xs font-bold uppercase border-b border-gray-200 cursor-pointer">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={handleSelectAll}
              />
            </th>
            <th className="py-3 px-6 bg-gray-200 text-left text-xs font-bold uppercase border-b border-gray-200 cursor-pointer">
              District
            </th>
            <th className="py-3 px-6 bg-gray-200 text-left text-xs font-bold uppercase border-b border-gray-200 cursor-pointer">
              Delivery Fee
            </th>
            <th className="py-3 px-6 bg-gray-200 text-left text-xs font-bold uppercase border-b border-gray-200 cursor-pointer">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {shippingCharges?.length > 0 ? (
            shippingCharges?.map(({ _id, district, deliveryFee }) => (
              <tr key={_id} className="border-b border-gray-200">
                <td className="py-4 px-6">
                  <input
                    type="checkbox"
                    checked={selected.includes(_id)}
                    onChange={() => handleSelect(_id)}
                  />
                </td>
                <td className="py-4 px-6 capitalize">{district}</td>
                <td className="py-4 px-6">
                  <input
                    type="number"
                    value={editedCharges[_id] || deliveryFee}
                    onChange={(e) => handleInputChange(_id, e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => handleSingleUpdate(_id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="py-3 px-6 text-center whitespace-nowrap border-b border-gray-200"
              >
                No shipping charges found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <section className="sticky flex justify-end bottom-0 bg-gray-200 px-4 p-2 shadow-lg">
        {selected.length > 0 && (
          <div className="flex">
            <input
              type="number"
              placeholder="Set fee for selected..."
              value={bulkFee}
              onChange={(e) => handleBulkInputChange(e.target.value)}
              className="border rounded px-2 py-1 mr-4"
            />
            <button
              onClick={handleBulkUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Update All Selected
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ShippingManagement;
