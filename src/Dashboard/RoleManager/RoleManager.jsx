import React, { useEffect } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";
import useUserStore from "../../store/AuthStore";
import InputSearch from "../../components/common/InputSearch";

const RoleManager = () => {
  const {
    users,
    fetchAdminUser,
    // currentPage,
    // totalPages,
    // setPage,
    setSearchTerm,
    setSortField,
    deleteUser,
  } = useUserStore();

  useEffect(() => {
    fetchAdminUser();
  }, [fetchAdminUser]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // const handlePageChange = (newPage) => {
  //   setPage(newPage);
  // };

  const handleSort = (field) => {
    setSortField(field);
  };
  const adminUsers = users.filter((user) => user.role === "admin");
  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      deleteUser(userId);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">Role Manager</h1>
          <Link to="/admin/add-role">
            <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
              <FiPlus className="mr-2" /> Add Role Manager
            </button>
          </Link>
        </div>
        <div className="flex-1 mb-4">
          <InputSearch
            placeholder="Search For Users.."
            onChange={handleSearch}
          />
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th
                onClick={() => handleSort("role")}
                className="py-3 px-6 bg-gray-200 text-left text-xs font-bold uppercase border-b border-gray-200 cursor-pointer"
              >
                Role
              </th>
              <th
                onClick={() => handleSort("name")}
                className="py-3 px-6 bg-gray-200 text-left text-xs font-bold uppercase border-b border-gray-200 cursor-pointer"
              >
                Name
              </th>
              <th
                onClick={() => handleSort("email")}
                className="py-3 px-6 bg-gray-200 text-left text-xs font-bold uppercase border-b border-gray-200 cursor-pointer"
              >
                Email
              </th>
              <th className="py-3 px-6 bg-gray-200 text-left text-xs font-bold uppercase border-b border-gray-200">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {adminUsers.length > 0 ? (
              adminUsers?.map((user) => (
                <tr key={user._id} className="border-b border-gray-200">
                  <td className="py-4 px-6">{user.role}</td>
                  <td className="py-4 px-6">{user.name}</td>
                  <td className="py-4 px-6">{user.email}</td>
                  <td className="py-4 px-6 flex space-x-2">
                    <button
                      onClick={() => handleDelete(user?._id)}
                      className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <FiTrash className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-xl py-6">
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* <div className="flex justify-end mt-4">
          <button
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="mx-2 px-4 py-2 border-gray-400 border rounded-lg ">
            {currentPage}
          </span>
          <button
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default RoleManager;
