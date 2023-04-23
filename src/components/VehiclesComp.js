import React, {useContext, useEffect, useState} from 'react';
import {motion} from "framer-motion";
import {StarwarsContext} from "../context/Context";
import {Button, Card, CardBody, CardSubtitle, CardTitle, Modal, ModalBody, ModalHeader} from "reactstrap";
import {getVehicles} from "../services/StarwarsService";



const VehiclesComp = () => {
    const{handleSearchTermChange,searchTerm,modalOpen,setModalOpen,toggleModal}= useContext(StarwarsContext)

    const [selectedVehicles, setSelectedVehicles] = useState(null);

    const handleButtonClick = (vehicles) => {
        setSelectedVehicles(vehicles);
        setModalOpen(true);
    };

    const [vehicles, setVehicles] = useState([]);
    const [isLoading,setIsLoading]=useState(true);

    const allGetVehicles= async ()=>{
        const allVehicles= await getVehicles();
        setVehicles(allVehicles.results)
        if(allVehicles.results.length>0){
            setIsLoading(false)
        }
    }
    useEffect(()=>{
        allGetVehicles()
    },[]);

    const filteredVehicles = vehicles.filter(vehicles =>
        vehicles.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <>
            <motion.div className={"booklist-input-style "}>
                <motion.input type="text" placeholder="Search vehicles..."  value={searchTerm} onChange={handleSearchTermChange} />
            </motion.div>
            {filteredVehicles?.map((vehicles) => (
                <div key={vehicles.url} className={"XXX"}>
                    <Card className={"card-style"}>
                        <CardBody>
                            <CardTitle tag="h5">{vehicles.name}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">
                                Model: {vehicles.model}
                            </CardSubtitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">
                                Hyperdrive Rating: {vehicles.hyperdrive_rating}
                            </CardSubtitle>
                            <Button onClick={() => handleButtonClick(vehicles)}>Select</Button>
                        </CardBody>
                    </Card>
                </div>
            ))}
            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalBody>
                    {selectedVehicles && (
                        <>
                            <ModalHeader toggle={toggleModal}> <h3>{selectedVehicles.name}</h3></ModalHeader>

                            <img src={selectedVehicles.image} alt={selectedVehicles.name} />
                            <p>Model: {selectedVehicles.model}</p>
                            <p>Hyperdrive Rating: {selectedVehicles.hyperdrive_rating}</p>
                            <p>Passengers: {selectedVehicles.passengers}</p>
                            <p>Max Atmosphering Speed: {selectedVehicles.max_atmosphering_speed}</p>
                            <p>Manufacturer: {selectedVehicles?.manufacturer}</p>
                            <p>Crew: {selectedVehicles.crew}</p>
                            <p>Cargo Capacity: {selectedVehicles.cargo_capacity}</p>
                        </>
                    )}
                </ModalBody>
            </Modal>
        </>
    );
};

export default VehiclesComp;