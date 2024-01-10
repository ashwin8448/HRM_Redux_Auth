import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header.tsx";
import Footer from "../components/Footer/Footer.tsx";
import { ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/reduxHooks.ts";
import { getCookie } from "../utils/helper.ts";
import useAuth from "./Login/useAuth.ts";
import Loader from "../components/Loader/Loader.tsx";

const Layout = () => {

  const { logout, fetchCurrentUser, authLoading,setAuthLoading } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const authToken = getCookie("accessToken");
    if (authToken) {
      const decodedToken = jwtDecode(authToken); // jwt-decode npm package
      const currentTime = Math.floor(Date.now() / 1000);
      // Check token expiry
      if (decodedToken && decodedToken.exp! < currentTime) {
        logout();
      } else {
        fetchCurrentUser(authToken);
      }
    }
    else {
      setAuthLoading(false)
    }
  }, [dispatch]);

  
  return authLoading ? (
    <div className="center-loader">
      <Loader />
    </div>
  ) : (
    <>
      <Header />
      <main className="main-section global-width global-padding">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          limit={1}
          closeOnClick
          pauseOnFocusLoss={false} // avoid pausing when the window looses the focus
        />
        {/* This element will render either 
                    <EmployeeListing /> when URL is '/'
                    <Form /> when URL is 'edit-employee' or 'add-employee'
                    <EmployeeView /> when URL is 'view-employee' 
                */}

        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
