import React, {useContext} from 'react';
import {StarwarsContext} from "../context/Context";
import {Button, Card} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


const HomeComp = () => {
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <Card>
                            <Card.Img
                                variant="top"
                                src="https://starwars-visualguide.com/assets/img/placeholder.jpg"
                            />
                            <Card.Body>
                                <Card.Title>Card 1</Card.Title>
                                <Card.Text>
                                    This is a short description of the first card.
                                </Card.Text>
                                <Button variant="primary">Learn More</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-4 mb-4">
                        <Card>
                            <Card.Img
                                variant="top"
                                src="https://starwars-visualguide.com/assets/img/placeholder.jpg"
                            />
                            <Card.Body>
                                <Card.Title>Card 2</Card.Title>
                                <Card.Text>
                                    This is a short description of the second card.
                                </Card.Text>
                                <Button variant="primary">Learn More</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-4 mb-4">
                        <Card>
                            <Card.Img
                                variant="top"
                                src="https://starwars-visualguide.com/assets/img/placeholder.jpg"
                            />
                            <Card.Body>
                                <Card.Title>Card 3</Card.Title>
                                <Card.Text>
                                    This is a short description of the third card.
                                </Card.Text>
                                <Button variant="primary">Learn More</Button>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-md-4 mb-4">
                        <Card>
                            <Card.Img
                                variant="top"
                                src="https://starwars-visualguide.com/assets/img/placeholder.jpg"
                            />
                            <Card.Body>
                                <Card.Title>Card 4</Card.Title>
                                <Card.Text>
                                    This is a short description of the fourth card.
                                </Card.Text>
                                <Button variant="primary">Learn More</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </>

    );
};

export default HomeComp;