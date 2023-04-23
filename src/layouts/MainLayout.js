import { NavLink, Outlet} from "react-router-dom";
import wars from '../assets/logo.svg'

export const MainLayout = () => {

    return (
        <>
            <header>
                <div className="logo-container">
                    <NavLink to={"/"} style={{ textAlign: "center" }}>
                        <img src={wars} alt=""/>
                        {/*<span style={{ color: "#DB4437" }}>S</span>*/}
                    </NavLink>
                </div>
                <nav>
                    <div className="menu">
                        <div>
                            <NavLink to={"/"} activeclassname="active">
                                Home
                            </NavLink>
                        </div>

                        <div className={"AllNavbar"}>
                            <NavLink to={"starship"} activeclassname   ="active">
                                Starship
                            </NavLink>
                            <NavLink to={"/films"} activeclassname   ="active">
                                Films
                            </NavLink>
                            <NavLink to={"/people"} activeclassname   ="active">
                                People
                            </NavLink>
                            <NavLink to={"/vehicles"} activeclassname   ="active">
                                Vehicles
                            </NavLink>
                            <NavLink to={"/species"} activeclassname   ="active">
                                Species
                            </NavLink>
                            <NavLink to={"/planets"} activeclassname   ="active">
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