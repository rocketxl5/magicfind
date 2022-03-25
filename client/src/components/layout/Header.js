import React, {
  useRef,
  Fragment,
  useState,
  useEffect,
  useContext
} from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from './Navbar';
import AuthMenu from './AuthMenu';
import SearchCatalog from '../views/SearchCatalog';
import { FiMail } from 'react-icons/fi';
import { FiShoppingCart } from 'react-icons/fi';
import { FiChevronDown } from 'react-icons/fi';
import { FiSearch } from 'react-icons/fi';
import { RouteContext } from '../../contexts/RouteContext';
import { UserContext } from '../../contexts/UserContext';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';
import styled from 'styled-components';

const Header = () => {
  const location = useLocation();
  const navCheckBox = useRef(null);
  const searchCheckbox = useRef(null);
  const { notFound } = useContext(RouteContext);
  const { user, unreadMail } = useContext(UserContext);
  const { itemsCount } = useContext(ShoppingCartContext);
  const handleChange = (e) => {
    if (e.target.checked && navCheckBox.current.checked) {
      navCheckBox.current.checked = false;
    }
  };

  useEffect(() => {
    navCheckBox.current.checked = false;
    searchCheckbox.current.checked = false;
  }, [location]);

  return (
    <header className="header">
      <div className="section--logo">
        <h1 className="logo">
          <Link to="/">Magic Find</Link>
        </h1>
      </div>
      {!notFound && (
        <Navbar navCheckBox={navCheckBox} searchCheckbox={searchCheckbox} />
      )}

      <div className="section--icons">
        {user && (
          <Mail className="section--mail padding-right">
            <Link to="/mail/inbox" title="Mailbox">
              {unreadMail > 0 && (
                <UnreadContainer>
                  <Unread>{unreadMail}</Unread>
                </UnreadContainer>
              )}
              <FiMail className="header--icon" size={27} />
            </Link>
          </Mail>
        )}
        <div className="section--search padding-right">
          <input
            type="checkbox"
            id="search-toggle"
            className="search-toggle"
            ref={searchCheckbox}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <label htmlFor="search-toggle" className="search-toggle-label">
            <FiSearch
              className="header--icon"
              size={27}
              title="Search Catalog"
            />
          </label>
          <div className="section searchbar">
            <SearchCatalog className="section searchbar" />
          </div>
        </div>
        <Cart className="section--cart padding-right">
          <Link to="/cart">
            {itemsCount > 0 && (
              <CountContainer>
                <Count>{itemsCount}</Count>
              </CountContainer>
            )}
            <FiShoppingCart size={27} title="Shopping Cart" />
          </Link>
        </Cart>
      </div>
    </header>
  );
};

const CountContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -10px;
  left: 17px;
  background: #dc3545;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  z-index: 10;
`;

const Count = styled.div`
  text-align: center;
  font-size: 0.8em;
  font-weight: bold;
  color: #fff;
`;

const Cart = styled.div`
  position: relative;
`;
const Mail = styled.div`
  position: relative;
`;
const UnreadContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -10px;
  left: 17px;
  background: #28a745;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  z-index: 10;
`;
const Unread = styled.div`
  text-align: center;
  font-size: 0.8em;
  font-weight: bold;
  color: #fff;
`;

export default Header;
