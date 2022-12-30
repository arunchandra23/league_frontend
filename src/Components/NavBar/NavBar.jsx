import React from "react";
import { Link, useLocation } from "react-router-dom";
import './NavBar.css'


const useCurrentPath = () => {
  const location = useLocation()

  return location
}

const NavBar = () => {
  return (
    <div className="nav-container ui fixed borderless huge menu">
      <Link to="/" className="active item">
        THE LEAGUE
      </Link>
      {useCurrentPath().pathname!=='/'?null:

      <div className="right menu">
        <Link to="/login" className="ui item">
          ADMIN
        </Link>
      </div>
}
    </div>
  );
};

export default NavBar;
