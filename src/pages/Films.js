// Import required dependencies, hooks, and components
import React, { useEffect, useRef, useState } from 'react';
import FilmsCompenent from '../components/FilmsCompenent';
import lottie from 'lottie-web';
import animationData from '../JSON/lightsaberlottie.json';

// Define the Films functional component
const Films = () => {
    // Initialize state variables and a ref
    const [loading, setLoading] = useState(true);
    const animationContainer = useRef(null);

    // Use the useEffect hook to run side effects
    useEffect(() => {
        // Load and play the Lottie animation
        const animation = lottie.loadAnimation({
            container: animationContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData,
        });

        // Set a timeout to stop loading and destroy the animation after 1250ms
        setTimeout(() => {
            setLoading(false);
            animation.destroy();
        }, 1250);

        // Clean up the animation when the component is unmounted
        return () => animation.destroy();
    }, []);

    // Render the component
    return (
        <>
            {/* Render the loading animation if loading is true */}
            {loading ? (
                <div className="loader" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div ref={animationContainer} style={{ width: '20rem', height: '30rem' }}></div>
                </div>
            ) : (
                // Render the FilmsComponent if loading is false
                <FilmsCompenent />
            )}
        </>
    );
};

// Export the Films component
export default Films;
