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
          {/* Home -> Нүүр */}
          <NavLink className="link" exact activeClassName="active" onClick={toggleMenu} to="/">
            Нүүр
          </NavLink>
          {/* Popular -> Алдартай */}
          <NavLink
            className="link"
            exact
            activeClassName="active"
            onClick={toggleMenu}
            to="/popular"
          >
            Алдартай
          </NavLink>
          {/* Top Rated -> Өндөр үнэлгээтэй */}
          <NavLink
            className="link"
            exact
            activeClassName="active"
            onClick={toggleMenu}
            to="/top_rated"
          >
            Өндөр үнэлгээтэй
          </NavLink>
          {/* Upcoming -> Төд удахгүй */}
          <NavLink
            className="link"
            exact
            activeClassName="active"
            onClick={toggleMenu}
            to="/upcoming"
          >
            Төд удахгүй
          </NavLink>
        </div>
      </div>
      <div className="search">
        {/* Placeholder-ийг монгол болгов */}
        <input type="text" placeholder="Кино хайх..." />
      </div>
      {/* Sign In -> Нэвтрэх */}
      <button>Нэвтрэх</button>
    </div>
  );
};

export default Navbar;
