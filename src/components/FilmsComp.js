import React, {useContext, useEffect, useState} from 'react';
import {StarwarsContext} from "../context/Context";
import {getFilms} from "../services/StarwarsService";
import {Card, Button, Modal} from "react-bootstrap";
import FilmsIMG1 from "../assets/films/starwars1.jpg";
import FilmsIMG2 from "../assets/films/starwars2.jpg";
import FilmsIMG3 from "../assets/films/starwars3.jpg";
import FilmsIMG4 from "../assets/films/starwars4.jpg";
import FilmsIMG5 from "../assets/films/starwars5.jpg";
import FilmsIMG6 from "../assets/films/starwars6.jpg";


const FilmsComp = () => {

    const photos = [
        {id: 1, src: `${FilmsIMG1}`},
        {id: 2, src: `${FilmsIMG2}`},
        {id: 3, src: `${FilmsIMG3}`},
        {id: 4, src: `${FilmsIMG4}`},
        {id: 5, src: `${FilmsIMG5}`},
        {id: 6, src: `${FilmsIMG6}`}
    ];
    const {handleSearchTermChange, searchTerm, modalOpen, setModalOpen, toggleModal} = useContext(StarwarsContext)
    const [selectedFilms, setSelectedFilms] = useState(null);
    const [filmss, setFilmss] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const handleButtonClick = (film) => {
        setSelectedFilms(film);
        setModalOpen(true);
    };
    const getAllFilms = async () => {
        const allFilms = await getFilms();
        setFilmss(allFilms.results)

        if (allFilms.results.length > 0) {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        getAllFilms()
    }, []);
    const filterFilms = filmss.filter(film =>
        film.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>

            <div className="container mt-5">
                <div className="row">
                    {filterFilms?.map((films, index) => (
                        <div key={films.url} className={"col-md-4 mb-5"}>
                            <Card className={"card-style-component"}>
                                <a  href={"https://www.starwars.com/films"} target={"_blank"}>

                                <Card.Body>
                                    <Card.Title tag="h5">{films.title}</Card.Title>

                                        <Card.Img
                                            className={"card-img"}
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

export default FilmsComp;