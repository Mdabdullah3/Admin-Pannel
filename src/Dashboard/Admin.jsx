import React, { useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import PieChart from "../components/charts/PieChart";
import BarChart from "../components/charts/BarChart";
import AreaLineChart from "../components/charts/AreaLineChart";
import PrimaryButton from "../components/common/PrimaryButton";
import RecentOrder from "../components/Dashboard/RecentOrder";
import useUserStore from "../store/AuthStore";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL, SERVER } from "../config";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
const Admin = () => {
  const [loading, setLoading] = useState(true);
  const { user, fetchUser } = useUserStore();
  const [totalEarning, setTotalEarning] = useState(0);
  const [todaySale, setTodaySale] = useState(0);
  const [monthlySale, setMonthlySale] = useState(0);
  const [newCustomer, setNewCustomer] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const loadUser = async () => {
      await fetchUser();
      setLoading(false);
    };
    loadUser();
  }, [fetchUser]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/orders?_limit=100000&_fields=createdAt,price,quantity`
        );
        calculateSales(response.data.data);
      } catch (error) {}
    };
    fetchOrders();
  }, []);
  useEffect(() => {
    const fetchNewUsers = async () => {
      try {
        // Get today's date and subtract 30 days
        const today = new Date();
        const last30Days = new Date(
          today.setDate(today.getDate() - 30)
        ).toISOString();

        // Fetch users created in the last 30 days
        const response = await axios.get(
          `${API_URL}/users?_filter[role]=user&_filter[createdAt][$gte]=${last30Days}&_sort=-createdAt&_fields=createdAt,role,avatar`
        );
        setNewCustomer(response.data);
        setLoading(false); // Stop loading
      } catch (error) {
        setLoading(false);
      }
    };
    fetchNewUsers();
  }, []);

  // Function to calculate total, monthly, and daily sales
  const calculateSales = (orders) => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date
    const currentMonth = new Date().getMonth();

    let total = 0;
    let todayTotal = 0;
    let monthlyTotal = 0;

    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt);
      const orderTotal = order.price * order.quantity;

      // Calculate total sales
      total += orderTotal;

      // Calculate today's sales
      if (orderDate.toISOString().split("T")[0] === today) {
        todayTotal += orderTotal;
      }

      // Calculate monthly sales
      if (orderDate.getMonth() === currentMonth) {
        monthlyTotal += orderTotal;
      }
    });

    setTotalEarning(total);
    setTodaySale(todayTotal);
    setMonthlySale(monthlyTotal);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const handleClick = () => {
    navigate("/admin/order-review");
  };
  return (
    <section>
      <div className="lg:grid grid-cols-4 gap-5 rounded-xl items-center">
        <div>
          <div className="mt-4 shadow-lg pl-2 h-64">
            <h1 className="text-gray-500 text-lg flex items-center font-bold pt-3">
              <FaBangladeshiTakaSign />{" "}
              <span className="text-3xl text-black mr-2">{totalEarning}</span>
              {/* <span className="flex items-center bg-green-200 text-sm rounded-lg px-2 py-1 text-green-600">
                <AiOutlineArrowUp /> <span>+20%</span>
              </span> */}
            </h1>
            <h2 className="text-md text-gray-500">Total Earning</h2>
            <div className="-mt-10 w-80 lg:w-auto">{/* <PieChart /> */}</div>
          </div>
          <div>
            <div className="mt-4 shadow-lg pl-2 h-64">
              <h1 className="text-gray-500 text-lg flex items-center font-bold pt-3">
                <FaBangladeshiTakaSign />{" "}
                <span className="text-3xl text-black mr-2">{monthlySale}</span>
                <span className="flex items-center bg-green-200 text-sm rounded-lg px-2 py-1 text-green-600">
                  <AiOutlineArrowUp />
                </span>
              </h1>
              <h2 className="text-md text-gray-500">Order This Month</h2>
              <div className="mt-24">
                <progress
                  className="progress progress-green-500 w-56"
                  value="70"
                  max="100"
                ></progress>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-4 shadow-lg pl-2 h-64 rounded-xl">
            <h1 className="text-gray-500 text-lg flex items-center font-bold pt-3">
              <FaBangladeshiTakaSign />{" "}
              <span className="text-3xl text-black mr-2">
                {todaySale.toFixed(2)}
              </span>
              {/* <span className="flex items-center bg-green-200 text-sm rounded-lg px-2 py-1 text-green-600">
                <AiOutlineArrowUp /> <span>+20%</span>
              </span> */}
            </h1>
            <h2 className="text-md text-gray-500">Average Daily Sale</h2>
            <div className="mt-6 w-72 lg:w-auto">{/* <BarChart /> */}</div>
          </div>
          <div className="mt-4 shadow-lg pl-2 h-64 rounded-xl">
            <h1 className="font-bold pt-3">
              <span className="text-3xl text-black mr-2">
                {newCustomer?.count}
              </span>
            </h1>
            <h2 className="text-md text-gray-500">New Customer This Month</h2>
            <div className="pt-14">
              <h1>Todays Hero</h1>
              <div>
                <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                  {newCustomer?.data?.slice(0, 5)?.map((customer) => (
                    <div key={customer._id} className="avatar">
                      <div className="w-10 rounded-full">
                        <img
                          src={
                            customer?.avatar?.public_id &&
                            customer?.avatar?.secure_url.startsWith("/")
                              ? `${SERVER}${customer?.avatar?.secure_url}`
                              : customer?.avatar?.secure_url
                          }
                          className="w-full"
                          alt=""
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 shadow-lg rounded-xl p-4">
          <h1 className="text-lg font-bold">Sale This Month</h1>
          <p>User of all chanel</p>
          <div className="mt-16">
            <h1 className="text-gray-500 text-lg flex items-center font-bold pt-3">
              <FaBangladeshiTakaSign />{" "}
              <span className="text-3xl text-black mr-2">
                {monthlySale.toFixed(2)}
              </span>
              {/* <span className="flex items-center bg-green-200 text-sm rounded-lg px-2 py-1 text-green-600">
                <AiOutlineArrowUp /> <span>+20%</span>
              </span> */}
            </h1>
            <h1>Another $4232,992 to Goal</h1>
          </div>
          <div className="">{/* <AreaLineChart /> */}</div>
        </div>
      </div>
      <section className="my-10">
        <div className="my-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Recent Order</h1>
          <PrimaryButton value="See all" onClick={handleClick} />
        </div>
        <RecentOrder />
      </section>
    </section>
  );
};

export default Admin;
