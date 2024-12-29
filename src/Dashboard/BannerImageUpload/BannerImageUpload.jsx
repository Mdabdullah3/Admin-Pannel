import React, { useEffect } from "react";
import { FaTrash } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import useOtherStore from "../../store/OtherStore";
import { SERVER } from "../../config";
const BannerImageUpload = () => {
  const { others, fetchOthers, deleteOther } = useOtherStore();
  useEffect(() => {
    fetchOthers();
  }, [fetchOthers]);
  const bannerImage = others.filter((other) => other?.banner === "BannerImage");
  const LogoImage = others.filter((other) => other?.banner === "LogoImage");
  const PopUp = others.filter((other) => other?.banner === "PopUp");
  const headerForBanner = ["Image", "Mobile Image", "Action"];
  const headerForLogo = ["Image", "Action"];
  return (
    <section>
      <div className="">
        <div className="flex-1 p-10">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-xl font-bold">Banner Image</h1>
            <Link to="/admin/banner-img-upload">
              <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary/80">
                <FiPlus className="mr-2" /> Upload Image
              </button>
            </Link>
          </div>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                {headerForBanner?.map((head, index) => (
                  <th
                    key={index}
                    className="py-3 px-6 bg-gray-200 text-left text-xs font-bold uppercase border-b border-gray-200"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bannerImage?.map((img) => (
                <tr key={img?._id} className="border-b border-gray-200">
                  <td className="py-4 px-6">
                    <img src={`${SERVER}${img?.image?.secure_url}`} alt="" />
                  </td>
                  <td className="py-4 px-6">
                    <img
                      src={`${SERVER}${img?.mobileBanner?.secure_url}`}
                      alt=""
                    />
                  </td>
                  <td className="py-4 px-6 flex space-x-2 cursor-pointer">
                    <div
                      onClick={() => deleteOther(img?._id)}
                      className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <FaTrash className="mr-1" /> Delete
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-10">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-xl font-bold">Logo Image Upload</h1>
            <Link to="/admin/logo-image">
              <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary/80">
                <FiPlus className="mr-2" /> Upload Image
              </button>
            </Link>
          </div>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                {headerForLogo?.map((head, index) => (
                  <th
                    key={index}
                    className="py-3 px-6 bg-gray-200 text-left text-xs font-bold uppercase border-b border-gray-200"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LogoImage?.map((img) => (
                <tr
                  key={img?._id}
                  className="border-b border-gray-200 items-center"
                >
                  <td className="py-4 px-6">
                    <img
                      src={`${SERVER}${img?.logo?.secure_url}`}
                      className="w-32 h-32 "
                      alt=""
                    />
                  </td>

                  <td className="py-4 px-6 flex space-x-2 cursor-pointer">
                    {/* <Link
                      to={`/admin/logo-image-update/${img?._id}`}
                      className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <FaEdit className="mr-1" /> Edit
                    </Link> */}
                    <div
                      onClick={() => deleteOther(img?._id)}
                      className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <FaTrash className="mr-1" /> Delete
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-10">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-xl font-bold">Pop Up Image Upload</h1>
            <Link to="/admin/popup-img-upload">
              <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary/80">
                <FiPlus className="mr-2" /> Upload Image
              </button>
            </Link>
          </div>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                {headerForBanner?.map((head, index) => (
                  <th
                    key={index}
                    className="py-3 px-6 bg-gray-200 text-left text-xs font-bold uppercase border-b border-gray-200"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PopUp?.map((img) => (
                <tr key={img?._id} className="border-b border-gray-200">
                  <td className="py-4 px-6">
                    <img
                      src={`${SERVER}${img?.popupImage?.secure_url}`}
                      alt=""
                    />
                  </td>
                  <td className="py-4 px-6">
                    <img
                      src={`${SERVER}${img?.popupImageMobile?.secure_url}`}
                      alt=""
                    />
                  </td>
                  <td className="py-4 px-6 flex space-x-2 cursor-pointer">
                    <div
                      onClick={() => deleteOther(img?._id)}
                      className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <FaTrash className="mr-1" /> Delete
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default BannerImageUpload;
