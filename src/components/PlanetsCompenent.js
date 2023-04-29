// Import required dependencies and hooks
import React, {useContext, useEffect, useState} from 'react';
import {StarwarsContext} from "../context/Context";
import {motion} from "framer-motion";
import { getPlanets} from "../services/StarwarsService";
import {Card, Button, Modal} from "react-bootstrap";
import PlanetIMG from "../assets/home/planets.jpg";
// Creating Planet component

const PlanetsCompenent = () => {

    // Getting variables and functions from context
    const {filteredItems,getInitialData,getMoreData,handleButtonClick,disableLoadMore,handleSearchTermChange, searchTerm, modalOpen, setModalOpen,isLoading,selectedItem} = useContext(StarwarsContext)
    
    // useEffect that runs startup functions while the component is loading
    useEffect(() => {
        getInitialData(getPlanets);
        // Cleanup function to run when removing the component
        return () => handleSearchTermChange({ target: { value: '' } });
    }, []);


    return (
        <>
                <div className="container mt-5">
                    <div className="row">
                        <motion.div className={"input-style "}>
                            <motion.input type="text" placeholder="Search Planets..." value={searchTerm}
                                          onChange={handleSearchTermChange}/>
                        </motion.div>
                        {filteredItems?.map((planet) => (
                            <div key={planet.url} className={"col-md-4 mb-4"}>
                                <Card className={"card-style-component"} >
                                    <Card.Body onClick={() => {
                                        handleButtonClick(planet)
                                    }}>
                                        <Card.Title tag="h5">{planet.name} className="card-title-fixed"</Card.Title>

                                        <Card.Img
                                            className={"card-img card-img-fixed"}
                                            variant="top"
                                            src={PlanetIMG}
                                        />
                                        <Card.Subtitle tag="h6" className="mb-4 text-muted">
                                            <span>Climate :</span> {planet.climate}
                                        </Card.Subtitle>
                                        <Card.Subtitle tag="h6" className="mb-4 text-muted">
                                           <span>Population :</span>  {planet.population}
                                        </Card.Subtitle>
                                        <Card.Subtitle tag="h6" className="mb-4 text-muted">
                                            <span>Gravity :</span> {planet.gravity}
                                        </Card.Subtitle>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <Button variant="primary" onClick={()=>{getMoreData(getPlanets)}} disabled={disableLoadMore || isLoading}>
                            {isLoading ? 'Loading...' : 'Load More'}
                        </Button>
                    </div>
                </div>
            <Modal show={modalOpen} centered>
                {selectedItem && (
                    <>
                        <Modal.Header className="justify-content-center">
                            <h3>{selectedItem.name}</h3>
                        </Modal.Header>
                        <Modal.Body>
                            <img className={"card-img-modal"} src={PlanetIMG} alt={selectedItem.name}/>
                            <p><span>Climate:</span> {selectedItem.climate}</p>
                            <p><span>Diameter:</span> {selectedItem.diameter}</p>
                            <p><span>Gravity</span> {selectedItem.gravity}</p>
                            <p><span>Orbital Period:</span> {selectedItem.orbital_period}</p>
                            <p><span>Surface Water</span> {selectedItem.surface_water}</p>
                            <p><span>Rotation Per</span> {selectedItem.rotation_period}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button  className="close-button-centered" onClick={() => {
                                setModalOpen(false)
                            }}>Close</Button>
                        </Modal.Footer>
                    </>
                )}
            </Modal>
        </>

    );
};

export default PlanetsCompenent;