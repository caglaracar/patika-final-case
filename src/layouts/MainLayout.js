import { NavLink, Outlet } from "react-router-dom";
import wars from "../assets/logo.svg";
import React, { useState } from "react";

export const MainLayout = () => {

    return (
        <>
            <header>


                <nav className={"nav"}>
                    <div className="logo-container">
                        <NavLink to={"/"}  style={{ textAlign: "center" }}>
                            <img src={wars} alt="" />
                        </NavLink>
                    </div>
                    <div className="menu">
                        <div>
                            <NavLink to={"/"}  activeclassname="active" className="star-wars-font">
                                Home
                            </NavLink>
                        </div>

                        <div className={"AllNavbar"}>
                            <NavLink to={"starship"} activeclassname="active" className="star-wars-font">
                                Starship
                            </NavLink>
                            <NavLink to={"/films"} className="star-wars-font" activeclassname="active">
                                Films
                            </NavLink>
                            <NavLink to={"/people"} className="star-wars-font" activeclassname="active">
                                People
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

            <main className="container">
                <Outlet />
            </main>
        </>
    );
};
