import React from "react";
import "./Card.css";
import reload from "./svg/reload.svg";

const Card = ({ name, url }) => {
  return (
    <div className="card_outer">
      <section>
        <h1>{name}</h1>
        <span>
          <p id="red"></p>
          <p id="green"></p>
         <p id="reload_img"> <img src={reload} alt="reload" /></p>
        </span>
      </section>
      <span>
        <img id="logo" src={url} alt={name} />
      </span>
    </div>
  );
};

export default Card;
