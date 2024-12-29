import React, { useEffect, useState } from "react";
import { API_URL, SERVER } from "../../../config";
import axios from "axios";

const VendorReview = ({ product }) => {
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    const fetchReviewsForProducts = async () => {
      try {
        const reviewRequests = product?.map((item) =>
          axios.get(`${API_URL}/products/${item._id}/reviews`)
        );
        const responses = await Promise.all(reviewRequests);
        const allReviews = responses.map((response) => response.data);
        setReviews(allReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (product?.length > 0) {
      fetchReviewsForProducts();
    }
  }, [product]);
  return (
    <section>
      <div className="flex mx-5 items-center justify-between mt-10">
        <h1 className="font-bold text-2xl">Review</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mt-10">
        {reviews[0]?.data?.length > 0 ? (
          reviews[0]?.data?.map((item) => (
            <div
              key={item?._id}
              className="shadow-xl px-4 py-6 rounded-xl flex justify-between items-center"
            >
              <div>
                <h1 className="text-sm text-gray-400">{item?.createdAt}</h1>
                <h1>{item?.review}</h1>
              </div>
              <div>
                <h1 className="font-bold text-sm tracking-wider py-2">
                  {item?.user?.name}
                </h1>
                <img
                  src={`${SERVER}${item?.user?.avatar?.secure_url}`}
                  alt="review img"
                  className="w-16 rounded-full"
                />
              </div>
            </div>
          ))
        ) : (
          <p>No reviews</p>
        )}
      </div>
    </section>
  );
};

export default VendorReview;
