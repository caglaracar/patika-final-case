import React, {useContext, useEffect, useState} from 'react';
import {StarwarsContext} from "../context/Context";
import {motion} from "framer-motion";
import {getFilms, getPeople} from "../services/StarwarsService";
import {Button, Card, CardBody, CardSubtitle, CardTitle, Modal, ModalBody, ModalHeader} from "reactstrap";

const PeopleComp = () => {
    const{handleSearchTermChange,searchTerm,modalOpen,setModalOpen,toggleModal}= useContext(StarwarsContext)
    const [selectedPeople, setSelectedPeople] = useState(null);
    const [people, setPeople] = useState([]);
    const [isLoading,setIsLoading]=useState(true);


    const handleButtonClick = (people) => {
        setSelectedPeople(people);
        setModalOpen(true);
    };
    const getAllPeople= async ()=>{
        const allPeople= await getPeople();
        setPeople(allPeople.results)

        if(allPeople.length>0){
            setIsLoading(false)
        }
    }
    console.log(people)

    useEffect(()=>{
        getAllPeople()
    },[]);
    const filterPeople = people.filter(people =>
        people.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log("filteredFilms",filterPeople)
    return (
        <div>
            <motion.div className={"booklist-input-style "}>
                <motion.input type="text" placeholder="Search People..." value={searchTerm}
                              onChange={handleSearchTermChange}/>
            </motion.div>
            {filterPeople?.map((people) => (
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
                    {selectedPeople && (
                        <>
                            <ModalHeader toggle={toggleModal}> <h3>{selectedPeople.name}</h3></ModalHeader>

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

export default PeopleComp;