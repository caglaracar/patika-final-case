// Import required dependencies and hooks
import React, {useEffect, useState} from 'react';
import {getFilms} from "../services/StarwarsService";
import {Card} from "react-bootstrap";

import FilmsIMG1 from "../assets/films/starwars1.jpg";
import FilmsIMG2 from "../assets/films/starwars2.jpg";
import FilmsIMG3 from "../assets/films/starwars3.jpg";
import FilmsIMG4 from "../assets/films/starwars4.jpg";
import FilmsIMG5 from "../assets/films/starwars5.jpg";
import FilmsIMG6 from "../assets/films/starwars6.jpg";

const photos = [
    {id: 1, src: `${FilmsIMG1}`},
    {id: 2, src: `${FilmsIMG2}`},
    {id: 3, src: `${FilmsIMG3}`},
    {id: 4, src: `${FilmsIMG4}`},
    {id: 5, src: `${FilmsIMG5}`},
    {id: 6, src: `${FilmsIMG6}`}
];
// Creating Film component
const FilmsCompenent = () => {
    // State variable is defined

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