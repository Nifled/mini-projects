import React from "react";

const Nav = props => (
  <nav>
    <ul className="nav-items">
      <li className={`nav-item ${props.activeLink === "Home" && "active"}`}>
        <button onClick={() => props.onLinkClick("Home")} className="nav-link">
          Home
        </button>
      </li>
      <li className={`nav-item ${props.activeLink === "Favs" && "active"}`}>
        <button onClick={() => props.onLinkClick("Favs")} className="nav-link">
          Favs
        </button>
      </li>
    </ul>
  </nav>
);

export default Nav;
