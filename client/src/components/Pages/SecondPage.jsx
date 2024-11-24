import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./SecondPage.css";
import Title from "./PlacePage Components/Title.jsx";
import Images from "./PlacePage Components/images.jsx";
import Information from "./PlacePage Components/Information.jsx";
import Reviews from "./PlacePage Components/Reviews.jsx";
import Mapp from "./PlacePage Components/Mapp.jsx";
import Header2 from "../Header/Header2.jsx";
import MainPageFooter from "../Footer/MainPageFooter.jsx";
import Imagesmore from "./PlacePage Components/Imagesmore.jsx";
import Header4 from "../Header/Header4.jsx";
import LeftSide from "../Booking/LeftSide.jsx";
import Chart from "./PlacePage Components/Chart.jsx";


export default function SecondPage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setAllPhotos] = useState(false);
  const [transfer, setTransfer] = useState(false);
  const [display, setDisplay] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSmallScreen, setIsSmallScreen] = useState(windowWidth.current <= 768);
  const [bookingDetails, setBookingDetails] = useState({
    price: 0,
    startDate: null,
    endDate: null,
  });
  const [always, setAlways] = useState(false);

  

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:4000/places/${id}`).then((response) => {
        setPlace(response.data);
      });
    }
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!place) return "";
  return (
    <>
    <div className="secondpage-main">
    {/* <Header3 /> */}
      <div className="mt-5">
        <div className="parent-container">
          <Title place={place} />
          <Images
            place={place}
            showAllPhotos={showAllPhotos}
            setAllPhotos={setAllPhotos}
          />
          <Information place={place}/>
          {!isSmallScreen && <>
          <Mapp place={place} />
          <Reviews place={place} />
          </>}
          
        </div>
      </div>
      {display && (
        <Imagesmore
          place={place}
          showAllPhotos={showAllPhotos}
          setAllPhotos={setAllPhotos}
        />
      )}
      {windowWidth >=1090? <MainPageFooter/> :<Chart price={bookingDetails.price} date={bookingDetails.startDate} />  }
      {always && <LeftSide place={place} />}
    </div>
      
    </>
  );
}
