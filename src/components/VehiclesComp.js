import React, {useContext, useEffect, useState} from 'react';
import {motion} from "framer-motion";
import {StarwarsContext} from "../context/Context";
import {Card, Button, Modal} from "react-bootstrap";
import {getVehicles} from "../services/StarwarsService";
import VehiclesIMG from "../assets/vehicles.png";


const VehiclesComp = () => {
    const {handleSearchTermChange, searchTerm, modalOpen, setModalOpen, toggleModal} = useContext(StarwarsContext)

    const [selectedVehicles, setSelectedVehicles] = useState(null);

    const handleButtonClick = (vehicles) => {
        setSelectedVehicles(vehicles);
        setModalOpen(true);
    };

    const [vehicles, setVehicles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const allGetVehicles = async () => {
        const allVehicles = await getVehicles();
        setVehicles(allVehicles.results)
        if (allVehicles.results.length > 0) {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        allGetVehicles()
    }, []);

    const filteredVehicles = vehicles.filter(vehicles =>
        vehicles.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <>
            <motion.div className={"input-style "}>
                <motion.input type="text" placeholder="Search vehicles..." value={searchTerm}
                              onChange={handleSearchTermChange}/>
            </motion.div>
            <div className="container mt-5">
                <div className="row">
                    {filteredVehicles?.map((vehicles) => (
                        <div key={vehicles.url} className={"col-md-4 mb-4"}>
                            <Card className={"card-style-component"}>

                                <Card.Body onClick={() => {
                                    handleButtonClick(vehicles)
                                }}>
                                    <Card.Title tag="h5">{vehicles.name}</Card.Title>

                                    <Card.Img
                                        className={"card-img"}
                                        variant="top"
                                        src={VehiclesIMG}
                                    />
                                    <Card.Subtitle tag="h6" className="mb-2 text-muted">
                                        Model: {vehicles.model}
                                    </Card.Subtitle>
                                    <Card.Subtitle tag="h6" className="mb-2 text-muted">
                                        Hyperdrive Rating: {vehicles.hyperdrive_rating}
                                    </Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>

            <Modal show={modalOpen} toggle={toggleModal} centered>
                {selectedVehicles && (
                    <>
                        <Modal.Header toggle={toggleModal}>
                            <h3>{selectedVehicles.name}</h3>
                        </Modal.Header>
                        <Modal.Body>

                            <img  className={"card-img-modal"}  src={VehiclesIMG} alt={selectedVehicles.name}/>
                            <p>Model: {selectedVehicles.model}</p>
                            <p>Hyperdrive Rating: {selectedVehicles.hyperdrive_rating}</p>
                            <p>Passengers: {selectedVehicles.passengers}</p>
                            <p>Max Atmosphering Speed: {selectedVehicles.max_atmosphering_speed}</p>
                            <p>Manufacturer: {selectedVehicles?.manufacturer}</p>
                            <p>Crew: {selectedVehicles.crew}</p>
                            <p>Cargo Capacity: {selectedVehicles.cargo_capacity}</p>
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

export default VehiclesComp;