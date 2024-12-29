import React, { useEffect, useState } from "react";
import PrimaryButton from "../../components/common/PrimaryButton";
import VendorProducts from "../../components/Dashboard/Vendor/Products";
import VendorOrders from "../../components/Dashboard/Vendor/VendorOrders";
import VendorVouchers from "../../components/Dashboard/Vendor/VendorVouchers";
import VendorCampaign from "../../components/Dashboard/Vendor/VendorCampaign";
import VendorAds from "../../components/Dashboard/Vendor/VendorAds";
import VendorReview from "../../components/Dashboard/Vendor/VendorReview";
import VendorSetting from "../../components/Dashboard/Vendor/VendorSetting";
import useProductStore from "../../store/ProductStore";
import useVoucherStore from "../../store/useVoucherStore";
import useUserStore from "../../store/AuthStore";
import { API_URL, SERVER } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const SingleVendor = () => {
  const { id } = useParams();
  const [user, setUsers] = useState([]);
  const [activeMenu, setActiveMenu] = useState(1);
  const { products, fetchProductByIdForUser, updateProduct } =
    useProductStore();
  const { vouchers, fetchVoucherByUserId } = useVoucherStore();

  const menu = [
    { id: 1, name: "Products", items: 5 },
    { id: 2, name: "Orders", items: 5 },
    { id: 3, name: "Vouchers", items: 5 },
    { id: 4, name: "Campaigns", items: 5 },
    { id: 5, name: "Running Ads", items: 5 },
    { id: 6, name: "Reviews", items: 5 },
    { id: 7, name: "About Settings" },
  ];

  const fetchSingleUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/${id}`, {
        withCredentials: true,
      });
      setUsers(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch user data!");
    }
  };
  useEffect(() => {
    fetchSingleUser();
    fetchProductByIdForUser(id);
    fetchVoucherByUserId(id);
  }, [id, fetchProductByIdForUser, fetchVoucherByUserId]);

  const handleDectiveProfile = async () => {
    try {
      const updatedStatus = !user?.isActive;
      const response = await axios.patch(
        `${API_URL}/users/${id}`,
        { isActive: updatedStatus },
        {
          withCredentials: true,
        }
      );
      if (response) {
        toast.success("Profile Dective status updated successfully!");
        setUsers((prevState) => ({
          ...prevState,
          isActive: updatedStatus,
        }));
      }
    } catch (error) {
      toast.error("Profile status update failed!");
    }
  };
  const handleVerifiedProfile = async () => {
    try {
      const updatedStatus = !user?.isVerified;
      const response = await axios.patch(
        `${API_URL}/users/${id}`,
        { isVerified: updatedStatus },
        {
          withCredentials: true,
        }
      );
      if (response) {
        toast.success("Profile verification status updated successfully!");
        setUsers((prevState) => ({
          ...prevState,
          isVerified: updatedStatus,
        }));
      }
    } catch (error) {
      toast.error("Profile status update failed!");
    }
  };

  return (
    <section className="w-11/12 mx-auto my-6">
      <div className="flex items-center justify-between">
        <h1 className="md:text-3xl text-xl text-gray-700 font-bold">Vendor</h1>
        <h2 className="md:text-xl font-bold">{user?._id}</h2>
      </div>
      <div className="flex items-center justify-center gap-4 flex-wrap mt-4 md:mt-0">
        <img
          src={
            user?.avatar?.public_id && user?.avatar?.secure_url.startsWith("/")
              ? `${SERVER}${user?.avatar?.secure_url}`
              : user?.avatar?.secure_url
          }
          alt="vendor"
          className="w-40 px-4 py-4 shadow-lg rounded-lg border border-gray-300"
        />
        <h1 className="text-xl font-bold capitalize">{user?.name}</h1>
        {user?.isVerified === false ? (
          <PrimaryButton onClick={handleVerifiedProfile} value="Not Verified" />
        ) : (
          <button
            onClick={handleVerifiedProfile}
            className="bg-blue-500 hover:bg-blue-500/70 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
          >
            Verified
          </button>
        )}
        {user?.isActive === false ? (
          <PrimaryButton onClick={handleDectiveProfile} value="Deactive" />
        ) : (
          <button
            onClick={handleDectiveProfile}
            className="bg-green-500 hover:bg-green-500/70 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
          >
            Active
          </button>
        )}
      </div>
      <div className="flex mt-8 items-center justify-center gap-10 w-10/12 mx-auto my-4 border-b-2 flex-wrap">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveMenu(item.id)}
            className={`font-bold pb-2 ${
              activeMenu === item.id
                ? "text-primary border-b-2 border-primary"
                : ""
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
      {activeMenu === 1 && (
        <VendorProducts
          products={products}
          updateProduct={updateProduct}
          id={id}
        />
      )}
      {activeMenu === 2 && <VendorOrders id={id} />}
      {activeMenu === 3 && <VendorVouchers vouchers={vouchers} id={id} />}
      {activeMenu === 4 && <VendorCampaign id={id} />}
      {activeMenu === 5 && <VendorAds id={id} />}
      {activeMenu === 6 && <VendorReview product={products} />}
      {activeMenu === 7 && <VendorSetting id={id} />}
    </section>
  );
};

export default SingleVendor;
