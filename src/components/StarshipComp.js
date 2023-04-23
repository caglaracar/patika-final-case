import {useContext, useEffect, useState} from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import {StarwarsContext} from "../context/Context";
import {getStarships} from "../services/StarwarsService";
import {motion} from "framer-motion";


const StarshipCard = () => {
    const{handleSearchTermChange,searchTerm,modalOpen,setModalOpen,toggleModal}= useContext(StarwarsContext)
    const [selectedStarship, setSelectedStarship] = useState(null);

    const handleButtonClick = (starship) => {
        setSelectedStarship(starship);
        setModalOpen(true);
    };



    const [starships, setStarships] = useState([]);
    const [isLoading,setIsLoading]=useState(true);

    const getShips= async ()=>{
        const allStarships= await getStarships();
        if(allStarships.results.length>0){
            setStarships(allStarships.results)
            setIsLoading(false)
        }
    }
    useEffect(()=>{
        getShips()
    },[]);

    const filteredStarships = starships.filter(starship =>
        starship.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log("filteredStarships",filteredStarships)

    return (
        <>
            <motion.div className={"booklist-input-style "}>
                <motion.input type="text" placeholder="Search starships..."  value={searchTerm} onChange={handleSearchTermChange} />
            </motion.div>
            {filteredStarships?.map((starship) => (
                <div key={starship.url} className={"XXX"}>
                    <Card className={"card-style"}>
                        <CardBody>
                            <CardTitle tag="h5">{starship.name}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">
                                Model: {starship.model}
                            </CardSubtitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">
                                Hyperdrive Rating: {starship.hyperdrive_rating}
                            </CardSubtitle>
                            <Button onClick={() => handleButtonClick(starship)}>Select</Button>
                        </CardBody>
                    </Card>
                </div>
            ))}
            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalBody>
                    {selectedStarship && (
                        <>
                            <ModalHeader toggle={toggleModal}> <h3>{selectedStarship.name}</h3></ModalHeader>

                            <img src={selectedStarship.image} alt={selectedStarship.name} />
                            <p>Model: {selectedStarship.model}</p>
                            <p>Hyperdrive Rating: {selectedStarship.hyperdrive_rating}</p>
                            <p>Passengers: {selectedStarship.passengers}</p>
                            <p>Max Atmosphering Speed: {selectedStarship.max_atmosphering_speed}</p>
                            <p>Manufacturer: {selectedStarship?.manufacturer}</p>
                            <p>Crew: {selectedStarship.crew}</p>
                            <p>Cargo Capacity: {selectedStarship.cargo_capacity}</p>
                        </>
                    )}
                </ModalBody>
            </Modal>
        </>
    );
};

export default StarshipCard;
