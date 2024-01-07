import { apiURL } from "../../core/config/constants";
import { getData, postData } from "../../core/api/functions";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useState } from "react";
import { setlogin, setlogout } from "../../core/store/actions";
import {
  setCookie,
  deleteCookie,
  convertIGetEmployeeToIAppEmployee,
} from "../../utils/helper";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useLocation, useNavigate } from "react-router-dom";
import { IAccessToken } from "../../core/interfaces/interface";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userData);
  const navigate = useNavigate();
  const location = useLocation();
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      setAuthLoading(true);
      const authResponse = await postData(apiURL.authSignIn, {
        username,
        password,
      });
      if (authResponse) {
        const responseData: { access_token: string; refresh_token: string } =
          authResponse.data;
        const accessToken = responseData.access_token;
        const refreshToken = responseData.refresh_token;
        setCookie("accessToken", accessToken);
        setCookie("refreshToken", refreshToken);
        const currentEmployeeId = (jwtDecode(accessToken) as IAccessToken)
          .username;
        const currentEmployee = (
          await getData(apiURL.employee + `/${currentEmployeeId}`)
        ).data.data;
        dispatch(setlogin(convertIGetEmployeeToIAppEmployee(currentEmployee)));
        //TODO: Add name
        navigate(location.state ? location.state.from : "/");
        toast.success("Welcome. You are succesfully logged in.");
      } else {
        //TODO: error msg
      }
    } catch (error: any) {
      if (error.message === "Invalid username or password")
        setAuthError(error.message);
      else
        toast.error("An error occurred during login.", {
          toastId: "login-error",
        });
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    dispatch(setlogout());
    navigate("/login", { replace: true });
  };

  const signUp = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      setAuthLoading(true);
      const response = await postData(apiURL.authSignUp, {
        username,
        password,
      });
      navigate("/login");
      toast.success(
        `Hi ${response.data.username}, you have signed up succesfully.`
      );
    } catch (error) {
      toast.error("An error occurred during sign up.", {
        toastId: "sign-up-error",
      });
    } finally {
      setAuthLoading(false);
    }
  };

  return {
    user,
    login,
    logout,
    signUp,
    authError,
    setAuthError,
    authLoading,
    setAuthLoading
  };
};
export default useAuth;
