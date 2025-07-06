import React, { useState, useEffect } from "react";
import { getAllOrders } from "../api";
import "../css/OrdersPage.css";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    const getOrders = async () => {
      const data = await getAllOrders();
      setOrders(data);
    };
    getOrders();
  }, []);

  console.log(orders);
  return (
    <div className="order-container">
      <h2>Your Orders ({orders.length})</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-item">
            <h4>Order Id: {order._id}</h4>
            <p>
              <strong>Total:</strong> ₦{numberWithCommas(order?.total)}
            </p>
            <Link to={`/order/${order._id}`}>VIEW ORDER DETAILS</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
