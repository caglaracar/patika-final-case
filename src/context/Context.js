// Import required dependencies and hooks
import React, {createContext, useState} from 'react';

// Create the StarwarsContext using createContext() from React
export const StarwarsContext=createContext()

// Define the StarwarsContextProvider component
const StarwarsContextProvider = ({children}) => {

    // Initialize state variables using useState()
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [totalResults, setTotalResults] = useState(0);
    const [loadedResults, setLoadedResults] = useState(0);

    // Define a function to handle changes in the search term input field
    const handleSearchTermChange = event => {
        setSearchTerm(event.target.value);
    };

    // Return the StarwarsContext.Provider component with required values
    return (
        <StarwarsContext.Provider value={{handleSearchTermChange,modalOpen,setModalOpen,totalResults,setTotalResults,loadedResults,setLoadedResults,searchTerm}}>
            {children}
        </StarwarsContext.Provider>
    );
};

// Export the StarwarsContextProvider component
export default StarwarsContextProvider;
