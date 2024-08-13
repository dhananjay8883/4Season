import React, { useContext, useState } from "react";
import "./WishlistHeader.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import PopupContent from "./PopupContent";

function WishlistHeader() {
  const { user } = useContext(UserContext);
  let firstLetter = "";
  if (user && user.name) {
    firstLetter = user.name.charAt(0).toUpperCase();
  }

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="top-header">
      <div>
        <Link to={"/"} href="" className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-8 w-8 hidden md:block cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
            />
          </svg>
          <span className="font-bold text-xl text-purple-500 mt-2">
            Four Seasons
          </span>
        </Link>
      </div>

      <div className="go-home">
        <Link to="/">
          <div className="Home">
            <button>Airbnb your home</button>
          </div>
        </Link>

        <div className="profile-container relative">
          <div
            onClick={togglePopup}
            className="profile1 flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>

            {user && (
              <div className="circle-icon">
                <p className="first-latter">{firstLetter}</p>
              </div>
            )}
          </div>
          {isPopupOpen && <PopupContent close={closePopup} />}
        </div>
      </div>
    </div>
  );
}

export default WishlistHeader;
