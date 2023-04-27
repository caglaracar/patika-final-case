import React, {useEffect, useRef, useState} from 'react';
import PeopleComp from '../components/PeopleComp'
import lottie from "lottie-web";
import animationData from "../JSON/lightsaberlottie.json";
import PlanetsComp from "../components/PlanetsComp";

const People = () => {
    const [loading, setLoading] = useState(true);
    const animationContainer = useRef(null);

    useEffect(() => {
        const animation = lottie.loadAnimation({
            container: animationContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData,
        });

        setTimeout(() => {
            setLoading(false);
            animation.destroy();
        }, 1250);

        return () => animation.destroy();
    }, []);



    return (
        <>
            {loading ? (
                <div className="loader" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div ref={animationContainer} style={{ width: '20rem', height: '30rem' }}></div>
                </div>
            ) : (
                <PeopleComp/>
            )}
        </>
    );
};

export default People;