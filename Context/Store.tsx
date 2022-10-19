import { useContext, useState, createContext } from "react";
import { Movie } from "../types";

interface Props {
 children: React.ReactNode;
}

interface Props2 {
 movie: Movie | null;
 modal: () => void;
 curentMovie: (movie: Movie) => void;
 showModal: boolean;
 myList: Movie[] | [];
 addToList: (movie: Movie) => void;
removeFromList: (movie: Movie) => void
}

const storeContext = createContext<Props2>({
 movie: null,
 modal: () => {},
 curentMovie: (movie: Movie) => {},
 showModal: false,
 myList: [],
 addToList: (movie: Movie) => {},
removeFromList: (movie: Movie) => {}
});

export const StoreContextProvider = ({
 children,
}: Props) => {
 const [movie, setMovie] = useState<Movie | null>(null);
 const [showModal, setShowModal] = useState<boolean>(false);
//  const [isAdd, setIsAdd] = useState<boolean>(false);
 const [myList, setMyList] = useState<Movie[] | []>([]);

 const currentMovie = (movie: Movie) => {
  setMovie(movie);
    };
    
 const modalShow = () => {
  setShowModal(!showModal);
    };
    
 const addToList = (movie: Movie) => {

      if ( myList.length === 0 ) {
          return setMyList([movie]);
      }
      else {
         setMyList( ( pre ) =>{
            return [...pre, movie];
         } );
      }
   };
   
   const removeFromList = ( movie: Movie ) => {
       setMyList((pre) => {
        return pre.filter(
         (movi) => movi.id !== movie.id
        );
       });
   }
    
 const context = {
  movie: movie,
  modal: modalShow,
  curentMovie: currentMovie,
  showModal: showModal,
  myList: myList,
  addToList: addToList,
   removeFromList: removeFromList
 };

 return (
  <storeContext.Provider value={context}>
   {children}
  </storeContext.Provider>
 );
};

export function useStoreContext() {
 return useContext(storeContext);
}
