import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <Link to="/" style={{ margin: "0px", color: "black" }}>
        <h1>Ecomm</h1>
      </Link>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>
      </ul>
    </nav>
  );
};

export default Navbar;
