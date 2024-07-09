import React from 'react';
import {NavLink} from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <nav className="nav">
      <div className="container header-container">
        <NavLink to="/" className="navbar-brand">Calorie tracker</NavLink>
        <ul className={'nav-list'}>
          <li className={'nav-item'}>
            <NavLink
              to="/"
              className={'nav-link'}
            >
              Home page
            </NavLink>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Header;