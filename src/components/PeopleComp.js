import React, {useContext, useEffect, useState} from 'react';
import {StarwarsContext} from "../context/Context";
import {motion} from "framer-motion";
import {getFilms, getPeople} from "../services/StarwarsService";
import {Card, Button, Modal} from "react-bootstrap";
import CharacterIMG from "../assets/characters.jpg";
import VehiclesIMG from "../assets/vehicles.png";


const PeopleComp = () => {
    const {handleSearchTermChange, searchTerm, modalOpen, setModalOpen, toggleModal} = useContext(StarwarsContext)
    const [selectedPeople, setSelectedPeople] = useState(null);
    const [people, setPeople] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const handleButtonClick = (people) => {
        setSelectedPeople(people);
        setModalOpen(true);
    };
    const getAllPeople = async () => {
        const allPeople = await getPeople();
        setPeople(allPeople.results)

        if (allPeople.length > 0) {
            setIsLoading(false)
        }
    }
    console.log("selected people",selectedPeople)

    useEffect(() => {
        getAllPeople()
    }, []);
    const filterPeople = people.filter(people =>
        people.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log("filteredFilms", filterPeople)
    return (
        <>
            <div>

                <div className="container mt-5">

                    <div className="row">
                        <motion.div className={"input-style "}>
                            <motion.input type="text" placeholder="Search People..." value={searchTerm}
                                          onChange={handleSearchTermChange}/>
                        </motion.div>
                        {filterPeople?.map((people) => (
                            <div key={people.url} className={"col-md-4 mb-4"}>
                                <Card className={"card-style-component"}>
                                    <Card.Body onClick={() => {
                                        handleButtonClick(people)
                                    }}>
                                        <Card.Title tag="h5">{people.name}</Card.Title>

                                        <Card.Img
                                            className={"card-img"}
                                            variant="top"
                                            src={CharacterIMG}
                                        />
                                        <Card.Subtitle tag="h6" className="mb-2 text-muted">
                                            Birth Year: {people.birth_year}
                                        </Card.Subtitle>
                                        <Card.Subtitle tag="h6" className="mb-2 text-muted">
                                            Height:  {people.height}
                                        </Card.Subtitle>

                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Modal show={modalOpen} toggle={toggleModal} centered>
                {selectedPeople && (
                    <>
                        <Modal.Header toggle={toggleModal}>
                            <h3>{selectedPeople.name}</h3>
                        </Modal.Header>
                        <Modal.Body>
                            <img className={"card-img-modal"} src={CharacterIMG} alt={selectedPeople.name}/>
                            <p>Birth Year: {selectedPeople.birth_year}</p>
                            <p>Eye Color: {selectedPeople.eye_color}</p>
                            <p>Gender: {selectedPeople.gender}</p>
                            <p>Hair Color: {selectedPeople.hair_color}</p>
                            <p>Mass: {selectedPeople.mass}</p>
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

export default PeopleComp;