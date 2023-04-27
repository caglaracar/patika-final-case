import React, {useContext, useEffect, useState} from "react";
import {StarwarsContext} from "../context/Context";
import {getStarships} from "../services/StarwarsService";
import {motion} from "framer-motion";
import StarshipIMG from '../assets/home/starship.jpg'
import {Button, Card, Modal} from "react-bootstrap";
import starshipIMGs from '../JSON/starshipphoto.json';
const StarshipCard = () => {
    const {handleSearchTermChange, searchTerm, modalOpen, setModalOpen,totalResults,setTotalResults,loadedResults,setLoadedResults} = useContext(StarwarsContext)
    const [selectedStarship, setSelectedStarship] = useState(null);
    const [starships, setStarships] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImg,setSelectedImg]=useState("");

    const handleButtonClick = (starship,img) => {
        setSelectedStarship(starship);
        setSelectedImg(img);

        setModalOpen(true);
    };
    const getStarshipsData = async () => {
        setIsLoading(true);
        try {
            const currentPage = Math.ceil(loadedResults / 10);
            const data = await getStarships(currentPage + 1, 10);
            setStarships([...starships, ...data.results]);
            setTotalResults(data.count);
            setLoadedResults(loadedResults + data.results.length);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const getInitialStarshipsData = async () => {
        setIsLoading(true);
        try {
            const data = await getStarships(1, 10);
            setStarships(data.results);
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
        getInitialStarshipsData();
        return () => handleSearchTermChange({ target: { value: '' } });
    }, []);

    const filteredStarships = starships.filter(starship =>
        starship.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(starships   )
    return (
        <>

            <div className="container mt-5">
                <div className="row">
                    <motion.div className={"input-style"}>
                        <motion.input type="text" placeholder="Search starships..." value={searchTerm}
                                      onChange={handleSearchTermChange}/>
                    </motion.div>
                    {filteredStarships?.map((starship,index) => (
                        <div key={starship.url} className={"col-md-4 mb-4"}>
                            <Card className={"card-style-component"}>
                                <Card.Body onClick={() => {
                                    handleButtonClick(starship,starshipIMGs[index].img)
                                }}>
                                    <Card.Title tag="h5">{starship.name}</Card.Title>
                                    <Card.Img className={"card-img"} variant="top" src={starshipIMGs[index].img}/>
                                    <Card.Subtitle tag="h6" className="mb-2 text-muted">
                                        <span>Model :</span> {starship.model}
                                    </Card.Subtitle>
                                    <Card.Subtitle tag="h6" className="mb-2 text-muted">
                                        <span>Hyperdrive Rating :</span> {starship.hyperdrive_rating}
                                    </Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
                <div className="text-center">
                    <Button className={"loadmore-button"} variant="primary" onClick={getStarshipsData} disabled={disableLoadMore || isLoading}>
                        {isLoading ? 'Loading...' : 'Load More'}
                    </Button>
                </div>
            </div>
            {selectedStarship && (
                <Modal show={modalOpen} centered>
                    <Modal.Header  className="justify-content-center">
                        <h3>{selectedStarship.name}</h3>
                    </Modal.Header>
                    <Modal.Body>
                        <img className={"card-img-modal"} src={selectedImg} alt={selectedStarship.name}/>
                        <p><span>Model: </span> {selectedStarship.model}</p>
                        <p><span>Hyperdrive Rating:</span> {selectedStarship.hyperdrive_rating}</p>
                        <p><span>Passengers: </span>{selectedStarship.passengers}</p>
                        <p><span>Max Atmosphering Speed:</span> {selectedStarship.max_atmosphering_speed}</p>
                        <p><span>Manufacturer:</span> {selectedStarship?.manufacturer}</p>
                        <p><span>Crew: </span>{selectedStarship.crew}</p>
                        <p><span>Cargo Capacity:</span> {selectedStarship.cargo_capacity}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button  className="close-button-centered" onClick={() => {
                            setModalOpen(false)
                        }}>Close</Button>
                    </Modal.Footer>
                </Modal>

            )
            }
        </>

    );

};

export default StarshipCard;
