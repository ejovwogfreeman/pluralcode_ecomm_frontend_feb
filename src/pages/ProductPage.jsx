import React, { useState, useEffect } from "react";
import {
  getAllProducts,
  getSingleProductImage,
  addToCart,
  getCart,
} from "../api";
import "../css/ProductPage.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    const getProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    getProducts();
    const getItems = async () => {
      const data = await getCart();
      setCartItems(data);
    };
    getItems();
  });

  const closeModal = () => {
    setSelectedProduct(null);
    setLoading(false);
    setMessage(null);
  };

  const handleAddToCart = async (productId) => {
    if (Array.isArray(cartItems)) {
      const alreadyInCart = cartItems.some(
        (item) => item.product?._id === productId
      );

      if (alreadyInCart) {
        setMessage("Product already added to cart");
        setLoading(false);
        return;
      }
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await addToCart(productId);

      if (res?.msg) {
        setMessage(res.msg);
        setLoading(false);
      } else {
        setMessage("Something went wrong");
        setLoading(false);
      }

      const updatedCart = await getCart();
      const items = updatedCart?.cart?.items || updatedCart?.items || [];

      setCartItems(Array.isArray(items) ? items : []);
    } catch (err) {
      setMessage("Failed to add product to cart");
    } finally {
      setLoading(false);
    }
  };

  if (!products || products.length === 0)
    return <div className="container">No products to display</div>;

  return (
    <div className="container">
      {products.map((product) => (
        <div className="product-container" key={product._id}>
          <img src={getSingleProductImage(product._id)} alt="" />
          <div className="product-content">
            <div className="name-price">
              <h4>{product.name.toUpperCase()}</h4>
              <h4>₦{numberWithCommas(product.price)}</h4>
            </div>
            <button onClick={() => setSelectedProduct(product)}>
              VIEW PRODUCT
            </button>
          </div>
        </div>
      ))}
      {/* modal */}
      {selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <img src={getSingleProductImage(selectedProduct._id)} alt="" />
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            {message &&
              (() => {
                let color = "red";
                if (message.toLowerCase().includes("success")) {
                  color = "green";
                } else {
                  color = "red";
                }

                return (
                  <div style={{ margin: "1rem 0", color: color }}>
                    {message}
                  </div>
                );
              })()}
            <button
              onClick={() => handleAddToCart(selectedProduct._id)}
              disabled={loading}
            >
              {loading ? "LOADING..." : "ADD TO CART"}
            </button>

            <button onClick={closeModal}>CLOSE</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
