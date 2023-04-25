import React, {useContext, useEffect, useState} from "react";
import {StarwarsContext} from "../context/Context";
import {getStarships} from "../services/StarwarsService";
import {motion} from "framer-motion";
import StarshipIMG from '../assets/starship.jpg'
import {Button, Card, Modal} from "react-bootstrap";


const StarshipCard = () => {
    const {handleSearchTermChange, searchTerm, modalOpen, setModalOpen, toggleModal} = useContext(StarwarsContext)
    const [selectedStarship, setSelectedStarship] = useState(null);

    const handleButtonClick = (starship) => {
        console.log(starship)
        setSelectedStarship(starship);
        setModalOpen(true);
    };


    const [starships, setStarships] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getShips = async () => {
        const allStarships = await getStarships();
        if (allStarships.results.length > 0) {
            setStarships(allStarships.results)
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getShips()
    }, []);

    const filteredStarships = starships.filter(starship =>
        starship.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <motion.div className={"input-style "}>
                <motion.input type="text" placeholder="Search starships..." value={searchTerm}
                              onChange={handleSearchTermChange}/>
            </motion.div>
            <div className="container mt-5">
                <div className="row">
                    {filteredStarships?.map((starship) => (
                        <div key={starship.url} className={"col-md-4 mb-4"}>
                            <Card className={"card-style-component"}>
                                <Card.Body onClick={() => {
                                    handleButtonClick(starship)
                                }}>
                                    <Card.Title tag="h5">{starship.name}</Card.Title>
                                    <Card.Img
                                        className={"card-img"}
                                        variant="top"
                                        src={StarshipIMG}
                                    />
                                    <Card.Subtitle tag="h6" className="mb-2 text-muted">
                                        Model: {starship.model}
                                    </Card.Subtitle>
                                    <Card.Subtitle tag="h6" className="mb-2 text-muted">
                                        Hyperdrive Rating: {starship.hyperdrive_rating}
                                    </Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
            {selectedStarship && (
                <Modal
                    show={modalOpen}
                    toggle={toggleModal}
                    centered
                    className={"custom-modal"}
                >
                    <Modal.Header toggle={toggleModal}>
                        <h3>{selectedStarship.name}</h3>
                    </Modal.Header>
                    <Modal.Body>
                        <img className={"card-img-modal"} src={StarshipIMG} alt={selectedStarship.name}/>
                        <p><span>Model: </span> {selectedStarship.model}</p>
                        <p><span>Hyperdrive Rating:</span> {selectedStarship.hyperdrive_rating}</p>
                        <p><span>Passengers: </span>{selectedStarship.passengers}</p>
                        <p><span>Max Atmosphering Speed:</span> {selectedStarship.max_atmosphering_speed}</p>
                        <p><span>Manufacturer:</span> {selectedStarship?.manufacturer}</p>
                        <p><span>Crew: </span>{selectedStarship.crew}</p>
                        <p><span>Cargo Capacity:</span> {selectedStarship.cargo_capacity}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => {
                            setModalOpen(false)
                        }}>Close</Button>
                    </Modal.Footer>

                </Modal>
            )}
        </>
    );
};

export default StarshipCard;
