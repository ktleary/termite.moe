import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import useToken from "../auth/useToken";

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
  font-size: 21px;
  padding: 0 16px;
  width: 100%;
`;
const Nav = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

const NavItem = styled.div`
  width: 100%;
`;

const SignOut = styled(NavItem)`
  padding-right: 4vw;
  text-align: right;
`;

const NavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.76);
  text-decoration: none;
  font-size: 21px;
  &:hover {
    color: rgba(255, 255, 255, 1);
  }
`;

const ViewHeader = () => {
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const { token, setToken } = useToken();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setToken("");
    return history.push("/");
  };
  return (
    <HeaderContainer>
      <Logo>
        <NavLink to="/">TERMITE</NavLink>
      </Logo>
      <Nav>
        <NavItem>
          <SignOut to="/" onClick={handleSignOut}>
            Sign Out
          </SignOut>
        </NavItem>
      </Nav>
    </HeaderContainer>
  );
};

export default ViewHeader;

ViewHeader.propTypes = {
  setToken: PropTypes.func,
};
