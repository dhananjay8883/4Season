import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Chart.css";
import { UserContext } from "../../../UserContext";
import { differenceInCalendarDays, format } from "date-fns";

function Chart({place}) {
  // const [price, setPrice] = useState(null);
  const [date, setDate] = useState(null);
  const { startDate, setStartDate, endDate, setEndDate, guests, setGuests } =
    useContext(UserContext);

  // useEffect(() => {
  //   if (placeId) {
  //     axios
  //       .get("http://localhost:4000/places/${placeId}")
  //       .then((response) => {
  //         setPrice(response.data.price);
  //         setDate(new Date(response.data.date));
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       })
  //   }
  // }, [placeId]);
  const handleStartDateChange = (event) => {
    setStartDate(new Date(event.target.value));
  };

  const handleEndDateChange = (event) => {
    setEndDate(new Date(event.target.value));
  };

  const formatDateToInputValue = (date) => {
    return date ? format(date, "yyyy-MM-dd") : "";
  };

  return (
    <div className="chart-container flex justify-between px-5 fixed left-0 bottom-0 w-full items-center pt-3 pb-3" >
      <div>
        <p>Price: ${place.price !== null ? place.price : "Loading..."}</p>
        <div className="px-0 py-0">
          <label>Check In:  </label>
          <input
            type="date"
            value={formatDateToInputValue(startDate)}
            onChange={handleStartDateChange}
          />
        </div>
        <div className="px-0 py-0">
          <label>Check Out: </label>
          <input
            type="date"
            value={formatDateToInputValue(endDate)}
            onChange={handleEndDateChange}
          />
        </div>
      </div>
      <div>
        <button className="bookbutton1 text-white font-semibold">
          Reserve
        </button>
      </div>
    </div>
  );
}

export default Chart;