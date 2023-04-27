import React, {useContext, useEffect, useState} from 'react';
import {motion} from "framer-motion";
import {StarwarsContext} from "../context/Context";
import {Card, Button, Modal} from "react-bootstrap";
import {getVehicles} from "../services/StarwarsService";
import VehiclesIMG from "../assets/home/vehicles.png";


const VehiclesCompenent = () => {
    const {handleSearchTermChange, searchTerm, modalOpen, setModalOpen,totalResults,setTotalResults,loadedResults,setLoadedResults} = useContext(StarwarsContext)
    const [selectedVehicles, setSelectedVehicles] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleButtonClick = (vehicles) => {
        setSelectedVehicles(vehicles);
        setModalOpen(true);
    };

    const getVehiclesData = async () => {
        setIsLoading(true);
        try {
            const currentPage = Math.ceil(loadedResults / 10);
            const data = await getVehicles(currentPage + 1, 10);
            setVehicles([...vehicles, ...data.results]);
            setTotalResults(data.count);
            setLoadedResults(loadedResults + data.results.length);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const getInitialVehiclesData = async () => {
        setIsLoading(true);
        try {
            const data = await getVehicles(1, 10);
            setVehicles(data.results);
            setTotalResults(data.count);
            setLoadedResults(data.results.length);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    const disableLoadMore = loadedResults >= totalResults;


    useEffect(() => {
        getInitialVehiclesData();
        return () => handleSearchTermChange({ target: { value: '' } });

    }, []);

    const filteredVehicles = vehicles.filter(vehicles =>
        vehicles.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(vehicles)


    return (
        <>

            <div className="container mt-5">
                <div className="row">
                    <motion.div className={"input-style "}>
                        <motion.input type="text" placeholder="Search vehicles..." value={searchTerm}
                                      onChange={handleSearchTermChange}/>
                    </motion.div>
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
                                       <span>Model :</span> {vehicles.model}
                                    </Card.Subtitle>
                                    <Card.Subtitle tag="h6" className="mb-2 text-muted">
                                        <span>Hyperdrive Rating :</span> {vehicles.hyperdrive_rating}
                                    </Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
                <div className="text-center">
                    <Button className={"load-more"} variant="primary" onClick={getVehiclesData} disabled={disableLoadMore || isLoading}>
                        {isLoading ? 'Loading...' : 'Load More'}
                    </Button>
                </div>
            </div>

            <Modal show={modalOpen} centered>
                {selectedVehicles && (
                    <>
                        <Modal.Header className="justify-content-center">
                            <h3>{selectedVehicles.name}</h3>
                        </Modal.Header>
                        <Modal.Body>

                            <img  className={"card-img-modal"}  src={VehiclesIMG} alt={selectedVehicles.name}/>
                            <p><span>Hyperdrive Rating:</span> {selectedVehicles.hyperdrive_rating}</p>
                            <p><span>Passengers:</span> {selectedVehicles.passengers}</p>
                            <p><span>Max Atmosphering Speed:</span> {selectedVehicles.max_atmosphering_speed}</p>
                            <p><span>Manufacturer:</span> {selectedVehicles?.manufacturer}</p>
                            <p><span>Cargo Capacity:</span> {selectedVehicles.cargo_capacity}</p>
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