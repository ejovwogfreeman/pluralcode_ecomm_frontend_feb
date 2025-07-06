import React, { useState, useEffect } from "react";
import { getSingleOrder } from "../api";
import { useParams } from "react-router-dom";
import "../css/OrderDetails.css";

const OrderDetails = () => {
  const [order, setOrder] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const params = useParams();
  const orderId = params.id;

  const loadOrder = async () => {
    try {
      const data = await getSingleOrder(orderId);

      const items = data?.items || [];

      setOrderData(data);

      if (Array.isArray(items)) {
        setOrder(items);
      } else {
        setOrder([]);
      }
    } catch (err) {
      console.log(err);
      setOrder([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrder();
  }, []);

  return (
    <div className="order-container">
      <h2>Order Details</h2>

      {loading ? (
        <p>Loading...</p>
      ) : order.length === 0 ? (
        <p>Order is empty</p>
      ) : (
        order.map((item) => (
          <div className="order-item">
            <h4>{item.product.name}</h4>
            <h4>₦{numberWithCommas(item.product.price)}</h4>
            <p style={{ margin: "0px" }}>Quantity: {item.quantity}</p>
          </div>
        ))
      )}
      <div style={{ marginTop: "30px" }}>
        Total: {orderData.total} - {orderData.status}
      </div>
    </div>
  );
};

export default OrderDetails;
