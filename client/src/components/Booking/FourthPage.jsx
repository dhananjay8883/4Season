import React from "react";
import Heading from "./Heading";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import WishlistHeader from "../Header/WishlistHeader";
import "./TwoPage.css";
function FourthPage() {
  return (
    <div>
      <WishlistHeader />
      <hr />
      <Heading />
      <div className="Confirm_Pay">
        <RightSide />
        <LeftSide />
      </div>
    </div>
  );
}

export default FourthPage;
