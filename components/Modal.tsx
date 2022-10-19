

import Modal from "@mui/material/Modal";
import { useStoreContext } from "../Context/Store";

import ReactPlayer from "react-player/lazy";
import { FaPlay } from "react-icons/fa";
import {
 CheckIcon,
 PlusIcon,
 HandThumbUpIcon,
 SpeakerWaveIcon,
 SpeakerXMarkIcon,
 XMarkIcon,
} from "@heroicons/react/24/outline";
import { Element, Genre, Movie } from "../types";
import { useState, useEffect } from "react";




const ModalPage = () => {

    const {modal, movie, showModal, myList, addToList, removeFromList} = useStoreContext()
    const [trailer, setTrailer] = useState("");
    const [muted, setMuted] = useState(true);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [addedToList, setAddedToList] = useState(false);
    const [movies, setMovies] = useState<Movie[]>([]);


    useEffect(() => {
     if (!movie) return;

     async function fetchMovie() {
      const data = await fetch(
       `https://api.themoviedb.org/3/${
        movie?.media_type === "tv" ? "tv" : "movie"
       }/${movie?.id}?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
       }&language=en-US&append_to_response=videos`
         ).then( ( response ) => response.json() );
         
      if (data?.videos) {
       const index = data.videos.results.findIndex(
        (element: Element) => element.type === "Trailer"
          );
          
       setTrailer(data.videos?.results[index]?.key);
         }
         
      if (data?.genres) {
       setGenres(data.genres);
         }
         
     }

     fetchMovie();
    }, [ movie ] );
    
     useEffect(
      () =>
       setAddedToList(
        myList?.findIndex(
         (result) => result.id === movie?.id
        ) !== -1
       ),
      [myList]
     );

    const handleClose = () => {
        modal()
    }

    const handleAdd = () => {
        if ( movie ) {
            if ( !addedToList ) { 
                addToList( movie );
                setAddedToList(true)
            } else {
                removeFromList( movie );
                setAddedToList(false);
            }
        }
        
        
    }
    return (
     <Modal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-5 left-0 right-0 z-50 mx-auto w-11/12 max-w-3xl overflow-hidden rounded-md "
     >
      <>
       <button
        className="modalButton absolute right-5 top-5 !z-40 h-7 w-7 border-none bg-[#181818] hover:bg-[#181818]"
        onClick={handleClose}
       >
        <XMarkIcon className="h-5 w-5" />
       </button>

       <div className="relative pt-[56.25%]">
        <ReactPlayer
         url={`https://www.youtube.com/watch?v=${trailer}`}
         width="100%"
         height="100%"
         style={{
          position: "absolute",
          top: "0",
          left: "0",
         }}
         playing
         muted={muted}
        />
        <div className="absolute bottom-6 flex w-full items-center justify-between px-10">
         <div className="flex space-x-2">
          <button className="flex items-center gap-x-2 rounded bg-white px-4 text-lg font-bold text-black transition hover:bg-[#e6e6e6]">
           <FaPlay className="h-5 w-5 text-black" />
           Play
          </button>
          <button
           className="modalButton"
           onClick={handleAdd}
          >
           {addedToList ? (
            <CheckIcon className="h-5 w-5" />
           ) : (
            <PlusIcon className="h-5 w-5" />
           )}
          </button>
          <button className="modalButton">
           <HandThumbUpIcon className="h-5 w-5" />
          </button>
         </div>
         <button
          className="modalButton"
          onClick={() => setMuted(!muted)}
         >
          {muted ? (
           <SpeakerWaveIcon className="h-6 w-6" />
          ) : (
           <SpeakerXMarkIcon className="h-6 w-6" />
          )}
         </button>
        </div>
       </div>
       <div className="flex space-x-10 rounded-b-md bg-[#181818] px-8 py-4">
        <div className="space-y-2 text-base">
         <div className="flex items-center space-x-2 text-sm">
          <p className="font-semibold text-green-400">
           {movie?.vote_average && (movie?.vote_average * 10)}% Match
          </p>
          <p className="font-light">
           {movie?.release_date || movie?.first_air_date}
          </p>
          <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
           HD
          </div>
         </div>
         <div className="flex flex-col gap-x-6 gap-y-3 font-light md:flex-row">
          <p className="w-5/6">{movie?.overview}</p>
          <div className="flex flex-col space-y-1 text-sm">
           <div>
            <span className="text-[gray]">Genres:</span>{" "}
            {genres.map((genre) => genre.name).join(", ")}
           </div>

           <div>
            <span className="text-[gray]">
             Original language:
            </span>{" "}
            {movie?.original_language}
           </div>

           <div>
            <span className="text-[gray]">
             Total votes:
            </span>{" "}
            {movie?.vote_count}
           </div>
          </div>
         </div>
        </div>
       </div>
      </>
     </Modal>
    );
};

export default ModalPage