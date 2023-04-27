import React, {createContext, useEffect, useState} from 'react';

export const StarwarsContext=createContext()
const StarwarsContextProvider = ({children}) => {
    const[favoriteBooks,setFavoriteBooks]=useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [likedBooks, setLikedBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleHeartClick = (e, bookId,book) => {
        e.stopPropagation();
        console.log('book',book)
        if (likedBooks.includes(bookId)) {
            setLikedBooks(likedBooks.filter((id) => id !== bookId));
            setFavoriteBooks(favoriteBooks.filter((books)=>books!==book));
        } else {
            setFavoriteBooks((prev)=>[...prev,book])
            setLikedBooks([...likedBooks, bookId]);
        }
    };
    const handleImgClick = (book) => {
        setSelectedBook(book);
        setShowModal(true);
    };
    const handleImgClickWishlist = (book) => {
        const url = book.volumeInfo.previewLink;
        const win = window.open(url, '_blank');
    }
    useEffect(() => {
        const storedFavoriteBooks = JSON.parse(localStorage.getItem("favoriteBooks"));
        if (storedFavoriteBooks && storedFavoriteBooks.length > 0) {
            setFavoriteBooks(storedFavoriteBooks);
            setLikedBooks(storedFavoriteBooks.map(book => book.id));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks));
    }, [favoriteBooks]);


    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const handleSearchTermChange = event => {

        setSearchTerm(event.target.value);

    };

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const [totalResults, setTotalResults] = useState(0);
    const [loadedResults, setLoadedResults] = useState(0);

    return (
        <StarwarsContext.Provider value={{searchTerm,handleSearchTermChange,toggleModal,modalOpen,setModalOpen,totalResults,setTotalResults,loadedResults,setLoadedResults}}>
            {children}
        </StarwarsContext.Provider>
    );
};

export default StarwarsContextProvider;