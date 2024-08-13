import React from "react";
import "./Reviews.css";

// import { useGlobal } from '../Provider';

export default function Reviews({ place }) {
  // const {rate , review} = useGlobal();
  return (
    <div className="last">
      <hr />
      <div className="first-line">
        <p>
          <i className="bi bi-star-fill end"></i>
          {place.rate} · {place.reviews} reviews
        </p>
      </div>
      <div className="row">
        <div className="row7">
          <div id="pl1">
            <p>
              Cleanliness <br />
              4.8
            </p>
            <img id="icon1" src="/villa_images/icons/spray.png" alt="spray" />
          </div>
          <div className="vline"></div>
        </div>

        <div className="row8">
          <div id="pl1">
            <p>
              Accuracy <br />
              4.8
            </p>
            <img
              id="icon2"
              src="/villa_images/icons/tick.png"
              alt="right-tick"
            />
          </div>
          <div className="vline"></div>
        </div>

        <div className="row9">
          <div id="pl1">
            <p>
              Check-in <br />
              4.9
            </p>
            <img id="icon3" src="/villa_images/icons/key.png" alt="key" />
          </div>
          <div className="vline"></div>
        </div>

        <div className="row4">
          <div id="pl1">
            <p>
              Communication <br />
              5.0
            </p>
            <img
              id="icon4"
              src="/villa_images/icons/message.png"
              alt="message"
            />
          </div>
          <div className="vline"></div>
        </div>

        <div className="row5">
          <div id="pl1">
            <p>
              Location <br />
              4.8
            </p>
            <img
              id="icon5"
              src="/villa_images/icons/location.png"
              alt="location"
            />
          </div>
          <div className="vline"></div>
        </div>

        <div className="row6">
          <div id="pl1">
            <p>
              Value <br />
              4.8
            </p>
            <img id="icon6" src="/villa_images/icons/tag.png" alt="tag" />
          </div>
          <div className="vline"></div>
        </div>
      </div>
    </div>
  );
}

