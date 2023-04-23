import React, {useContext, useEffect, useState} from 'react';
import {StarwarsContext} from "../context/Context";
import {motion} from "framer-motion";
import {getFilms} from "../services/StarwarsService";
import {Button, Card, CardBody, CardSubtitle, CardTitle, Modal, ModalBody, ModalHeader} from "reactstrap";

const FilmsComp = () => {
    const{handleSearchTermChange,searchTerm,modalOpen,setModalOpen,toggleModal}= useContext(StarwarsContext)
    const [selectedFilms, setSelectedFilms] = useState(null);
    const [filmss, setFilmss] = useState([]);
    const [isLoading,setIsLoading]=useState(true);


    const handleButtonClick = (film) => {
        setSelectedFilms(film);
        setModalOpen(true);
    };
    const getAllFilms= async ()=>{
        const allFilms= await getFilms();
        setFilmss(allFilms.results)

        if(allFilms.results.length>0){
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        getAllFilms()
    },[]);
    const filterFilms = filmss.filter(film =>
        film.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log("filteredFilms",filterFilms)
    return (
        <>
            <motion.div className={"booklist-input-style "}>
                <motion.input type="text" placeholder="Search Films..."  value={searchTerm} onChange={handleSearchTermChange} />
            </motion.div>
            {filterFilms?.map((films) => (
                <div key={films.url} className={"XXX"}>
                    <Card className={"card-style"}>
                        <CardBody>
                            <CardTitle tag="h5">{films.name}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">
                                film: {films.title}
                            </CardSubtitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">
                                Release Date: {films.release_date}
                            </CardSubtitle>
                            <Button onClick={() => handleButtonClick(films)}>Select</Button>
                        </CardBody>
                    </Card>
                </div>
            ))}
            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalBody>
                    {selectedFilms && (
                        <>
                            <ModalHeader toggle={toggleModal}> <h3>{selectedFilms.title}</h3></ModalHeader>

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
        </>
    );
};

export default FilmsComp;