import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { API_URL } from "../../config";

const Shipping = () => {
  const [shipping, setShipping] = useState([]);
  useEffect(() => {
    const url = `${API_URL}/delivery-fees?_limit=64`;
    fetch(url, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setShipping(data?.data));
  }, []);

  return (
    <div className="flex">
      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">Shipping</h1>
          <Link to="/admin/create-shipping">
            <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary/60">
              <FiPlus className="mr-2" /> Edit Shipping
            </button>
          </Link>
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-200 text-left text-xs font-bold uppercase border-b border-gray-200 cursor-pointer">
                District
              </th>
              <th className="py-3 px-6 bg-gray-200 text-left text-xs font-bold uppercase border-b border-gray-200 cursor-pointer">
                DeliveryFee
              </th>
            </tr>
          </thead>
          <tbody>
            {shipping?.length > 0 ? (
              shipping?.map((ship) => (
                <tr key={ship._id} className="border-b border-gray-200">
                  <td className="py-4 px-6 capitalize">{ship.district}</td>
                  <td className="py-4 px-6">{ship.deliveryFee}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-xl py-6">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Shipping;
