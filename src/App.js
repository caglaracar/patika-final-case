// Import required dependencies, hooks, and components
import React, {useEffect, useRef} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import './App.css';
import StarwarsContextProvider from './context/Context';
import {MainLayout} from "./layouts/MainLayout";
import Films from "./pages/Films";
import Planets from "./pages/Planets";
import Species from "./pages/Species";
import Starship from "./pages/Starship";
import Home from "./pages/Home";
import People from "./pages/People";
import Vehicle from "./pages/Vehicle";

// Create the router object with route configurations
const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {index: true, element: <Home/>},
            {path: 'home', element: <Home/>},
            {path: 'films', element: <Films/>},
            {path: 'people', element: <People/>},
            {path: 'Planets', element: <Planets/>},
            {path: 'species', element: <Species/>},
            {path: 'starship', element: <Starship/>},
            {path: 'vehicles', element: <Vehicle/>},
        ]
    }
]);

// Define the App functional component
function App() {
    // Initialize a ref for the cursor
    const cursorRef = useRef(null);

    // Define the expandCursor function to expand and shrink the custom cursor
    const expandCursor = () => {
        const cursor = cursorRef.current;
        cursor.classList.add('expand');
        setTimeout(() => {
            cursor.classList.remove('expand');
        }, 500);
    };

    // Use the useEffect hook to add event listeners for custom cursor behavior
    useEffect(() => {
        const cursor = cursorRef.current;

        function moveCursor(e) {
            cursor.style.top = `${e.pageY - 10}px`;
            cursor.style.left = `${e.pageX - 10}px`;
        }

        document.addEventListener('mousemove', moveCursor);
        document.addEventListener('click', expandCursor);

        // Clean up event listeners when the component is unmounted
        return () => {
            document.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('click', expandCursor);
        };
    }, []);

    // Render the component
    return (
        <>
            <StarwarsContextProvider>
                <div className="cursor" ref={cursorRef}></div>
                <RouterProvider router={router}/>
            </StarwarsContextProvider>
        </>
    );
}

// Export the App component
export default App;
