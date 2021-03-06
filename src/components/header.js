import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import ViewHeader from "./viewer/view-header";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderContainer = styled.div`
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  height: 48px;
  margin: auto;
  width: 100vw;
  max-width: 1100px;
`;
const Logo = styled.div`
  font-size: 24px;
  padding: 0 16px;
  width: 100%;
`;
const Nav = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const NavItem = styled.div`
  padding: 8px;
`;

const NavLink = styled(Link)`
  color: rgba(255, 255, 255, 1);
  text-decoration: none;
  font-size: 21px;
`;

const Header = ({ setToken, token }) => {
  const { pathname } = useLocation();
  // eslint-disable-next-line fp/no-unused-expression
  console.log({ token });
  return pathname === "/viewer" ? (
    <ViewHeader setToken={setToken} />
  ) : (
    <HeaderContainer>
      <Logo>
        <NavLink to="/">PostWorm</NavLink>
      </Logo>
      <Nav>
        <NavItem>
          <NavLink to="/tools">Product</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/about">About Us</NavLink>
        </NavItem>
        <NavItem>
          {token ? (
            <NavLink to="/viewer">App</NavLink>
          ) : (
            <NavLink to="/login">Sign In</NavLink>
          )}
        </NavItem>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;

// eslint-disable-next-line fp/no-mutation
Header.propTypes = {
  setToken: PropTypes.func,
  token: PropTypes.string,
};
