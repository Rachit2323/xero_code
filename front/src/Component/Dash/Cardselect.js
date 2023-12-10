import React from "react";
import "./Card.css";

const CardSelect = ({ name, status, img }) => {

  return (
    <div className="cardselect_outer ">
      <section>
        <h1>{name}</h1>
        <span>Status: {status}</span>
      </section>
      <span>
        <img id="progress-logo" src={img} alt={name} />
      </span>
    </div>
  );
};

export default CardSelect;
