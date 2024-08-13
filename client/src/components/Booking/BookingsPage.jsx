import { useEffect, useState } from "react";
import AccountNav from "../../AccountNav";
import axios from "axios";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/booking").then((response) => {
      setBookings(response.data);
    });
  }, []);

  return (
    <>
      <AccountNav />
      <div>
        {bookings.length > 0 &&
          bookings.map((booking) => (
            <div key={booking._id}>
              {booking.place.photos.length > 0 && (
                <img
                  className="object-cover rounded-2xl"
                  src={
                    "http://localhost:4000/upload/" + booking.place.photos[0]
                  }
                  alt=""
                />
              )}
              {booking.startDate}====={booking.endDate}
            </div>
          ))}
      </div>
    </>
  );
}
