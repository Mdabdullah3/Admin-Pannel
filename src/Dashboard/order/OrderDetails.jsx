import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useOrderStore from "../../store/OrderStore";
import { SERVER } from "../../config";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFDownloadLink,
} from "@react-pdf/renderer";

const modernStyles = StyleSheet.create({
  page: {
    padding: 25,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#4A4A4A",
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  section: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#2c3e50",
    borderBottom: 1,
    paddingBottom: 3,
    borderBottomColor: "#ddd",
  },
  label: {
    fontSize: 11,
    color: "#555",
    fontWeight: "bold",
    marginBottom: 4,
  },
  value: {
    fontSize: 11,
    color: "#333",
    marginBottom: 5,
    marginTop: 2,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  divider: {
    marginVertical: 8,
    borderBottom: 1,
    borderBottomColor: "#ddd",
  },
  coloumStyle: {
    display: "flex",
    flexDirection: "row",
    gap: "5px",
  },
});

// PDF Document component
const ModernOrderPDF = ({ order }) => {
  const {
    shippingInfo,
    product,
    variantId,
    // status,
    price,
    currency,
    quantity,
    paymentType,
  } = order;

  const orderedVariant = product?.productVariants?.find(
    (variant) => variant._id === variantId
  );

  return (
    <Document>
      <Page style={modernStyles.page}>
        <Text style={modernStyles.header}>Order Receipt</Text>

        {/* Order Information */}
        <View style={modernStyles.section}>
          <Text style={modernStyles.sectionTitle}>Order Information</Text>
          <View style={modernStyles.coloumStyle}>
            <Text style={modernStyles.label}>Order ID:</Text>
            <Text style={modernStyles.value}>{order._id}</Text>
          </View>
        </View>

        {/* Shipping Information */}
        <View style={modernStyles.section}>
          <Text style={modernStyles.sectionTitle}>Shipping Information</Text>
          <View style={modernStyles.coloumStyle}>
            <Text style={modernStyles.label}>Name:</Text>
            <Text style={modernStyles.value}>{shippingInfo.name}</Text>
          </View>
          <View style={modernStyles.coloumStyle}>
            <Text style={modernStyles.label}>Phone:</Text>
            <Text style={modernStyles.value}>{shippingInfo.phone}</Text>
          </View>
          <View style={modernStyles.coloumStyle}>
            <Text style={modernStyles.label}>Address:</Text>
            <Text style={modernStyles.value}>
              {`${shippingInfo.address1}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.postcode}, ${shippingInfo.country}`}
            </Text>
          </View>
        </View>

        {/* Product Information */}
        <View style={modernStyles.section}>
          <Text style={modernStyles.sectionTitle}>Product Information</Text>
          <View>
            <Image
              style={modernStyles.image}
              src={`${SERVER}${product?.coverPhoto?.secure_url}`}
            />
            <View>
              <View style={modernStyles.coloumStyle}>
                <Text style={modernStyles.label}>Product:</Text>
                <Text style={modernStyles.value}>{product?.name}</Text>
              </View>
              {orderedVariant && (
                <>
                  <Text style={modernStyles.value}>
                    Color: {orderedVariant.color}
                  </Text>
                  <Text style={modernStyles.value}>
                    Size: {orderedVariant.size}
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>

        {/* Payment and Quantity */}
        <View style={modernStyles.section}>
          <Text style={modernStyles.sectionTitle}>Order Summary</Text>
          <View>
            <View style={modernStyles.coloumStyle}>
              <Text style={modernStyles.label}>Quantity:</Text>
              <Text style={modernStyles.value}>{quantity}</Text>
            </View>
            <View style={modernStyles.coloumStyle}>
              <Text style={modernStyles.label}>Price:</Text>
              <Text style={modernStyles.value}>
                {parseFloat(price * quantity).toFixed(2)} {currency}
              </Text>
            </View>
          </View>
          <View style={modernStyles.coloumStyle}>
            <Text style={modernStyles.label}>Payment Type:</Text>
            <Text style={modernStyles.value}>{paymentType}</Text>
          </View>
        </View>

        {/* Status */}
        {/* <View style={modernStyles.section}>
          <Text style={modernStyles.sectionTitle}>Status</Text>
          <Text style={modernStyles.label}>Order Status:</Text>
          <Text style={modernStyles.value}>{status}</Text>
        </View> */}
      </Page>
    </Document>
  );
};

const OrderDetails = () => {
  const { id } = useParams();
  const { fetchOrderById, singleOrder } = useOrderStore();

  useEffect(() => {
    fetchOrderById(id);
  }, [id, fetchOrderById]);

  if (!singleOrder) {
    return <div>Loading...</div>;
  }

  const {
    shippingInfo,
    product,
    variantId,
    status,
    price,
    currency,
    paymentType,
    quantity,
    // transactionId,
  } = singleOrder;

  const orderedVariant = product?.productVariants.find(
    (variant) => variant._id === variantId
  );

  return (
    <div className="container mx-auto p-6 capitalize">
      {/* Order Details Header */}
      <div>
        <h1 className="text-3xl font-bold mb-4 text-center">Order Details</h1>
        <div>
          <PDFDownloadLink
            document={<ModernOrderPDF order={singleOrder} />}
            fileName="order_details.pdf"
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            {({ loading }) => (loading ? "Preparing PDF..." : "Download PDF")}
          </PDFDownloadLink>
        </div>
      </div>
      <div className="text-center mb-6">
        <span
          className={`status-badge ${
            status === "cancelled" ? "bg-red-500" : "bg-green-500"
          } text-white py-1 px-3 rounded`}
        >
          {status.toUpperCase()}
        </span>
        <p className="mt-2 text-sm text-gray-600">Order ID: {id}</p>
      </div>

      {/* Shipping Information */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
        <p>
          <strong>Name:</strong> {shippingInfo.name}
        </p>
        <p>
          <strong>Email:</strong> {shippingInfo.email}
        </p>
        <p>
          <strong>Phone:</strong> {shippingInfo.phone}
        </p>
        <p>
          <strong>Address:</strong>{" "}
          {`${shippingInfo.address1}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.postcode}, ${shippingInfo.country}`}
        </p>
        <p>
          <strong>Delivery Method:</strong> {shippingInfo.method}
        </p>
        <p>
          <strong>Delivery Fee:</strong> {shippingInfo.deliveryFee} {currency}
        </p>
      </div>

      {/* Product Information */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Product Information</h2>
        <div className="flex items-center">
          <img
            src={`${SERVER}${product?.coverPhoto?.secure_url}`}
            alt={product?.name}
            className="w-32 h-32 object-cover mr-4 rounded"
          />
          <div>
            <p className="font-bold text-lg ">{product?.name}</p>
            <p className="text-gray-600 mt-2">{product?.summary}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Ordered Variant</h2>
        {orderedVariant ? (
          <div className="flex items-center">
            <img
              src={`${SERVER}${orderedVariant?.image?.secure_url}`}
              alt={`${product?.name} - ${orderedVariant?.color}`}
              className="w-32 h-32 object-cover mr-4 rounded"
            />
            <div>
              <p>
                <strong>Color:</strong> {orderedVariant?.color}
              </p>
              <p>
                <strong>Size:</strong> {orderedVariant?.size}
              </p>
              <p>
                <strong>Quantity:</strong> {quantity}
              </p>
              <p>
                <strong>Price:</strong> {parseFloat(price * quantity)}{" "}
                {currency}
              </p>
            </div>
          </div>
        ) : (
          <p>No variant data available.</p>
        )}
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
        <p>
          <strong>Payment Type:</strong> {paymentType}
        </p>
        <p>
          <strong>Total Price:</strong> {price} {currency}
        </p>
      </div>
    </div>
  );
};

export default OrderDetails;
