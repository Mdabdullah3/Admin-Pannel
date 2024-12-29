import React, { useState } from "react";
import ReceivalePayment from "../../components/Dashboard/Finance/ReceivalePayment";

const Finance = () => {
  const menu = ["Receivale Payment",  "Request Payment"];
  const [activeMenu, setActiveMenu] = useState(menu[0]);
  const handleMenuClick = (item) => {
    setActiveMenu(item);
  };
  return (
    <section className="flex">
      <div className="flex-1">
        <div className="flex items-center justify-center mt-5">
          {menu.map((item) => (
            <>
              <button
                key={item}
                onClick={() => handleMenuClick(item)}
                className={`font-bold mx-4 ${
                  activeMenu === item
                    ? "text-primary border-b-2 border-primary"
                    : ""
                }`}
              >
                {item}
              </button>
            </>
          ))}
        </div>
        {activeMenu === "Receivale Payment" && <ReceivalePayment />}
      </div>
    </section>
  );
};

export default Finance;
