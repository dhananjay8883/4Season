import { Outlet } from "react-router-dom";
import MainPageFooter from "./Footer/MainPageFooter";
import "../index.css";
import MobileFooter from "./Footer/MobileFooter";
export default function Layout() {
  return (
    <>
      {/* <div className="relative p-2.5 sm:p-2 min-h-screen "> */}
      <Outlet />
      {/* <MainPageFooter /> */}
      {/* <MobileFooter /> */}
      {/* </div> */}
    </>
  );
}
