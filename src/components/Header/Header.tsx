import HeaderWrapper from "./header.ts";
import StyledLink from "./../StyledLink";
import Tooltip from "../Tooltip/Tooltip.tsx";
import Button from "../Button/Button.tsx";
import useAuth from "../../hooks/useAuth.ts";

import logo from "../../assets/favicon.png";

function Header() {
  const { user, logout } = useAuth();

  return (
    <HeaderWrapper>
      <div className="header-content global-width">
        <StyledLink to="/">
          <span className="logo-wrapper">
            <img className="logo" src={logo} alt="" />
            <Tooltip className="header-tooltip" message="Go to homepage" />
          </span>
        </StyledLink>
        {user.isAuthenticated && (
          <Button
            onClick={() => {
              logout();
            }}
          >
            Logout
          </Button>
        )}
      </div>
    </HeaderWrapper>
  );
}
export default Header;
