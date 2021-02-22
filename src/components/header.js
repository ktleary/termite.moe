import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderContainer = styled.div`
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  height: 72px;
  margin: auto;
  width: 1100px;
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
  font-size: 24px;
`;

const Header = () => (
  <HeaderContainer>
    <Logo>
      <NavLink to="/">Source Lifter</NavLink>
    </Logo>
    <Nav>
      <NavItem>
        <NavLink to="/">Home</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/tools">Tools</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/about">About</NavLink>
      </NavItem>
    </Nav>
  </HeaderContainer>
);

export default Header;
