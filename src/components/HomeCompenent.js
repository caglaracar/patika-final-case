import React from 'react';
import {NavLink} from "react-router-dom";
import {Card} from "react-bootstrap";

import CharacterIMG from '../assets/home/characters.jpg'
import FilmsIMG from '../assets/home/films.jpg'
import StarshipIMG from '../assets/home/starship.jpg'
import VehiclesIMG from '../assets/home/vehicles.png'
import PlanetsIMG from '../assets/home/planets.jpg'
import SpeciesIMG from '../assets/home/speices.jpg'



const HomeCompenent = () => {

    return (
        <>
            <div className="container mt-5">
                <div className="row">


                    <div className="col-md-4 mb-4 ">
                        <Card>

                            <Card.Body>
                                <NavLink to={"starship"} activeclassname   ="active">
                                    <Card.Img
                                        className={"card-img"}
                                        variant="top"
                                        src={StarshipIMG}
                                    />
                                    <Card.Title>Starships</Card.Title>
                                </NavLink>

                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-md-4 mb-4 ">
                        <Card>

                            <Card.Body>
                                <NavLink to={"/films"} activeclassname   ="active">
                                    <Card.Img
                                        className={"card-img"}
                                        variant="top"
                                        src={FilmsIMG}
                                    />
                                    <Card.Title>Films</Card.Title>
                                </NavLink>

                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-md-4 mb-4">
                        <Card>
                            <Card.Body>
                                <NavLink to={"/people"} activeclassname   ="active">
                                    <Card.Img
                                        className={"card-img"}
                                        variant="top"
                                        src={CharacterIMG}
                                    />
                                    <Card.Title>CHARACTERS</Card.Title>
                                </NavLink>

                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-md-4 mb-4 ">
                        <Card>
                            <Card.Body>
                                <NavLink to={"/vehicles"} activeclassname   ="active">
                                    <Card.Img
                                        className={"card-img"}
                                        variant="top"
                                        src={VehiclesIMG}
                                    />
                                    <Card.Title>Vehicles</Card.Title>
                                </NavLink>

                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-4 mb-4 ">
                        <Card>

                            <Card.Body>
                                <NavLink to={"/species"} activeclassname   ="active">
                                    <Card.Img
                                        className={"card-img"}
                                        variant="top"
                                        src={SpeciesIMG}
                                    />
                                    <Card.Title>Species</Card.Title>
                                </NavLink>

                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-4 mb-4 ">
                        <Card>
                            <Card.Body>
                                <NavLink to={"/planets"} activeclassname   ="active">
                                    <Card.Img
                                        className={"card-img"}
                                        variant="top"
                                        src={PlanetsIMG}
                                    />
                                    <Card.Title>Planets</Card.Title>
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