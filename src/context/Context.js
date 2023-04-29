// Import required dependencies and hooks
import React, {createContext, useState} from 'react';
import FilmsIMG1 from "../assets/films/starwars1.jpg";
import FilmsIMG2 from "../assets/films/starwars2.jpg";
import FilmsIMG3 from "../assets/films/starwars3.jpg";
import FilmsIMG4 from "../assets/films/starwars4.jpg";
import FilmsIMG5 from "../assets/films/starwars5.jpg";
import FilmsIMG6 from "../assets/films/starwars6.jpg";
import {getVehicles} from "../services/StarwarsService";

// Create the StarwarsContext using createContext() from React
export const StarwarsContext=createContext()

const photos = [
    {id: 1, src: `${FilmsIMG1}`},
    {id: 2, src: `${FilmsIMG2}`},
    {id: 3, src: `${FilmsIMG3}`},
    {id: 4, src: `${FilmsIMG4}`},
    {id: 5, src: `${FilmsIMG5}`},
    {id: 6, src: `${FilmsIMG6}`}
];


// Define the StarwarsContextProvider component
const StarwarsContextProvider = ({children}) => {




    // Initialize state variables using useState()
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [totalResults, setTotalResults] = useState(0);
    const [loadedResults, setLoadedResults] = useState(0);

    const [selectedItem, setSelectedItem] = useState(null);
    const [item, setItem] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImg, setSelectedImg] = useState("");


    // Define a function to handle changes in the search term input field
    const handleSearchTermChange = event => {
        setSearchTerm(event.target.value);
    };
    // function used to filter when searching the input field

    const disableLoadMore = loadedResults >= totalResults;
    // Function that will run when the user clicks on a character
    const handleButtonClick = (item, img = null) => {
        setSelectedItem(item);
        if (img) {
            setSelectedImg(img);
        }
        setModalOpen(true);
    };


    // Function that calls API to get all vehicles
    const getMoreData = async (getServiceData) => {
        setIsLoading(true);
        try {
            const currentPage = Math.ceil(loadedResults / 10);
            const data = await getServiceData(currentPage + 1, 10);
            setItem([...item, ...data.results]);
            setTotalResults(data.count);
            setLoadedResults(loadedResults + data.results.length);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Function used to initially retrieve character data
    const getInitialData = async (getServiceData) => {
        setIsLoading(true);
        try {
            const data = await getServiceData(1, 10);
            setItem(data.results);
            setTotalResults(data.count);
            setLoadedResults(data.results.length);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    // Return the StarwarsContext.Provider component with required values

    const filteredItems = item.filter(starship =>
        starship.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (

    <StarwarsContext.Provider value={{filteredItems,photos,selectedImg,setSelectedImg,getInitialData,getMoreData,handleButtonClick,setSelectedItem,selectedItem,isLoading,setIsLoading,disableLoadMore,handleSearchTermChange,modalOpen,setModalOpen,totalResults,setTotalResults,loadedResults,setLoadedResults,searchTerm}}>
        {children}
    </StarwarsContext.Provider>
    );
};

// Export the StarwarsContextProvider component
export default StarwarsContextProvider;
