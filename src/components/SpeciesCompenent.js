// Import required dependencies and hooks
import React, {useContext, useEffect, useState} from 'react';
import {StarwarsContext} from "../context/Context";
import {motion} from "framer-motion";
import {getSpecies, getVehicles} from "../services/StarwarsService";
import {Card, Button, Modal} from "react-bootstrap";
import SpeciesIMG from '../assets/home/species.jpg'

// Creating species component
const SpeciesCompenent = () => {

    // Getting variables and functions from context
    const {filteredItems,getInitialData,getMoreData,handleButtonClick,disableLoadMore,handleSearchTermChange, searchTerm, modalOpen, setModalOpen,isLoading,selectedItem} = useContext(StarwarsContext)

    // useEffect that runs startup functions while the component is loading
    useEffect(() => {
        getInitialData(getSpecies);
        // Cleanup function to run when removing the component
        return () => handleSearchTermChange({ target: { value: '' } });
    }, []);
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <motion.div className={"input-style "}>
                        <motion.input type="text" placeholder="Search Species..." value={searchTerm}
                                      onChange={handleSearchTermChange}/>
                    </motion.div>
                    {filteredItems?.map((specie) => (
                        <div key={specie.url} className={"col-md-4 mb-4"}>
                            <Card className={"card-style-component"}>
                                <Card.Body onClick={() => {
                                    handleButtonClick(specie)
                                }}>
                                    <Card.Title tag="h5" className="card-title-fixed">{specie.name}</Card.Title>

                                    <Card.Img
                                        className={"card-img card-img-fixed"}
                                        variant="top"
                                        src={SpeciesIMG}
                                    />
                                    <Card.Subtitle tag="h6" className="mb-4 text-muted">
                                      <span>Classification :</span>   {specie.classification}
                                    </Card.Subtitle>
                                    <Card.Subtitle tag="h6" className="mb-4 text-muted">
                                        <span>Language :</span>  {specie.language}
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
                            <img className={"card-img-modal"} src={SpeciesIMG} alt={selectedItem.name}/>
                            <p><span>Average Height:</span> {selectedItem.average_height}</p>
                            <p><span>Average Lifespan:</span> {selectedItem.average_lifespan}</p>
                            <p><span>Classification:</span> {selectedItem.classification}</p>
                            <p><span>Designation:</span> {selectedItem.designation}</p>
                            <p><span>Language:</span> {selectedItem.language}</p>
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

export default SpeciesCompenent;