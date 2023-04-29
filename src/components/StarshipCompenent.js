// Import required dependencies and hooks
import React, {useContext, useEffect, useState} from "react";
import {StarwarsContext} from "../context/Context";
import {getStarships} from "../services/StarwarsService";
import {motion} from "framer-motion";
import {Button, Card, Modal} from "react-bootstrap";
import starshipIMGs from '../JSON/starshipphoto.json';

// Creating character Starship
const StarshipCard = () => {
    // Getting variables and functions from context
    const {handleButtonClick,selectedImg,filteredItems, getInitialData, getMoreData, disableLoadMore, handleSearchTermChange, searchTerm, modalOpen, setModalOpen, isLoading, selectedItem} = useContext(StarwarsContext)
    // useEffect that runs startup functions while the component is loading
    useEffect(() => {
        getInitialData(getStarships);
        // Cleanup function to run when removing the component
        return () => handleSearchTermChange({target: {value: ''}});

    }, []);

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <motion.div className={"input-style"}>
                        <motion.input type="text" placeholder="Search starships..." value={searchTerm}
                                      onChange={handleSearchTermChange}/>
                    </motion.div>
                    {filteredItems?.map((starship, index) => (
                        <div key={starship.url} className={"col-md-4 mb-4"}>
                            <Card className={"card-style-component"}>
                                <Card.Body onClick={() => {
                                    handleButtonClick(starship, starshipIMGs[index].img)
                                }}>
                                    <Card.Title tag="h5" className="card-title-fixed">{starship.name}</Card.Title>
                                    <Card.Img className={"card-img card-img-fixed"} variant="top"
                                              src={starshipIMGs[index].img}/>
                                    <Card.Subtitle tag="h6" className="card-model text-muted">
                                        <span>Model :</span> {starship.model}
                                    </Card.Subtitle>
                                    <Card.Subtitle tag="h6" className="mb-4 text-muted">
                                        <span>Hyperdrive Rating :</span> {starship.hyperdrive_rating}
                                    </Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
                <div className="text-center">
                    <Button className={"load-more"} variant="primary" onClick={() => {
                        getMoreData(getStarships)
                    }} disabled={disableLoadMore || isLoading}>
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
                            <img className={"card-img-modal"} src={selectedImg} alt={selectedItem.name}/>
                            <p><span>Model: </span> {selectedItem.model}</p>
                            <p><span>Hyperdrive Rating:</span> {selectedItem.hyperdrive_rating}</p>
                            <p><span>Passengers: </span>{selectedItem.passengers}</p>
                            <p><span>Max Atmosphering Speed:</span> {selectedItem.max_atmosphering_speed}</p>
                            <p><span>Manufacturer:</span> {selectedItem?.manufacturer}</p>
                            <p><span>Crew: </span>{selectedItem.crew}</p>
                            <p><span>Cargo Capacity:</span> {selectedItem.cargo_capacity}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="close-button-centered" onClick={() => {
                                setModalOpen(false)
                            }}>Close</Button>
                        </Modal.Footer>
                    </>

                )}
            </Modal>

        </>

    );

};

export default StarshipCard;
