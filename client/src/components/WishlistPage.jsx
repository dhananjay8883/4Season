import { useEffect, useState } from "react";
import { useWishlist } from "../WishlistContext";
import axios from "axios";
import "./Wishlist.css";
import { Link } from "react-router-dom";
import MainPageFooter from "./Footer/MainPageFooter.jsx";
import WishlistHeader from "./Header/WishlistHeader.jsx";
import DeletePop from "./DeletePop.jsx";

function WishlistPage() {
  const { wishlistItems, setWishlistItems } = useWishlist();
  const [warning, setWarning] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  function togglePopup2(item) {
    setCurrentItem(item);
    setWarning(!warning);
  }

  function closePopup2() {
    setWarning(false);
    setCurrentItem(null);
  }

  useEffect(() => {
    axios
      .get("http://localhost:4000/wishlist")
      .then((response) => {
        setWishlistItems(response.data);
      })
      .catch((err) => {
        console.error("Error fetching wishlist:", err);
      });
  }, [setWishlistItems]);

  const handleRemoveItem = (itemId) => {
    axios
      .delete(`http://localhost:4000/wishlist/${itemId}`)
      .then(() => {
        setWishlistItems(wishlistItems.filter((item) => item._id !== itemId));
        closePopup2();
      })
      .catch((err) => {
        console.error("Error removing wishlist item(wishlistpage):", err);
      });
  };

  if (wishlistItems.length === 0)
    return (
      <div>
        <WishlistHeader />
        <h1 className="text-center">Your wishlist is empty</h1>
      </div>
    );

  return (
    <>
      <WishlistHeader />
      <div>
        <div className="mt-8 ml-28 mb-8 mr-0">
          <h1 className="text-3xl font-semibold">
            Wishlist ({wishlistItems.length})
          </h1>
        </div>

        <div className="centerit">
          <div className="container2">
            {wishlistItems.map((item) => (
              <div key={item._id}>
                <Link to={`/place/${item.place._id}`}>
                  <img
                    className="box-img2"
                    src={`http://localhost:4000/upload/${
                      item.place.photos?.[0] || ""
                    }`} // Use optional chaining
                    alt={item.place.title}
                  />
                </Link>
                <h2 className="res">{item.place.title}</h2>
                <button onClick={() => togglePopup2(item._id)} className="res">
                  Remove
                </button>
              </div>
            ))}
            {warning && (
              <DeletePop
                itemId={currentItem}
                onClose={closePopup2}
                onRemove={handleRemoveItem}
              />
            )}
          </div>
        </div>
      </div>
      <MainPageFooter />
    </>
  );
}

export default WishlistPage;
