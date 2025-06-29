import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <h1>Ecomm</h1>
      <ul>
        <Link>Home</Link>
        <Link>Carts</Link>
        <Link>Orders</Link>
      </ul>
    </nav>
  );
};

export default Navbar;
