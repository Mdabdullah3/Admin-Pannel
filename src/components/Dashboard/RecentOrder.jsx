import React, { useEffect, useState } from "react";
import TableHead from "../common/TableHead";
import { toast } from "react-toastify";
import { API_URL, SERVER } from "../../config";
import axios from "axios";
const RecentOrder = () => {
  const header = [
    "Image",
    "Product Name",
    "Customer",
    "Product ID",
    "Quantity",
  ];

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/orders?_sort=-createdAt&_limit=10`
        );
        setOrders(response.data.data);
      } catch (error) {
        toast.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);
  return (
    <div className="overflow-auto w-full">
      <table className="table-auto w-full ">
        <TableHead header={header} />
        {orders?.map((item) => (
          <tbody key={item?._id}>
            <tr className="border-r border-l border-gray-300 border-b">
              <td>
                <img
                  className="w-20 h-20 mx-auto"
                  src={`${SERVER}${item?.product?.coverPhoto?.secure_url}`}
                  alt=""
                />
              </td>
              <td
                className="
                               text-center text-dark
                               font-medium
                               text-secondary
                               py-5 text-sm
                                bg-transparent
                               border-b border-l border-r border-gray-300
                               "
              >
                {item?.product?.name}
              </td>

              <td
                className="
                               text-center text-dark
                               font-medium
                               text-secondary
                               py-5
                               px-2 bg-transparent
                               border-b border-r border-gray-300
                               "
              >
                {item?.shippingInfo?.name}
              </td>
              <td
                className="
                               text-center text-dark
                               font-medium
                               text-secondary
                               py-5
                               px-2 bg-transparent
                               border-b border-r border-gray-300
                               "
              >
                {item?.productId ? item.productId : "No Code"}
              </td>
              <td
                className="
                               text-center text-dark
                               font-medium
                               text-secondary
                               py-5
                               px-2 cursor-pointer
                               bg-transparent
                               border-b border-r border-gray-300
                               "
              >
                {item?.quantity}
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default RecentOrder;
