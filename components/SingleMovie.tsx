import { Movie } from "../types";
import Image from "next/image";
import { useStoreContext } from "../Context/Store";

interface Props {
 movie: Movie;
}

const SingleMovie = ( { movie }: Props ) => {
    
    const {modal, curentMovie} = useStoreContext()

     const handleMovieClick = () => {
       curentMovie(movie);
       modal();
      }
    
 return (
  <div
   className={`relative h-24 min-w-[160px] cursor-pointer transition duration-200 ease-out md:h-28 md:min-w-[180px] lg:h-32 lg:min-w-[200px] md:hover:scale-105`}
   onClick={handleMovieClick}
  >
   <Image
    src={`https://image.tmdb.org/t/p/w500${
     movie.backdrop_path || movie.poster_path
    }`}
    className="rounded-sm object-cover md:rounded"
    layout="fill"
   />
  </div>
 );
};

export default SingleMovie;
