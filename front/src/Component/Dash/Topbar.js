import React from "react";
import "./TopBar.css";
import search from "../../Images/search_black_24dp 1.png";
import gift from "../../Images/giftcard_black_24dp 1.jpg";
const Topbar = () => {
  return (
    <div className="outer_topbar">
      <div className="search_bar">
        <input className="input-style" placeholder="Search" />

        <section>
          <img src={search} />
        </section>
      </div>
      <div className="right_bar">
        <section>
          <span>
            <img src={gift} />
          </span>
          Upgrade Plan
        </section>
      </div>
    </div>
  );
};

export default Topbar;
