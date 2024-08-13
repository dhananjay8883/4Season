import React, { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import axios from "axios";
import { useWishlist } from "../WishlistContext";
import { useNavigate, Navigate } from "react-router-dom";

function Button({ place }) {
  const [color, setColor] = useState("white");
  const { addItem, items, removeItem } = useCart();
  const { wishlistItems, setWishlistItems } = useWishlist();

  const navigate = useNavigate();


  useEffect(() => {
    const checkIfInWishlist = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/wishlist/exists",
          {
            params: { placeId: place._id },
          }
        );
        if (response.data.exists) {
          setColor("red");
        } else {
          setColor("white");
        }
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }
    };

    checkIfInWishlist();
  }, [place._id]);

  const handleClick = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/wishlist/exists",
        {
          params: { placeId: place._id },
        }
      );
      if (response.data == null) {
        alert("Please Login!");
        navigate("/login");
      }
      console.log("Button Clicked: ", response);
      const itemInWishlist = response.data.exists ? response.data.item : null;

      if (itemInWishlist) {
        // Remove from wishlist
        console.log("Remove from wishlist", itemInWishlist._id);
        await axios.delete(
          `http://localhost:4000/wishlist/${itemInWishlist._id}`
        );
        setWishlistItems((prev) =>
          prev.filter((item) => item._id !== itemInWishlist._id)
        );
        setColor("white");
      } else {
        // Add to wishlist
        console.log("Add to wishlist");
        const response = await axios.post("http://localhost:4000/wishlist", {
          placeId: place._id,
        });
        setWishlistItems((prev) => [...prev, response.data]);
        setColor("red");
      }
    } catch (err) {
      console.error("Error handling wishlist:", err);
    }
  };
  return (
    <button
      id="btnh"
      className="btn mr-3"
      style={{ color: color }}
      onClick={handleClick}
    >
      <i className={color === "white" ? "bi bi-heart" : "bi bi-heart-fill"}></i>
    </button>
  );
}

export default Button;
