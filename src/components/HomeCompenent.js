// Import required dependencies and hooks
import React from 'react';
import {NavLink} from "react-router-dom";
import {Card} from "react-bootstrap";

import CharacterIMG from '../assets/home/characters.jpg'
import FilmsIMG from '../assets/home/films.jpg'
import StarshipIMG from '../assets/home/starship.jpg'
import VehiclesIMG from '../assets/home/vehicles.png'
import PlanetsIMG from '../assets/home/planets.jpg'
import SpeciesIMG from '../assets/home/species.jpg'



const HomeCompenent = () => {

    return (
        <>
            <div className="container mt-5">
                <div className="row">

                    <div className="col-md-4 mb-4 ">
                        <Card>
                            <Card.Body>
                                <NavLink to={"starship"} activeclassname   ="active">
                                    <Card.Title className="card-title-fixed">Starships</Card.Title>
                                    <Card.Img
                                        className={"card-img"}
                                        variant="top"
                                        src={StarshipIMG}
                                    />
                                </NavLink>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-md-4 mb-4 ">
                        <Card>
                            <Card.Body>
                                <NavLink to={"/films"} activeclassname="active">
                                    <Card.Title className="card-title-fixed">Films</Card.Title>
                                    <Card.Img
                                        className={"card-img"}
                                        variant="top"
                                        src={FilmsIMG}
                                    />
                                </NavLink>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-md-4 mb-4">
                        <Card>
                            <Card.Body>
                                <NavLink to={"/people"} activeclassname   ="active">
                                    <Card.Title className="card-title-fixed">CHARACTERS</Card.Title>

                                    <Card.Img
                                        className={"card-img"}
                                        variant="top"
                                        src={CharacterIMG}
                                    />
                                </NavLink>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-md-4 mb-4 ">
                        <Card>
                            <Card.Body>
                                <NavLink to={"/vehicles"} activeclassname   ="active">
                                    <Card.Title className="card-title-fixed">Vehicles</Card.Title>

                                    <Card.Img
                                        className={"card-img"}
                                        variant="top"
                                        src={VehiclesIMG}
                                    />
                                </NavLink>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-md-4 mb-4 ">
                        <Card>

                            <Card.Body>
                                <NavLink to={"/species"} activeclassname   ="active">
                                    <Card.Title className="card-title-fixed">Species</Card.Title>
                                    <Card.Img
                                        className={"card-img"}
                                        variant="top"
                                        src={SpeciesIMG}
                                    />
                                </NavLink>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-md-4 mb-4 ">
                        <Card>
                            <Card.Body>
                                <NavLink to={"/planets"} activeclassname   ="active">
                                    <Card.Title className="card-title-fixed">Planets</Card.Title>

                                    <Card.Img
                                        className={"card-img"}
                                        variant="top"
                                        src={PlanetsIMG}
                                    />
                                </NavLink>
                            </Card.Body>
                        </Card>
                    </div>

                </div>
            </div>
        </>

    );
};

export default HomeCompenent;