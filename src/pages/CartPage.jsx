import React, { useState, useEffect } from "react";
import {
  getCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  checkoutCart,
} from "../api";
import "../css/CartPage.css";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate("/");

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const loadCart = async () => {
    try {
      const data = await getCart();

      const items = data?.cart?.items || data?.items || [];

      if (Array.isArray(items)) {
        setCart(items);
      } else {
        setCart([]);
      }
    } catch (err) {
      console.log(err);
      console.log("failed to load Cart");
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleIncrease = async (productId) => {
    await increaseQuantity(productId);
    loadCart();
  };

  const handleDecrease = async (productId) => {
    await decreaseQuantity(productId);
    loadCart();
  };

  const handleRemove = async (productId) => {
    await removeFromCart(productId);
    loadCart();
  };

  const handleCheckout = async () => {
    const res = await checkoutCart();
    if (res?.msg.includes("successful")) {
      navigate("/orders");
    } else {
      console.log(res);
      console.log("checkout failed");
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart ({cart.length})</h2>
      {loading ? (
        <p>Loading...</p>
      ) : cart.length === 0 ? (
        <p>Your Cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item.product._id} className="cart-item">
            <h4>{item.product.name}</h4>
            <h4>₦{numberWithCommas(item.product.price)}</h4>
            <p>Quantity: {item.quantity}</p>
            <div className="btn-group">
              <button onClick={() => handleDecrease(item.product._id)}>
                -
              </button>
              <button onClick={() => handleIncrease(item.product._id)}>
                +
              </button>
              <button onClick={() => handleRemove(item.product._id)}>
                REMOVE
              </button>
            </div>
          </div>
        ))
      )}

      {cart.length > 0 && (
        <button
          onClick={handleCheckout}
          style={{ width: "100%", padding: "12px" }}
        >
          CHECKOUT
        </button>
      )}
    </div>
  );
};

export default CartPage;
