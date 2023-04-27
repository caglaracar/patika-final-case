// Import required dependencies and hooks
import React, {useContext, useEffect, useState} from 'react';
import {StarwarsContext} from "../context/Context";
import {motion} from "framer-motion";
import {getSpecies} from "../services/StarwarsService";
import {Card, Button, Modal} from "react-bootstrap";
import SpeciesIMG from '../assets/home/species.jpg'

// Creating species component
const SpeciesCompenent = () => {

    // Getting variables and functions from context
    const {handleSearchTermChange, searchTerm, modalOpen, setModalOpen,totalResults,setTotalResults,loadedResults,setLoadedResults} = useContext(StarwarsContext)

    // State variables are defined
    const [selectedSpecies, setSelectedSpecies] = useState(null);
    const [species, setSpecies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Function that will run when the user clicks on a species
    const handleButtonClick = (species) => {
        setSelectedSpecies(species);
        setModalOpen(true);
    };

    // Function that calls API to get all species
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

    // Function used to initially retrieve species data
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
    // useEffect that runs startup functions while the component is loading
    useEffect(() => {
        getInitialSpeciesData();

        // Cleanup function to run when removing the component
        return () => handleSearchTermChange({ target: { value: '' } });

    }, []);

    // Condition used to disable loading more results
    const disableLoadMore = loadedResults >= totalResults;

    // function used to filter when searching the input field
    const filteredSpecies = species.filter(species =>
        species.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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