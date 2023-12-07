import React from "react";
import "./Card.css";
import reload from "./svg/reload.svg";
import amazon from "../../Images/1280px-Amazon_Web_Services_Logo 1.svg";
const CardSelect = () => {
  return (
    <div className="cardselect_outer ">
      <section>
        <h1>AWS</h1>
        <span>
        Status: Complete
        </span>
      </section>
      <span>
        <img src={amazon} />
      </span>
    </div>
  );
};

export default CardSelect;
