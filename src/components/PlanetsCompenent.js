// Import required dependencies and hooks
import React, {useContext, useEffect, useState} from 'react';
import {StarwarsContext} from "../context/Context";
import {motion} from "framer-motion";
import { getPlanets} from "../services/StarwarsService";
import {Card, Button, Modal} from "react-bootstrap";
import PlanetIMG from "../assets/home/planets.jpg";
// Creating Planet component

const PlanetsCompenent = () => {
    // Getting variables and functions from context
    const {handleSearchTermChange, searchTerm, modalOpen, setModalOpen,totalResults,setTotalResults,loadedResults,setLoadedResults} = useContext(StarwarsContext)

    // State variables are defined
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [planets, setPlanets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Function that will run when the user clicks on a planet
    const handleButtonClick = (people) => {
        setSelectedPlanet(people);
        setModalOpen(true);
    };

    // Function that calls API to get all planets
    const getAllPlanets = async () => {
        setIsLoading(true);
        try {
            const currentPage = Math.ceil(loadedResults / 10);
            const data = await getPlanets(currentPage + 1, 10);
            setPlanets([...planets, ...data.results]);
            setTotalResults(data.count);
            setLoadedResults(loadedResults + data.results.length);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    // Function used to initially retrieve planet data
    const getInitialPlanetsData = async () => {
        setIsLoading(true);
        try {
            const data = await getPlanets(1, 10);
            setPlanets(data.results);
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
        getInitialPlanetsData();
        return () => handleSearchTermChange({ target: { value: '' } });

    }, []);

    // Condition used to disable loading more results
    const disableLoadMore = loadedResults >= totalResults;

    // function used to filter when searching the input field
    const filteredPlanets = planets.filter(planet =>
        planet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
                <div className="container mt-5">
                    <div className="row">
                        <motion.div className={"input-style "}>
                            <motion.input type="text" placeholder="Search Planets..." value={searchTerm}
                                          onChange={handleSearchTermChange}/>
                        </motion.div>
                        {filteredPlanets?.map((planet) => (
                            <div key={planet.url} className={"col-md-4 mb-4"}>
                                <Card className={"card-style-component"} >
                                    <Card.Body onClick={() => {
                                        handleButtonClick(planet)
                                    }}>
                                        <Card.Title tag="h5">{planet.name} className="card-title-fixed"</Card.Title>

                                        <Card.Img
                                            className={"card-img card-img-fixed"}
                                            variant="top"
                                            src={PlanetIMG}
                                        />
                                        <Card.Subtitle tag="h6" className="mb-4 text-muted">
                                            <span>Climate :</span> {planet.climate}
                                        </Card.Subtitle>
                                        <Card.Subtitle tag="h6" className="mb-4 text-muted">
                                           <span>Population :</span>  {planet.population}
                                        </Card.Subtitle>
                                        <Card.Subtitle tag="h6" className="mb-4 text-muted">
                                            <span>Gravity :</span> {planet.gravity}
                                        </Card.Subtitle>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <Button variant="primary" onClick={getAllPlanets} disabled={disableLoadMore || isLoading}>
                            {isLoading ? 'Loading...' : 'Load More'}
                        </Button>
                    </div>
                </div>
            <Modal show={modalOpen} centered>
                {selectedPlanet && (
                    <>
                        <Modal.Header className="justify-content-center">
                            <h3>{selectedPlanet.name}</h3>
                        </Modal.Header>
                        <Modal.Body>
                            <img className={"card-img-modal"} src={PlanetIMG} alt={selectedPlanet.name}/>
                            <p><span>Climate:</span> {selectedPlanet.climate}</p>
                            <p><span>Diameter:</span> {selectedPlanet.diameter}</p>
                            <p><span>Gravity</span> {selectedPlanet.gravity}</p>
                            <p><span>Orbital Period:</span> {selectedPlanet.orbital_period}</p>
                            <p><span>Surface Water</span> {selectedPlanet.surface_water}</p>
                            <p><span>Rotation Per</span> {selectedPlanet.rotation_period}</p>

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

export default PlanetsCompenent;