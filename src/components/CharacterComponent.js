// Import required dependencies and hooks
import React, {useContext, useEffect, useState} from 'react';
import {StarwarsContext} from "../context/Context";
import {motion} from "framer-motion";
import {getPeople} from "../services/StarwarsService";
import {Card, Button, Modal} from "react-bootstrap";
import axios from "axios";

// Creating character component
const CharacterComponent = () => {
    // Getting variables and functions from context
    const {handleButtonClick,selectedImg,filteredItems, getInitialData, getMoreData, disableLoadMore, handleSearchTermChange, searchTerm, modalOpen, setModalOpen, isLoading, selectedItem} = useContext(StarwarsContext)

    const [peopleImg, setPeopleImg] = useState([]);
    // Function used to get character images
    const getPeopleImg = async () => {
        const {data} = await axios.get("https://akabab.github.io/starwars-api/api/all.json");
        if (data.length > 0) {
            setPeopleImg(data)
        }
    }
    // useEffect that runs startup functions while the component is loading
    useEffect(() => {
        getInitialData(getPeople);
        getPeopleImg();
        // Cleanup function to run when removing the component
        return () => {
            handleSearchTermChange({target: {value: ''}});

        }
    }, []);

    return (
        <>
            <div>
                <div className="container mt-5">
                    <div className="row">
                        <motion.div className={"input-style "}>
                            <motion.input type="text" placeholder="Search People..." value={searchTerm}
                                          onChange={handleSearchTermChange}/>
                        </motion.div>
                        {filteredItems?.map((people, index) => (
                            <div key={people.url} className={"col-md-4 mb-4"}>
                                <Card className={"card-style-component"}>
                                    <Card.Body onClick={() => {
                                        handleButtonClick(people, peopleImg[index]?.image)
                                    }}>
                                        <Card.Title tag="h5" className="card-title-fixed">{people.name}</Card.Title>

                                        <Card.Img
                                            className={"card-img card-img-fixed"}
                                            variant="top"
                                            src={peopleImg[index]?.image}
                                        />
                                        <Card.Subtitle tag="h6" className="mb-4 text-muted">
                                            <span>Birth Year :</span>{people.birth_year}
                                        </Card.Subtitle>
                                        <Card.Subtitle tag="h6" className="mb-4 text-muted">
                                            <span>Height :</span> {people.height}
                                        </Card.Subtitle>

                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <Button variant="primary" onClick={()=>{getMoreData(getPeople)}} disabled={disableLoadMore || isLoading}>
                            {isLoading ? 'Loading...' : 'Load More'}
                        </Button>
                    </div>
                </div>
            </div>
            <Modal show={modalOpen} centered>
                {selectedItem && (
                    <>
                        <Modal.Header className="justify-content-center">
                            <h3>{selectedItem.name}</h3>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedImg ?
                                <img className={"card-img-modal"} src={selectedImg} alt={selectedItem.name}/>
                                : ""
                            }
                            <p><span>Birth Year:</span> {selectedItem.birth_year}</p>
                            <p><span>Eye Color:</span> {selectedItem.eye_color}</p>
                            <p><span>Gender:</span> {selectedItem.gender}</p>
                            <p><span>Hair Color: </span>{selectedItem.hair_color}</p>
                            <p><span>Mass:</span> {selectedItem.mass}</p>
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

export default CharacterComponent;