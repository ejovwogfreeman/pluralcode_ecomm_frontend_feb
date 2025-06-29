import React, { useState, useEffect } from "react";
import { getAllProducts, getSingleProductImage } from "../api";
import "../css/ProductPage.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    const getProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    getProducts();
  });

  console.log(products);

  if (!products || products.length === 0)
    return <div>No products to display</div>;

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
            <button>VIEW PRODUCT</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductPage;
