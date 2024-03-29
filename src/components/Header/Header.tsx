import HeaderWrapper from "./header.ts";
import Button from "../Button/Button.tsx";
import useAuth from "../../pages/Login/useAuth.ts";
import dummyImg from "../../assets/userAvatar.svg";
import logo from "../../assets/favicon.png";
import { useNavigate } from "react-router-dom";
import TooltipComponent from "../Tooltip/Tooltip.tsx";
import { H1Styles } from "../../core/constants/components/text/textStyledComponents.ts";
import { useAppSelector } from "../../hooks/reduxHooks.ts";
import { AES } from "crypto-js";
import ProgressiveImg from "../ProgressiveImg/ProgressiveImg.tsx";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const user = useAppSelector((state) => state.userData);
  const logoElement = (
    <H1Styles>
      <img className="logo" src={logo} alt="" onClick={() => navigate("/")} />
    </H1Styles>
  );

  return (
    <HeaderWrapper>
      <div className="header-content global-padding global-width">
        {user.isAuthenticated ? (
          <>
            <TooltipComponent title="Go to homepage">
              {logoElement}
            </TooltipComponent>
            <div className="user-container">
              <TooltipComponent
                title={
                  user.employeeDetails?.isNew
                    ? "Please Complete Your Profile"
                    : "Click to View profile"
                }
              >
                <div>
                  <Button
                    onClick={() => {
                      const encryptedId = AES.encrypt(
                        user.employeeDetails!.id!,
                        import.meta.env.VITE_ENCRYPTION_SECRET
                      ).toString();
                      navigate(
                        `view-employee/${encodeURIComponent(encryptedId)}`,
                        { replace: true }
                      );
                    }}
                  >
                    <div className="image-container common-flex">
                      <ProgressiveImg
                        src={user.employeeDetails?.photoId || dummyImg}
                        alt="user image"
                      />
                      {user.employeeDetails?.isNew && (
                        <span
                          className="material-symbols-outlined profile-error"
                          title="Please complete your profile"
                        >
                          report
                        </span>
                      )}
                      <span>{user.employeeDetails?.firstName}</span>
                    </div>
                  </Button>
                </div>
              </TooltipComponent>
              <Button
                className="logout-btn"
                icon="logout"
                onClick={() => {
                  logout();
                }}
              />
            </div>
          </>
        ) : (
          logoElement
        )}
      </div>
    </HeaderWrapper>
  );
};
export default Header;
