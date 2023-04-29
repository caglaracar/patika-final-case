// Import required dependencies and hooks
import React, {useContext, useEffect, useState} from 'react';
import {motion} from "framer-motion";
import {StarwarsContext} from "../context/Context";
import {Card, Button, Modal} from "react-bootstrap";
import VehiclesIMG from "../assets/home/vehicles.png";
import {getVehicles} from "../services/StarwarsService";

// Creating vehicles component
const VehiclesCompenent = () => {

    // Getting variables and functions from context
    const {filteredItems,getInitialData,getMoreData,handleButtonClick,disableLoadMore,handleSearchTermChange, searchTerm, modalOpen, setModalOpen,isLoading,selectedItem} = useContext(StarwarsContext)

    // useEffect that runs startup functions while the component is loading
    useEffect(() => {
        getInitialData(getVehicles);
        // Cleanup function to run when removing the component
        return () => handleSearchTermChange({ target: { value: '' } });
    }, []);

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <motion.div className={"input-style "}>
                        <motion.input type="text" placeholder="Search vehicles..." value={searchTerm}
                                      onChange={handleSearchTermChange}/>
                    </motion.div>
                    {filteredItems?.map((vehicle) => (
                        <div key={vehicle.url} className={"col-md-4 mb-4"}>
                            <Card className={"card-style-component"}>
                                <Card.Body onClick={() => {
                                    handleButtonClick(vehicle)
                                }}>
                                    <Card.Title tag="h5" className="card-title-fixed">{vehicle.name}</Card.Title>

                                    <Card.Img
                                        className={"card-img card-img-fixed"}
                                        variant="top"
                                        src={VehiclesIMG}
                                    />
                                    <Card.Subtitle tag="h6" className="card-model text-muted">
                                       <span>Model :</span> {vehicle.model}
                                    </Card.Subtitle>
                                    <Card.Subtitle tag="h6" className="mb-4 text-muted">
                                        <span>Max Atmosphering Speed:</span> {vehicle.max_atmosphering_speed}
                                    </Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
                <div className="text-center">
                    <Button className={"load-more"} variant="primary" onClick={()=>{getMoreData(getVehicles)}} disabled={disableLoadMore || isLoading}>
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

                            <img  className={"card-img-modal"}  src={VehiclesIMG} alt={selectedItem.name}/>
                            <p><span>Passengers:</span> {selectedItem.passengers}</p>
                            <p><span>Max Atmosphering Speed:</span> {selectedItem.max_atmosphering_speed}</p>
                            <p><span>Manufacturer:</span> {selectedItem.manufacturer}</p>
                            <p><span>Cargo Capacity:</span> {selectedItem.cargo_capacity}</p>
                            <p><span>Crew:</span> {selectedItem.crew}</p>
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

export default VehiclesCompenent;