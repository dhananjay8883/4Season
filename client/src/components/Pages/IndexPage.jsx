import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { CartProvider } from "react-use-cart";
import Button from "../Button.jsx";
import Header1 from "../Header/Header1.jsx";
import Header4 from "../Header/Header4.jsx";
import MainPageFooter from "../Footer/MainPageFooter.jsx";
import MobileFooter from "../Footer/MobileFooter.jsx";
import "../../App.css";
import "./IndexPage.css";
import ShowMore from "./PlacePage Components/ShowMore.jsx";

function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { category } = useParams();
  const [moveback, setMoveBack] = useState(false);

  useEffect(() => {
    if (category) {
      axios.get("http://localhost:4000/places").then((response) => {
        const refined = response.data.filter((item) =>
          item.perks.includes(category)
        );
        setPlaces(refined);
      });
    } else {
      axios.get("http://localhost:4000/places").then((response) => {
        setPlaces([...response.data]);
      });
    }
  }, [category]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="m-0 p-0">
      {windowWidth >= 1090 ? <Header1 /> : <Header4 />}
      <div className="app-container">
        <CartProvider>
          <div className="each-card">
            {places.length > 0 &&
              places.map((place, index) => (
                <div className="container" key={place._id}>
                  <div className="heart">
                    <Button
                      place={place}
                      photos={
                        "http://localhost:4000/upload/" + place.photos?.[index]
                      }
                    />
                  </div>
                  <Link to={"/place/" + place._id} key={place._id}>
                    {place.photos?.[0] && (
                      <div className="mb-2">
                        <img
                          className="box-img"
                          src={
                            "http://localhost:4000/upload/" + place.photos?.[0]
                          }
                          alt=""
                        />
                      </div>
                    )}
                  </Link>
                  <div className="varad">
                    <h2 className="font-bold leading-5">{place.address}</h2>
                  </div>
                  <p className="side">{}</p>
                  <p className="price mt-1">
                    <span className="font-bold">${place.price}</span>
                    <span id="period">night</span>
                  </p>

                  {moveback && <ShowMore place1={place} />}
                </div>
              ))}
          </div>
        </CartProvider>
      </div>
      {windowWidth > 800 ? <MainPageFooter /> : <MobileFooter />}
    </div>
  );
}

export default IndexPage;
