import React, {useContext, useEffect, useState} from 'react';
import {StarwarsContext} from "../context/Context";
import {motion} from "framer-motion";
import {getPeople} from "../services/StarwarsService";
import {Card, Button, Modal} from "react-bootstrap";
import CharacterIMG from "../assets/characters.jpg";


const PeopleComp = () => {
    const {handleSearchTermChange, searchTerm, modalOpen, setModalOpen, toggleModal,totalResults,setTotalResults,loadedResults,setLoadedResults} = useContext(StarwarsContext)
    const [selectedPeople, setSelectedPeople] = useState(null);
    const [people, setPeople] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const handleButtonClick = (people) => {
        setSelectedPeople(people);
        setModalOpen(true);
    };
    const getAllPeople = async () => {
        setIsLoading(true);
        try {
            const currentPage = Math.ceil(loadedResults / 10);
            const data = await getPeople(currentPage + 1, 10);
            setPeople([...people, ...data.results]);
            setTotalResults(data.count);
            setLoadedResults(loadedResults + data.results.length);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const getInitialPeopleData = async () => {
        setIsLoading(true);
        try {
            const data = await getPeople(1, 10);
            setPeople(data.results);
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
        getInitialPeopleData();
        return () => handleSearchTermChange({ target: { value: '' } });

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
                                            <span>Birth Year :</span>{people.birth_year}
                                        </Card.Subtitle>
                                        <Card.Subtitle tag="h6" className="mb-2 text-muted">
                                            <span>Height :</span>  {people.height}
                                        </Card.Subtitle>

                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <Button variant="primary" onClick={getAllPeople} disabled={disableLoadMore || isLoading}>
                            {isLoading ? 'Loading...' : 'Load More'}
                        </Button>
                    </div>
                </div>
            </div>
            <Modal show={modalOpen} toggle={toggleModal} centered>
                {selectedPeople && (
                    <>
                        <Modal.Header toggle={toggleModal} className="justify-content-center">
                            <h3>{selectedPeople.name}</h3>
                        </Modal.Header>
                        <Modal.Body>
                            <img className={"card-img-modal"} src={CharacterIMG} alt={selectedPeople.name}/>
                            <p><span>Birth Year:</span> {selectedPeople.birth_year}</p>
                            <p><span>Eye Color:</span> {selectedPeople.eye_color}</p>
                            <p><span>Gender:</span> {selectedPeople.gender}</p>
                            <p><span>Hair Color: </span>{selectedPeople.hair_color}</p>
                            <p><span>Mass:</span> {selectedPeople.mass}</p>
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

export default PeopleComp;