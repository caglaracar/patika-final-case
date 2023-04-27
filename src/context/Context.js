import React, {createContext, useEffect, useState} from 'react';

export const StarwarsContext=createContext()
const StarwarsContextProvider = ({children}) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [totalResults, setTotalResults] = useState(0);
    const [loadedResults, setLoadedResults] = useState(0);

    const handleSearchTermChange = event => {
        setSearchTerm(event.target.value);
    };


    return (
        <StarwarsContext.Provider value={{handleSearchTermChange,modalOpen,setModalOpen,totalResults,setTotalResults,loadedResults,setLoadedResults,searchTerm}}>
            {children}
        </StarwarsContext.Provider>
    );
};

export default StarwarsContextProvider;