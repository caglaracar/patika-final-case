import React, {useContext, useEffect, useState} from 'react';
import {StarwarsContext} from "../context/Context";
import {motion} from "framer-motion";
import {getPlanets, getSpecies} from "../services/StarwarsService";
import {Card, Button, Modal} from "react-bootstrap";
import PlanetIMG from "../assets/planets.jpg";

const PlanetsComp = () => {
    const {handleSearchTermChange, searchTerm, modalOpen, setModalOpen, toggleModal} = useContext(StarwarsContext)
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [planet, setPlanet] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const handleButtonClick = (people) => {
        setSelectedPlanet(people);
        setModalOpen(true);
    };
    const getAllPlanet = async () => {
        const allPlanet = await getPlanets();
        setPlanet(allPlanet.results)

        if (allPlanet.length > 0) {
            setIsLoading(false)
        }
    }
    console.log(planet)

    useEffect(() => {
        getAllPlanet()
    }, []);
    const filteredPlanets = planet.filter(planet =>
        planet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log("planet", filteredPlanets)
    return (
        <>
            <div>
                <motion.div className={"input-style "}>
                    <motion.input type="text" placeholder="Search Planets..." value={searchTerm}
                                  onChange={handleSearchTermChange}/>
                </motion.div>
                <div className="container mt-5">
                    <div className="row">
                        {filteredPlanets?.map((planet) => (
                            <div key={planet.url} className={"col-md-4 mb-4"}>
                                <Card className={"card-style-component"}>
                                    <Card.Body onClick={() => {
                                        handleButtonClick(planet)
                                    }}>
                                        <Card.Title tag="h5">{planet.name}</Card.Title>

                                        <Card.Img
                                            className={"card-img"}
                                            variant="top"
                                            src={PlanetIMG}
                                        />
                                        <Card.Subtitle tag="h6" className="mb-2 text-muted">
                                            Climate: {planet.climate}
                                        </Card.Subtitle>
                                        <Card.Subtitle tag="h6" className="mb-2 text-muted">
                                            Population: {planet.population}
                                        </Card.Subtitle>
                                        <Card.Subtitle tag="h6" className="mb-2 text-muted">
                                            Gravity: {planet.gravity}
                                        </Card.Subtitle>

                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal show={modalOpen} toggle={toggleModal} centered>
                {selectedPlanet && (
                    <>
                        <Modal.Header toggle={toggleModal}>
                            <h3>{selectedPlanet.name}</h3>
                        </Modal.Header>
                        <Modal.Body>
                            <img className={"card-img-modal"} src={PlanetIMG} alt={selectedPlanet.name}/>
                            <p>average_height: {selectedPlanet.climate}</p>
                            <p>Average Lifespan: {selectedPlanet.diameter}</p>
                            <p>Classification: {selectedPlanet.gravity}</p>
                            <p>Designation: {selectedPlanet.orbital_period}</p>
                            <p>Surface Water: {selectedPlanet.surface_water}</p>
                            <p>Rotation Period: {selectedPlanet.rotation_period}</p>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => {
                                setModalOpen(false)
                            }}>Close</Button>

                        </Modal.Footer>
                    </>
                )}
            </Modal>
        </>

    );
};

export default PlanetsComp;