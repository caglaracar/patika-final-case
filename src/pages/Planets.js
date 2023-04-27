import React, {useEffect, useRef, useState} from 'react';
import PlanetsCompenent from "../components/PlanetsCompenent";
import lottie from "lottie-web";
import animationData from "../JSON/lightsaberlottie.json";
import FilmsCompenent from "../components/FilmsCompenent";

const Planets = () => {
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
                <PlanetsCompenent/>
            )}
        </>
    );
};

export default Planets;