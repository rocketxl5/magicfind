import React, {
  Fragment,
  useState,
  useEffect,
  useContext,
  useRef
} from 'react';
import { Link } from 'react-router-dom';
import SearchCatalog from '../views/SearchCatalog';
import AuthMenu from './AuthMenu';
import { FiChevronDown } from 'react-icons/fi';
import { FiShoppingCart } from 'react-icons/fi';
import { FiMail } from 'react-icons/fi';
import { UserContext } from '../../contexts/UserContext';
import styled from 'styled-components';

const Navbar = ({ navCheckBox, searchCheckbox }) => {
  const [display, setDisplay] = useState(true);
  const { user, setUser } = useContext(UserContext);

  const handleClick = (e) => {
    const checkbox = document.getElementById('nav-toggle');
    checkbox.checked = false;
  };

  const handleChange = (e) => {
    if (e.target.checked && searchCheckbox.current.checked) {
      searchCheckbox.current.checked = false;
    }
  };

  return (
    <Fragment>
      <input
        type="checkbox"
        id="nav-toggle"
        className="nav-toggle"
        ref={navCheckBox}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <label htmlFor="nav-toggle" className="nav-toggle-label">
        <span></span>
      </label>
      <nav id="navbar" className="navbar">
        <ul className="nav--list-items" onClick={(e) => handleClick(e)}>
          {!user ? (
            <Fragment>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              {display ? (
                <AuthMenu setDisplay={setDisplay} setUser={setUser} />
              ) : (
                ''
              )}
            </Fragment>
          )}
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navbar;
