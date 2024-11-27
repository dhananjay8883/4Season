import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header1 from "../Header/Header1.jsx";
import Header4 from "../Header/Header4.jsx";
import MainPageFooter from "../Footer/MainPageFooter.jsx";
import MobileFooter from "../Footer/MobileFooter.jsx";
import "../../App.css";
import "./SearchResult.css";

function SearchResult() {
  const [places, setPlaces] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("query")?.toLowerCase() || "";

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get("http://localhost:4000/places");
        setPlaces(response.data);
      } catch (err) {
        setError("Failed to fetch places");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const filteredPlaces = places.filter((place) =>
    place.address.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="m-0 p-0">
      {windowWidth >= 1090 ? <Header1 /> : <Header4 />}
      <div className="app-container">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <div className="each-card">
            {filteredPlaces.length > 0 ? (
              filteredPlaces.map((place) => (
                <div className="container" key={place._id}>
                  <div className="heart"></div>
                  <div className="mb-2">
                    {place.photos?.[0] && (
                      <img
                        className="box-img"
                        src={
                          "http://localhost:4000/upload/" + place.photos?.[0]
                        }
                        alt={place.title}
                      />
                    )}
                  </div>
                  <div className="varad">
                    <h2 className="font-bold leading-5">{place.title}</h2>
                  </div>
                  <p className="price mt-1">
                    <span className="font-bold">${place.price}</span>
                    <span id="period"> / night</span>
                  </p>
                </div>
              ))
            ) : (
              <p className="no-results">No places found</p>
            )}
          </div>
        )}
      </div>
      {windowWidth > 800 ? <MainPageFooter /> : <MobileFooter />}
    </div>
  );
}

export default SearchResult;
