import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../Images/Logo.png";

const Navbar = () => {

  const [toggle, setToggle] = useState(false);

  function toggleMenu(){
    setToggle(preValue => !preValue)
  }

  return (
    <div className="nav">
      <i id="menu" className={toggle? "fa fa-times" : "fa-solid fa-bars"}>
        <input id="menu-checkbox" onChange={toggleMenu} type="checkbox" name="chekbox" />
      </i>
      <NavLink className="logo" to="/">
        <img
          src={logo}
          alt="Movie Suggest"
        />
      </NavLink>
      <div className={toggle? "links responsive-nav" : "links"}>
        <NavLink to="/" onClick={toggleMenu}>
          <img
            src={logo}
            alt="Movie Suggest"
          />
        </NavLink>
        <div className="links-div">
          <NavLink className="link" exact activeClassName="active" onClick={toggleMenu} to="/">
            Home
          </NavLink>
          <NavLink
            className="link"
            exact
            activeClassName="active"
            onClick={toggleMenu}
            to="/popular"
          >
            Popular
          </NavLink>
          <NavLink
            className="link"
            exact
            activeClassName="active"
            onClick={toggleMenu}
            to="/top_rated"
          >
            Top Rated
          </NavLink>
          <NavLink
            className="link"
            exact
            activeClassName="active"
            onClick={toggleMenu}
            to="/upcoming"
          >
            Upcoming
          </NavLink>
        </div>
      </div>
      <div className="search">
        <input type="text" placeholder="Search for movies" />
      </div>
      <button>Sign In</button>
    </div>
  );
};

export default Navbar;
