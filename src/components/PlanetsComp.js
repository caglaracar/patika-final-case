import React, {useContext, useEffect, useState} from 'react';
import {StarwarsContext} from "../context/Context";
import {motion} from "framer-motion";
import {getPlanets, getSpecies} from "../services/StarwarsService";
import {Button, Card, CardBody, CardSubtitle, CardTitle, Modal, ModalBody, ModalHeader} from "reactstrap";

const PlanetsComp = () => {
    const{handleSearchTermChange,searchTerm,modalOpen,setModalOpen,toggleModal}= useContext(StarwarsContext)
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [planet, setPlanet] = useState([]);
    const [isLoading,setIsLoading]=useState(true);


    const handleButtonClick = (people) => {
        setSelectedPlanet(people);
        setModalOpen(true);
    };
    const getAllPlanet= async ()=>{
        const allPlanet= await getPlanets();
        setPlanet(allPlanet.results)

        if(allPlanet.length>0){
            setIsLoading(false)
        }
    }
    console.log(planet)

    useEffect(()=>{
        getAllPlanet()
    },[]);
    const filteredPlanets = planet.filter(planet =>
        planet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log("filteredFilms",filteredPlanets)
    return (
        <div>
            <motion.div className={"booklist-input-style "}>
                <motion.input type="text" placeholder="Search Planets..." value={searchTerm}
                              onChange={handleSearchTermChange}/>
            </motion.div>
            {filteredPlanets?.map((planet) => (
                <div key={planet.url} className={"XXX"}>
                    <Card className={"card-style"}>
                        <CardBody>
                            <CardTitle tag="h5">{planet.name}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">
                                film: {planet.title}
                            </CardSubtitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">
                                Release Date: {planet.release_date}
                            </CardSubtitle>
                            <Button onClick={() => handleButtonClick(planet)}>Select</Button>
                        </CardBody>
                    </Card>
                </div>
            ))}
            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalBody>
                    {selectedPlanet && (
                        <>
                            <ModalHeader toggle={toggleModal}> <h3>{selectedPlanet.name}</h3></ModalHeader>

                            {/*<img src={selectedFilms.image} alt={selectedFilms.name} />*/}
                            {/*<p>Model: {selectedFilms.model}</p>*/}
                            {/*<p>Hyperdrive Rating: {selectedFilms.hyperdrive_rating}</p>*/}
                            {/*<p>Passengers: {selectedFilms.passengers}</p>*/}
                            {/*<p>Max Atmosphering Speed: {selectedFilms.max_atmosphering_speed}</p>*/}
                            {/*<p>Manufacturer: {selectedFilms?.manufacturer}</p>*/}
                            {/*<p>Crew: {selectedFilms.crew}</p>*/}
                            {/*<p>Cargo Capacity: {selectedFilms.cargo_capacity}</p>*/}
                        </>
                    )}
                </ModalBody>
            </Modal>
        </div>
    );
};

export default PlanetsComp;