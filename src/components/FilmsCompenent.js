// Import required dependencies and hooks
import React, {useContext, useEffect, useState} from 'react';
import {getFilms} from "../services/StarwarsService";
import {Card} from "react-bootstrap";
import {StarwarsContext} from "../context/Context";


// Creating Film component
const FilmsCompenent = () => {
    // State variable is defined
    const {photos}=useContext(StarwarsContext)
    const [filmss, setFilmss] = useState([]);
    // Function that calls API to get all Films
    const getAllFilms = async () => {
        const allFilms = await getFilms();
        setFilmss(allFilms.results)
    }
    // useEffect that runs startup functions while the component is loading
    useEffect(() => {
        getAllFilms()
    }, []);

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    {filmss?.map((films, index) => (
                        <div key={films.url} className={"col-md-4 mb-5"}>
                            <Card className={"card-style-component"}>
                                <a  href={"https://www.starwars.com/films"} target={"_blank"}>
                                <Card.Body>
                                    <Card.Title tag="h5" className="card-title-fixed">{films.title} </Card.Title>

                                        <Card.Img
                                            className={"card-img card-img-fixed"}
                                            variant="top"
                                            src={photos[index].src}
                                        />
                                </Card.Body>
                                </a>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default FilmsCompenent;