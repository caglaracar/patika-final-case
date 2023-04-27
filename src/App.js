import './App.css';
import StarwarsContextProvider from "./context/Context";
import {MainLayout} from "./layouts/MainLayout";
import Films from "./pages/Films";
import Planets from "./pages/Planets";
import Species from "./pages/Species";
import Starship from "./pages/Starship";
import Vehicles from "./pages/Vehicles";
import Home from "./pages/Home";
import People from "./pages/People";
import LightsaberAUD from './assets/LightsaberSound.mp3'
import {
    BrowserRouter,
    createBrowserRouter, Route,
    RouterProvider, Routes,
} from "react-router-dom";
import {useEffect, useRef} from "react";


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
            {path: 'vehicles', element: <Vehicles/>},
        ]
    }
]);

function App() {
    const cursorRef = useRef(null);

    function expandCursor() {
        const cursor = cursorRef.current;
        cursor.classList.add('expand');

        const audio = new Audio(LightsaberAUD);
        audio.play();

        setTimeout(() => {
            cursor.classList.remove('expand');
        }, 500);
    }

    useEffect(() => {
        const cursor = cursorRef.current;

        function moveCursor(e) {
            cursor.style.top = `${e.pageY - 10}px`;
            cursor.style.left = `${e.pageX - 10}px`;
        }

        document.addEventListener('mousemove', moveCursor);
        document.addEventListener('click', expandCursor);

        return () => {
            document.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('click', expandCursor);
        };
    }, []);

    return (
        <>
            <StarwarsContextProvider>
                <div className="cursor" ref={cursorRef}></div>
                <RouterProvider router={router}/>
            </StarwarsContextProvider>
        </>

    );
}

export default App;
