import React, { useEffect } from "react";
import { FiEdit, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import usePackageStore from "../../store/PackageStore";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
const AdManager = () => {
  const { fetchPackages, packages } = usePackageStore();
  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const header = [
    "Package Name",
    "Duration",
    "Price",
    "Max Product",
    "Status",
    "Action",
  ];

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">Ad Manager</h1>
          <Link to="/admin/create-ad">
            <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary/80">
              <FiPlus className="mr-2" /> Create Ad
            </button>
          </Link>
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              {header.map((head, index) => (
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
            {packages?.map((pack) => (
              <tr
                key={pack?._id}
                className="border-b border-gray-200 capitalize"
              >
                <td className="py-4 px-6">{pack.name}</td>
                <td className="py-4 px-6">{pack.duration} Days</td>
                <td className="py-4 px-6 flex items-center gap-1">
                  <FaBangladeshiTakaSign />
                  {pack.price}
                </td>
                <td className="py-4 px-6">{pack.maxProduct}</td>
                <td className="py-4 px-6">{pack.status}</td>
                <td className="py-4 px-6 flex space-x-2">
                  <Link
                    to={`/admin/edit-package/${pack?._id}`}
                    className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    <FiEdit className="mr-1" /> Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdManager;
