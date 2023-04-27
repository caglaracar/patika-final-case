// Import required dependencies and components
import { NavLink, Outlet } from "react-router-dom";
import wars from "../assets/general/logo.svg";
import React from "react";

// Define the MainLayout functional component
export const MainLayout = () => {
    return (
        <>
            {/* Render the header section */}
            <header>
                {/* Create a navigation bar using the 'nav' CSS class */}
                <nav className={"nav"}>
                    {/* Render the logo container with a NavLink for the home page */}
                    <div className="logo-container">
                        <NavLink to={"/"}  style={{ textAlign: "center" }}>
                            <img src={wars} alt="" />
                        </NavLink>
                    </div>
                    {/* Render the menu containing various NavLinks */}
                    <div className="menu">
                        {/* Home NavLink */}
                        <div>
                            <NavLink to={"/"}  activeclassname="active" className="star-wars-font">
                                Home
                            </NavLink>
                        </div>
                        {/* Render the rest of the NavLinks */}
                        <div className={"AllNavbar"}>
                            <NavLink to={"starship"} activeclassname="active" className="star-wars-font">
                                Starship
                            </NavLink>
                            <NavLink to={"/films"} className="star-wars-font" activeclassname="active">
                                Films
                            </NavLink>
                            <NavLink to={"/people"} className="star-wars-font" activeclassname="active">
                                Characters
                            </NavLink>
                            <NavLink to={"/vehicles"} className="star-wars-font"  activeclassname="active">
                                Vehicles
                            </NavLink>
                            <NavLink to={"/species"} className="star-wars-font"  activeclassname="active">
                                Species
                            </NavLink>
                            <NavLink to={"/planets"} className="star-wars-font"  activeclassname="active">
                                Planets
                            </NavLink>
                        </div>
                    </div>
                </nav>
            </header>
            {/* Render the main content container */}
            <main className="container">
                {/* Render the Outlet component to display the content of the current route */}
                <Outlet />
            </main>
        </>
    );
};
