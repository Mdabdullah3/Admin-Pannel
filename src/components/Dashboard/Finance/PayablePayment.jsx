import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useOrderStore from "../../../store/OrderStore";
import Loading from "../../common/Loading";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

// Styles for modern PDF design
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 12,
    color: "#333",
  },
  header: {
    fontSize: 24,
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    color: "#1E3A8A",
  },
  table: {
    display: "table",
    width: "auto",
    marginVertical: 20,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#E5E7EB",
    borderBottomWidth: 1,
  },
  tableHeader: {
    backgroundColor: "#1E3A8A",
    color: "#FFF",
    fontSize: 10,
    fontWeight: "bold",
    padding: 8,
    textAlign: "center",
    width: "14.3%",
  },
  tableCol: {
    fontSize: 10,
    padding: 8,
    textAlign: "center",
    width: "14.3%",
  },
  totalSection: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
    color: "#1E3A8A",
  },
  labelBox: {
    marginTop: 40,
    borderWidth: 1,
    borderColor: "#1E3A8A",
    padding: 20,
  },
  labelText: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#1E3A8A",
  },
});

// PDF Document Component
const MyDocument = ({ orders }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          {[
            "No",
            "Order Cost",
            "Vat",
            "Commission",
            "Transaction Fee",
            "Shipping Cost",
            "Profit",
          ].map((col, i) => (
            <Text key={i} style={styles.tableHeader}>
              {col}
            </Text>
          ))}
        </View>
        {/* Table Rows */}
        {orders?.map((order, index) => (
          <View key={order?._id} style={styles?.tableRow}>
            <Text style={styles.tableCol}>{index + 1}</Text>
            <Text style={styles.tableCol}>{order.price}</Text>
            <Text style={styles.tableCol}>{order.vat}</Text>
            <Text style={styles.tableCol}>{order.commission}</Text>
            <Text style={styles.tableCol}>{order.transactionCost}</Text>
            <Text style={styles.tableCol}>{order.shippingCharge}</Text>
            <Text style={styles.tableCol}>
              {order?.profit ? Number(order.profit).toFixed(2) : "0.00"}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.totalSection}>
        <Text>Total Orders: {orders.length}</Text>
      </View>
    </Page>
  </Document>
);
const PayablePayment = () => {
  const { id } = useParams();
  // const [loading, setLoading] = useState(false);
  const { userOrders, fetchAllVendorOrders, updateOrderStatus } =
    useOrderStore();

  useEffect(() => {
    fetchAllVendorOrders(id);
  }, [fetchAllVendorOrders, id, userOrders]);

  const header = [
    "No",
    "Order Cost",
    // "Name",
    // "Phone",
    "Vat",
    "Commission",
    "Transaction Fee",
    "Shipping Cost",
    "Profit",
    "Status",
    "Action",
  ];
  const activeOrders = userOrders?.filter(
    (order) => order?.status !== "cancelled"
  );
  const handlePay = async (orderId) => {
    // Update order status to paid
    await updateOrderStatus(orderId, { vendorPaid: "paid" });
  };
  // if (loading) {
  //   return <Loading />;
  // }
  return (
    <div>
      <div className="flex justify-end mt-10">
        <PDFDownloadLink
          document={<MyDocument orders={activeOrders} />}
          fileName="payable_payment_report.pdf"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          {({ loading }) => (loading ? "Loading document..." : "Download PDF")}
        </PDFDownloadLink>
      </div>
      <table className="min-w-full bg-white border border-gray-200 mt-5">
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
          {userOrders?.length > 0 ? (
            activeOrders?.map((finance, index) => (
              <tr
                key={finance?._id}
                className="border-b border-gray-200 capitalize"
              >
                <td className="py-4 px-6">{index}</td>
                <td className="py-4 px-6">৳{finance?.price}</td>
                {/* <td className="py-4 px-6">{finance?.shippingInfo?.name}</td>
                <td className="py-4 px-6">{finance?.shippingInfo?.phone}</td> */}
                <td className="py-4 px-6">৳{finance?.vat}</td>
                <td className="py-4 px-6">৳{finance?.commission}</td>
                <td className="py-4 px-6">৳{finance?.transactionCost}</td>
                <td className="py-4 px-6">৳{finance?.shippingCharge}</td>
                <td className="py-4 px-6">
                  ৳
                  {finance?.profit
                    ? Number(finance?.profit).toFixed(2)
                    : "0.00"}
                </td>
                <td className="py-4 px-6">{finance?.status}</td>
                {finance?.vendorPaid === "unpaid" ? (
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handlePay(finance?._id)}
                      className="btn bg-green-500 hover:bg-green-600 text-white"
                    >
                      Pay
                    </button>
                  </td>
                ) : (
                  <td className="py-4 px-6">
                    <button className="btn bg-primary text-white ">Paid</button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center text-xl py-6 text-primary">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PayablePayment;
