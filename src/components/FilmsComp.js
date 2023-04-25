import React, {useContext, useEffect, useState} from 'react';
import {StarwarsContext} from "../context/Context";
import {motion} from "framer-motion";
import {getFilms} from "../services/StarwarsService";
import {Card, Button, Modal} from "react-bootstrap";
import FilmsIMG from "../assets/films.jpg";
import FilmsIMG1 from "../assets/starwars1.jpg";
import FilmsIMG2 from "../assets/starwars2.jpg";
import FilmsIMG3 from "../assets/starwars3.jpg";
import FilmsIMG4 from "../assets/starwars4.jpg";
import FilmsIMG5 from "../assets/starwars5.jpg";
import FilmsIMG6 from "../assets/starwars6.jpg";
import {Link} from "@mui/material";


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
            <motion.div className={"input-style"}>
                <motion.input type="text" placeholder="Search Films..." value={searchTerm}
                              onChange={handleSearchTermChange}/>
            </motion.div>
            <div className="container mt-5">
                <div className="row">
                    {filterFilms?.map((films, index) => (
                        <div key={films.url} className={"col-md-4 mb-5"}>
                            <Card className={"card-style-component"}>
                                <a  href={"https://www.starwars.com/films"} target={"_blank"}>

                                <Card.Body>
                                        <Card.Img
                                            className={"card-img"}
                                            variant="top"
                                            src={photos[index].src}
                                        />
                                        <Card.Title tag="h5">{films.name}</Card.Title>
                                        <Card.Subtitle tag="h6" className="mb-2 text-muted">
                                            film: {films.title}
                                        </Card.Subtitle>
                                        <Card.Subtitle tag="h6" className="mb-2 text-muted">
                                            Release Date: {films.release_date}
                                        </Card.Subtitle>
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