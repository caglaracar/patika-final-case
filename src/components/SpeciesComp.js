import React, {useContext, useEffect, useState} from 'react';
import {StarwarsContext} from "../context/Context";
import {motion} from "framer-motion";
import {getSpecies} from "../services/StarwarsService";
import {Card, Button, Modal} from "react-bootstrap";
import SpeciesIMG from "../assets/speices.jpg";

const SpeciesComp = () => {
    const {handleSearchTermChange, searchTerm, modalOpen, setModalOpen, toggleModal} = useContext(StarwarsContext)
    const [selectedSpecies, setSelectedSpecies] = useState(null);
    const [species, setSpecies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const handleButtonClick = (people) => {
        setSelectedSpecies(people);
        setModalOpen(true);
    };
    const getAllSpecies = async () => {
        const allSpecies = await getSpecies();
        setSpecies(allSpecies.results)

        if (allSpecies.length > 0) {
            setIsLoading(false)
        }
    }
    console.log(species)

    useEffect(() => {
        getAllSpecies()
    }, []);
    const filteredSpecies = species.filter(people =>
        people.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(filteredSpecies)

    console.log("speciessss", filteredSpecies)
    return (
        <>

        <div>
            <motion.div className={"input-style "}>
                <motion.input type="text" placeholder="Search Species..." value={searchTerm}
                              onChange={handleSearchTermChange}/>
            </motion.div>
            <div className="container mt-5">
                <div className="row">
                    {filteredSpecies?.map((specie) => (
                        <div key={specie.url} className={"col-md-4 mb-4"}>
                            <Card className={"card-style-component"}>
                                <Card.Body onClick={() => {
                                    handleButtonClick(specie)
                                }}>
                                    <Card.Title tag="h5">{specie.name}</Card.Title>

                                    <Card.Img
                                        className={"card-img"}
                                        variant="top"
                                        src={SpeciesIMG}
                                    />
                                    <Card.Subtitle tag="h6" className="mb-2 text-muted">
                                        Classification: {specie.classification}
                                    </Card.Subtitle>
                                    <Card.Subtitle tag="h6" className="mb-2 text-muted">
                                        Language:  {specie.language}
                                    </Card.Subtitle>

                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
            <Modal show={modalOpen} toggle={toggleModal} centered>
                {selectedSpecies && (
                    <>
                        <Modal.Header toggle={toggleModal}>
                            <h3>{selectedSpecies.name}</h3>
                        </Modal.Header>
                        <Modal.Body>
                            <img className={"card-img-modal"} src={SpeciesIMG} alt={selectedSpecies.name}/>
                            <p><span>spanAverage Height:</span> {selectedSpecies.average_height}</p>
                            <p><span>Average Lifespan:</span> {selectedSpecies.average_lifespan}</p>
                            <p><span>Classification:</span> {selectedSpecies.classification}</p>
                            <p><span>Designation:</span> {selectedSpecies.designation}</p>
                            <p><span>Language:</span> {selectedSpecies.language}</p>
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

export default SpeciesComp;