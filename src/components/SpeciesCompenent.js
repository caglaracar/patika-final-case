import React, {useContext, useEffect, useState} from 'react';
import {StarwarsContext} from "../context/Context";
import {motion} from "framer-motion";
import {getSpecies} from "../services/StarwarsService";
import {Card, Button, Modal} from "react-bootstrap";
import SpeciesIMG from "../assets/home/speices.jpg";

const SpeciesCompenent = () => {
    const {handleSearchTermChange, searchTerm, modalOpen, setModalOpen,totalResults,setTotalResults,loadedResults,setLoadedResults} = useContext(StarwarsContext)
    const [selectedSpecies, setSelectedSpecies] = useState(null);
    const [species, setSpecies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const handleButtonClick = (people) => {
        setSelectedSpecies(people);
        setModalOpen(true);
    };
    const getAllSpecies = async () => {
        setIsLoading(true);
        try {
            const currentPage = Math.ceil(loadedResults / 10);
            const data = await getSpecies(currentPage + 1, 10);
            setSpecies([...species, ...data.results]);
            setTotalResults(data.count);
            setLoadedResults(loadedResults + data.results.length);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const getInitialSpeciesData = async () => {
        setIsLoading(true);
        try {
            const data = await getSpecies(1, 10);
            setSpecies(data.results);
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
        getInitialSpeciesData();
        return () => handleSearchTermChange({ target: { value: '' } });

    }, []);
    const filteredSpecies = species.filter(people =>
        people.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(filteredSpecies)

    console.log("speciessss", filteredSpecies)
    return (
        <>


            <div className="container mt-5">
                <div className="row">
                    <motion.div className={"input-style "}>
                        <motion.input type="text" placeholder="Search Species..." value={searchTerm}
                                      onChange={handleSearchTermChange}/>
                    </motion.div>
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
                                      <span>Classification :</span>   {specie.classification}
                                    </Card.Subtitle>
                                    <Card.Subtitle tag="h6" className="mb-2 text-muted">
                                        <span>Language :</span>  {specie.language}
                                    </Card.Subtitle>

                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
                <div className="text-center">
                    <Button variant="primary" onClick={getAllSpecies} disabled={disableLoadMore || isLoading}>
                        {isLoading ? 'Loading...' : 'Load More'}
                    </Button>
                </div>

            </div>

            <Modal show={modalOpen} centered>
                {selectedSpecies && (
                    <>
                        <Modal.Header className="justify-content-center">
                            <h3>{selectedSpecies.name}</h3>
                        </Modal.Header>
                        <Modal.Body>
                            <img className={"card-img-modal"} src={SpeciesIMG} alt={selectedSpecies.name}/>
                            <p><span>Average Height:</span> {selectedSpecies.average_height}</p>
                            <p><span>Average Lifespan:</span> {selectedSpecies.average_lifespan}</p>
                            <p><span>Classification:</span> {selectedSpecies.classification}</p>
                            <p><span>Designation:</span> {selectedSpecies.designation}</p>
                            <p><span>Language:</span> {selectedSpecies.language}</p>
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