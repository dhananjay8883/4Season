import React from "react";
import "./Header4.css";
import Nav2 from "../Nav2";
import header3searchicon from "./search-4-svgrepo-com.svg"

function Header4() {
    return (
        <div className="head2cont">
            <div className="patta1"></div>
            <div className="header3search">
                <img className="header3icon" src={header3searchicon} alt="Search Icon" />
                <input className="inputholder2" type="text" placeholder="Where to?" />
            </div>
            <div className="patta"></div>
            <div>
                <Nav2 />
            </div>
        </div>
    );
}
export default Header4;
