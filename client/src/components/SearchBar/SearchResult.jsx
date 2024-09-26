import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function SearchResult() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("query").toLowerCase();

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

  const filteredPlaces = places.filter((place) =>
    place.title.toLowerCase().includes(searchTerm)
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      {filteredPlaces.length > 0 ? (
        filteredPlaces.map((place) => (
          <div key={place._id} className="mb-4">
            {" "}
            <h2 className="text-xl font-bold">{place.title}</h2>
            <p>Rate: {place.rate}</p>
            <p>Reviews: {place.reviews}</p>
            <p>Price: {place.price}</p>
            <img
              src={place.photos[0]}
              alt={place.title}
              className="w-full h-auto"
            />
            <p>{place.photos[0]}</p>
            {console.log(place.photos)}
          </div>
        ))
      ) : (
        <p>No places found</p>
      )}
    </div>
  );
}

export default SearchResult;
