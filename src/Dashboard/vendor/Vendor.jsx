import React, { useEffect, useState } from "react";
import InputSearch from "../../components/common/InputSearch";
import PrimaryButton from "../../components/common/PrimaryButton";
import useUserStore from "../../store/AuthStore";
import useProductStore from "../../store/ProductStore";
import { Link } from "react-router-dom";
import { SERVER } from "../../config";

const Vendor = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const { fetchAllUser, users } = useUserStore();
  const { fetchAllProducts, products } = useProductStore();

  useEffect(() => {
    fetchAllUser();
    fetchAllProducts();
  }, [fetchAllUser, fetchAllProducts]);

  // Get product count and review count for each vendor
  const getProductData = (userId) => {
    const userProducts = products?.filter(
      (product) => product?.user?._id === userId
    );
    const productCount = userProducts?.length || 0;
    const reviewCount = userProducts?.reduce((totalReviews, product) => {
      return totalReviews + (product?.reviews?.length || 0); 
    }, 0);

    return { productCount, reviewCount };
  };

  return (
    <div>
      <div className="lg:w-10/12 w-full mx-auto py-6 flex items-center justify-between gap-6">
        <div className="flex-1">
          <InputSearch
            placeholder="Search For Vendor.."
            value={searchTerm}
            onChange={(value) => setSearchTerm(value)}
            onSearch={handleSearch}
          />
        </div>
        <div>
          <Link to="/admin/vendor-pending">
            <PrimaryButton value="Pending Request" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:w-11/12 mx-auto w-full mt-3 md:mt-10">
        {users?.map((item) => {
          const { productCount, reviewCount } = getProductData(item?._id);

          return (
            <div
              className="flex shadow-xl p-4 justify-between rounded-xl items-center"
              key={item?._id}
            >
              <div>
                <h1 className="font-semibold capitalize">{item?.name}</h1>
                <div className="font-normal text-gray-700">
                  <h2>Products: {productCount}</h2>
                  <h6 className="text-black font-normal text-md">
                    Reviews: {reviewCount}
                  </h6>
                </div>
              </div>
              <div>
                <img
                  src={`${SERVER}${item?.avatar?.secure_url}`}
                  alt=""
                  className="w-32 h-32 rounded-lg"
                />
                <div className="ml-10 mt-2">
                  <Link to={`/admin/vendor/${item._id}`}>
                    <button className="bg-primary px-3 py-1.5 rounded-lg text-sm text-white">
                      View More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Vendor;
