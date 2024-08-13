import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShowMore from "./ShowMore";
import axios from "axios";

function Images({ place, showAllPhotos, setAllPhotos }) {
  return (
    <div>
      <div className="hamrebodysepranre relative body overflow-hidden">
        <div className="Container">
          {place.photos.map((image, index) => {
            let className = "";
            switch (index) {
              case 0:
                className = "house aspect-square object-cover";
                break;
              case 1:
                className = "interior aspect-square object-cover";
                break;
              case 2:
                className = "living-room aspect-square object-cover";
                break;
              case 3:
                className = "kitchen aspect-square object-cover";
                break;
              case 4:
                className = "bathroom aspect-square object-cover";
                break;
              default:
                className = "hidden aspect-square object-cover";
            }
            return (
              <img
                key={index}
                src={`http://localhost:4000/upload/${image}`}
                alt={className}
                className={className}
              />
            );
          })}
        </div>

        <button
          onClick={() => {
            console.log("Show more clicked");
            setAllPhotos(true);
          }}
          className="flex absolute bottom-4 right-48 bg-white px-3 py-2 rounded-2xl shadow shadow-md shadow-gray-500  hidden md:block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <Link to="showmore">
            <div className="relative"> Show more</div>
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Images;
