import React, { useContext } from "react";
import { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import AnyTime from "../anytime/AnyTime21";
import Add_guest from "../Add_guest.css/Add_guest";
import Any_where from "../Anywhere/Any_where";
import PopupContent from "./PopupContent";

function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const { user } = useContext(UserContext);
  let firstLetter = "";
  if (user && user.name) {
    firstLetter = user.name.charAt(0);
  }

  const [boldElement, setBoldElement] = useState("stays");

  function handleClick(element) {
    setBoldElement(element);
  }

  return (
    <header>
      <div className="header flex justify-between mb-5">
        <Link to={"/"} href="" className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
            className="h-8 w-8 hidden md:block cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
            />
          </svg>
          <span className="font-bold text-xl text-purple-500">
            Four Seasons
          </span>
        </Link>

        <div className="flex gap-10 text-base mt-2 font-semibold">
          <div
            onClick={() => handleClick("stays")}
            className="individual-div cursor-pointer"
          >
            <p
              className={
                boldElement === "stays" ? "text-black" : "text-gray-400"
              }
            >
              Stays
            </p>
          </div>
          <div
            onClick={() => handleClick("experiences")}
            className="individual-div cursor-pointer"
          >
            <p
              className={
                boldElement === "experiences" ? "text-black" : "text-gray-400"
              }
            >
              Experiences
            </p>
          </div>
        </div>

        {/* <Link to={user?"/account":"/login"} className='flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 cursor-pointer'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
{user && (
  <div>
    {user.name}
  </div>
)}
        </Link> */}

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

      <div className="parent-container1 mb-7">
        <div className="wow">
          <div className="now flex gap-2 border border-gray-300 rounded-full shadow-md shadow-gray-250">
            <div className="any1">
              <Popup
                trigger={<button className="mt-2 ml-16">Anywhere</button>}
                position="bottom center"
                className="custom-popup"
                contentStyle={{
                  width: "223px", // Set the width of the popup
                  height: "94px", // Set the height of the popup
                  padding: "20px",
                  border: "1px solid #ddd",
                  position: "absolute",
                  zIndex: "999",
                  pointerEvents: "auto",
                  top: "140.41 px",
                  left: "40.98px",
                }}
              >
                <div>
                  <Any_where />
                </div>
              </Popup>
            </div>
            <div className="border-l border-gray-300"></div>
            <div className="any2">
              <Popup
                trigger={<button className="mt-2">Anytime</button>}
                position="bottom center"
                contentStyle={{
                  width: "205px", // Set the width of the popup
                  height: "94px", // Set the height of the popup
                  padding: "20px",
                  border: "1px solid #ddd",
                  position: "absolute",
                  zIndex: "999",
                  pointerEvents: "auto",
                  top: "140.41 px",
                  left: "40.98px",
                }}
              >
                <div>
                  <AnyTime />
                </div>
              </Popup>
            </div>
            <div className="border-l border-gray-300"></div>
            <div className="any3">
              <Popup
                trigger={<button className="mt-2">Addguest</button>}
                position="bottom center"
                className="custom-popup"
                contentStyle={{
                  padding: "20px",
                  border: "1px solid #add",
                  position: "absolute",
                  zIndex: "999",
                  pointerEvents: "auto",
                  top: "-975px",
                  left: "410.594px",
                }}
              >
                <div>
                  <Add_guest />
                </div>
              </Popup>
            </div>
            <button className="bg-purple-500 text-white w-12 h-12 flex items-center justify-center rounded-full mt-0.3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197M15.803 15.803A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <hr />
    </header>
  );
}

export default Header;
