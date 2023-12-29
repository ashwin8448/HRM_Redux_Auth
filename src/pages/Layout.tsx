import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header.tsx";
import Footer from "../components/Footer/Footer.tsx";
import { useEffect } from "react";
import store from "../core/store/configureStore.ts";
import { fetchDropdownData } from "../core/store/actions.ts";
import useAuth from "../hooks/useAuth.ts";

function Layout() {
    const {isAuthenticated} = useAuth()
    useEffect(() => {
       if(isAuthenticated) store.dispatch(fetchDropdownData()) 
    },[isAuthenticated])
    return (
        <>
            <Header />
            <main className="main-section global-width global-padding">

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
}

export default Layout;
