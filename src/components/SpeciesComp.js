import React, {useContext, useEffect, useState} from 'react';
import {StarwarsContext} from "../context/Context";
import {motion} from "framer-motion";
import {getPeople, getSpecies} from "../services/StarwarsService";
import {Button, Card, CardBody, CardSubtitle, CardTitle, Modal, ModalBody, ModalHeader} from "reactstrap";

const SpeciesComp = () => {
    const{handleSearchTermChange,searchTerm,modalOpen,setModalOpen,toggleModal}= useContext(StarwarsContext)
    const [selectedSpecies, setSelectedSpecies] = useState(null);
    const [species, setSpecies] = useState([]);
    const [isLoading,setIsLoading]=useState(true);


    const handleButtonClick = (people) => {
        setSelectedSpecies(people);
        setModalOpen(true);
    };
    const getAllSpecies= async ()=>{
        const allSpecies= await getSpecies();
         setSpecies(allSpecies.results)

        if(allSpecies.length>0){
            setIsLoading(false)
        }
    }
    console.log(species)

    useEffect(()=>{
        getAllSpecies()
    },[]);
    const filteredSpecies = species.filter(people =>
        people.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log("filteredFilms",filteredSpecies)
    return (
        <div>
            <motion.div className={"booklist-input-style "}>
                <motion.input type="text" placeholder="Search Species..." value={searchTerm}
                              onChange={handleSearchTermChange}/>
            </motion.div>
            {filteredSpecies?.map((people) => (
                <div key={people.url} className={"XXX"}>
                    <Card className={"card-style"}>
                        <CardBody>
                            <CardTitle tag="h5">{people.name}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">
                                film: {people.title}
                            </CardSubtitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">
                                Release Date: {people.release_date}
                            </CardSubtitle>
                            <Button onClick={() => handleButtonClick(people)}>Select</Button>
                        </CardBody>
                    </Card>
                </div>
            ))}
            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalBody>
                    {selectedSpecies && (
                        <>
                            <ModalHeader toggle={toggleModal}> <h3>{selectedSpecies.name}</h3></ModalHeader>

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

export default SpeciesComp;