import React, { useEffect, useState } from "react";
import InputSearch from "../../components/common/InputSearch";
import TableHead from "../../components/common/TableHead";
import { Link } from "react-router-dom";
import useUserStore from "../../store/AuthStore";
import useOrderStore from "../../store/OrderStore";
import { SERVER } from "../../config";

const Customer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userOrders, setUserOrders] = useState({});

  const { fetchAllCustomer, users, deleteUser } = useUserStore();
  const { fetchCustomerOrders } = useOrderStore();

  useEffect(() => {
    fetchAllCustomer();
  }, [fetchAllCustomer]);

  // Fetch orders for all users
  useEffect(() => {
    const loadOrdersForAllUsers = async () => {
      const ordersByUser = {};
      for (let user of users) {
        const orders = await fetchCustomerOrders(user._id);
        ordersByUser[user._id] = orders;
      }
      setUserOrders(ordersByUser);
    };

    if (users?.length) {
      loadOrdersForAllUsers();
    }
  }, [users, fetchCustomerOrders]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };
  const header = [
    "Customer ID",
    "Name",
    "Image",
    "Active Orders",
    "Total Orders",
    "Join Date",
    "Action",
  ];

  const calculateActiveOrders = (orders) => {
    return orders?.filter(
      (order) => order.status === "pending" || order.status === "shipped"
    ).length;
  };

  return (
    <section className="px-5 mt-10">
      <div>
        <div className="flex-1">
          <InputSearch
            placeholder="Search For Customer.."
            value={searchTerm}
            onChange={(value) => setSearchTerm(value)}
            onSearch={handleSearch}
          />
        </div>

        <table className="table-auto w-full overflow-auto mt-10">
          <TableHead header={header} />
          {users?.map((user) => {
            const orders = userOrders[user._id] || [];
            const activeOrders = calculateActiveOrders(orders);
            const totalOrders = orders.length;

            return (
              <tbody key={user._id}>
                <tr className="border-r border-l border-gray-300 border-b">
                  <td className="text-center text-dark font-medium text-secondary py-5 text-sm bg-transparent border-b border-l border-r border-gray-300">
                    {user._id}
                  </td>
                  <td className="text-center text-dark font-medium text-secondary py-5 px-2 bg-transparent border-b border-r border-gray-300 capitalize">
                    {user.name}
                  </td>
                  <td className="text-center text-dark font-medium text-secondary py-5 px-2 bg-transparent border-b border-r border-gray-300">
                    <img
                      src={
                        user?.avatar?.public_id &&
                        user?.avatar?.secure_url.startsWith("/")
                          ? `${SERVER}${user?.avatar?.secure_url}`
                          : user?.avatar?.secure_url
                      }
                      alt={user?.name || "User Avatar"}
                      className="w-20 h-20 mx-auto"
                    />
                  </td>
                  <td className="text-center text-dark font-medium text-secondary py-5 px-2 cursor-pointer bg-transparent border-b border-r border-gray-300">
                    {activeOrders}
                  </td>
                  <td className="text-center text-dark font-medium text-secondary py-5 px-2 cursor-pointer bg-transparent border-b border-r border-gray-300">
                    {totalOrders}
                  </td>
                  <td className="text-center text-dark font-medium text-secondary py-5 px-2 cursor-pointer bg-transparent border-b border-r border-gray-300">
                    {new Date(user?.createdAt).toLocaleDateString("en-US")}
                  </td>
                  <td className="text-center text-dark font-medium text-secondary py-5 px-2 cursor-pointer bg-transparent border-b border-r border-gray-300">
                    <Link to={`/admin/customer/${user._id}`}>
                      <button className="bg-primary text-white px-5 py-1.5 rounded-lg">
                        More
                      </button>
                    </Link>
                    <h1 onClick={() => deleteUser(user?._id)}>Delete</h1>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </section>
  );
};

export default Customer;
