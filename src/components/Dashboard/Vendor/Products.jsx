import React, { useEffect, useState } from "react";
import InputSearch from "../../common/InputSearch";
import TableHead from "../../../components/common/TableHead";
import { SERVER } from "../../../config";
import { Link } from "react-router-dom";
import useProductStore from "../../../store/ProductStore";

const Products = ({ id, updateProduct }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMenu, setActiveMenu] = useState("All");
  const [page, setPage] = useState(1);
  const { products, totalPages, fetchProductByIdForUser, loading } =
    useProductStore();

  useEffect(() => {
    fetchProductByIdForUser({}, id, page, 20, searchTerm);
  }, [id, page, searchTerm, fetchProductByIdForUser]);

  const handleMenuClick = (status) => {
    setActiveMenu(status);
    const filter = status === "All" ? "" : status.toLowerCase();
    fetchProductByIdForUser(id, page, filter, 20, searchTerm);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleStatusChange = (id, status) => {
    updateProduct(id, { status });
  };

  const header = [
    "Image",
    "Product Name",
    "Quantity",
    "Price",
    "Status",
    "Date",
    "Action",
  ];

  const menu = [
    { id: 1, name: "All", status: "All", items: products?.length },
    {
      id: 2,
      name: "Online",
      status: "approved",
      items: products?.filter((product) => product.status === "approved")
        .length,
    },
    {
      id: 3,
      name: "Pending",
      status: "pending",
      items: products?.filter((product) => product.status === "pending").length,
    },
    {
      id: 4,
      name: "Suspended",
      status: "suspend",
      items: products?.filter((product) => product.status === "suspend").length,
    },
    {
      id: 5,
      name: "Cancelled",
      status: "cancelled",
      items: products?.filter((product) => product.status === "cancelled")
        .length,
    },
  ];

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };


  return (
    <section className="py-5">
      <InputSearch
        placeholder="Search For Product.."
        value={searchTerm}
        onChange={(value) => handleSearch(value)}
        onSearch={handleSearch}
      />

      <div className="flex items-center justify-center border-b-2 gap-10 mt-10 flex-wrap">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => handleMenuClick(item.status)}
            className={`font-bold pb-2 ${
              activeMenu === item.status
                ? "text-primary border-b-2 border-primary"
                : ""
            }`}
          >
            {item.name} ({item.items})
          </button>
        ))}
      </div>

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : products?.length === 0 ? (
          <h1 className="text-center text-red-600 py-4 text-2xl">
            No Products Found
          </h1>
        ) : (
          <div className="overflow-auto">
            <table className="table-auto w-full mt-10">
              <TableHead header={header} />
              {products?.map((item) => (
                <tbody key={item?.id}>
                  <tr className="border-r border-l border-gray-300 border-b">
                    <td>
                      <img
                        className="w-20 h-20 mx-auto"
                        src={`${SERVER}${item?.coverPhoto?.secure_url}`}
                        alt={item?.name}
                      />
                    </td>
                    <td className="text-center">{item?.name}</td>
                    <td className="text-center">
                      {item?.productVariants?.[0]?.quantity || 0}
                    </td>
                    <td className="text-center">
                      {item?.productVariants?.[0]?.price || 0} BDT
                    </td>
                    <td className="text-center">
                      <select
                        value={item?.status}
                        onChange={(e) =>
                          handleStatusChange(item?._id, e.target.value)
                        }
                        className="border border-gray-300 p-2 rounded"
                      >
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="suspend">Suspended</option>
                      </select>
                    </td>
                    <td className="text-center">
                      {new Date(item?.createdAt).toLocaleDateString("en-US")}
                    </td>
                    <td className="text-center">
                      <Link to={`/admin/edit-product/${item?._id}`}>
                        <button className="bg-primary text-white px-5 py-1.5 rounded-lg">
                          Edit
                        </button>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>

            {/* Pagination */}
          </div>
        )}
      </div>
      <div className="flex justify-center items-center mt-5">
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
          className="px-4 py-2 border rounded mr-2"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`px-4 py-2 border ${
              i + 1 === page ? "bg-primary text-white" : ""
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
          className="px-4 py-2 border rounded ml-2"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Products;
