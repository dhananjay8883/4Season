import React, { useContext, useEffect } from "react";
import Container2 from "./Container2";
import { UserContext } from "../../../UserContext";
import { icons } from "./icons";
import "./Features.css";

export default function Features({ place }) {
  const { icon, setIcon } = useContext(UserContext);

  useEffect(() => {
    if (place && place.perks) {
      const newIcon = icons.filter((icon) => place.perks.includes(icon.view));
      setIcon(newIcon);
    }
  }, [place, setIcon]);

  return (
    <div className="do">
      {place.perks.length > 0 && (
        <h1 className="offer">What this place offers</h1>
      )}
      <div className="col">
        <div className="col1">
          {icon.map((f_i) => (
            <Container2 key={f_i.key} img={f_i.img} mean={f_i.view} />
          ))}
        </div>
      </div>
    </div>
  );
}
