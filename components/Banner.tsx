import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../baseUrl';
import { Movie } from '../types';
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { FaPlay } from 'react-icons/fa'
import { useStoreContext } from '../Context/Store';

interface Props {
    netflixOriginals: Movie[];
}

const Banner = ( { netflixOriginals }: Props ) => {
  const {modal, curentMovie} = useStoreContext()
    
    const [ random, setRandom ] = useState<Movie | null>( null )
    
    useEffect( () => {
        const randomNo = Math.floor( Math.random() * netflixOriginals.length )
        setRandom(netflixOriginals[randomNo])
    }, [] )
  
  const handleMovieClick = () => {
    if ( random ) {
      modal();
      curentMovie( random )
    }
  }

  return (
   <div className="flex flex-col space-y-2 py-10 md:pt-14 md:space-y-2 lg:h-[65vh] lg:justify-end lg:pb-6">
    <div className="absolute top-0 left-0 h-[95vh] w-screen -z-10">
     <Image
      src={`${baseUrl}${
       random?.backdrop_path || random?.poster_path
      }`}
      layout="fill"
      objectFit="cover"
          className="-z-10"
     />
    </div>
    <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
     {random?.title}
    </h1>
    <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-base lg:max-w-2xl lg:text-lg">
     {random?.overview}
    </p>
    <div className="flex space-x-3 md:max-h-[65vh]">
     <button className="banner-btn bg-white text-black">
      <FaPlay className="h-3 w-3 text-black md:h-6 md:w-6" />
      Play
     </button>
     <button
      className="banner-btn bg-[gray]/70"
      onClick={handleMovieClick}
     >
      <InformationCircleIcon className="h-4 w-4 md:h-7 md:w-7" />
      More Info
     </button>
    </div>
   </div>
  );
}

export default Banner