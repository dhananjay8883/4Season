import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import pinIcon from "./pin-location-4355.svg";
const Mapp = ({ place }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView(
        [place.X, place.Y],
        20
      );
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      const data = {
        pict: {
          coords: [place.X, place.Y],
          title: "Pict pune",
          address: `<b>Pict pune</b><br>123<br>PUNE<br>`,
          website: "https://google.com",
          phone: 123,
        },
      };
      const customIcon = L.icon({
        iconUrl: pinIcon,
        iconSize: [60, 60],
      });
      for (let key in data) {
        const location = data[key];
        const marker = L.marker(location.coords, {
          title: location.title,
          icon: customIcon,
        });

        if (location.address) {
          marker.bindPopup(`
            <span class="popup">
              ${location.address}
              <a href="${location.website}" target="_blank">Website</a><br>
              Call: <a href="tel:${location.phone}">${location.phone}</a>
            </span>
          `);
        }

        marker.addTo(mapRef.current);
      }
    }
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);
  // Inline styles for centering the map container
  const outerContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "white",
    marginTop: "170px",
    // Optional background color
  };
  const mapStyle = {
    width: "1000px",
    height: "500px",
    // margin:'10px',
  };
  return (
    <div style={outerContainerStyle}>
      <div
        ref={mapContainerRef}
        style={mapStyle}
        id="map"
        className="rounded-xl"
      />
    </div>
  );
};
export default Mapp;

// import React from "react";

// function Mapp() {
//   return <div></div>;
// }

// export default Mapp;
