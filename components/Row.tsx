
import { Movie } from '../types';
import SingleMovie from './SingleMovie';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useRef, useState } from 'react'

interface Props {
    title: string;
    movies: Movie[]
}

const Row = ({ title, movies }: Props) => {

    const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)

  const handleClick = (direction: string) => {
    setIsMoved(true)
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current

      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

    return (
     <div className="h-40 space-y-1 md:space-y-1">
      <h1 className="w-56 cursor-pointer text-[1.2rem] font-semibold text-[#e5e5e5] transition duration-300 hover:text-white md:text-2xl">
       {title}
      </h1>
      <div className="group relative md:-ml-2">
       <ChevronLeftIcon
        className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
         !isMoved && "hidden"
        }`}
        onClick={() => handleClick("left")}
       />
       <div className="flex items-center space-x-1 overflow-x-scroll scrollbar-hide md:space-x-1.5 md:p-1" ref={rowRef}>
        {movies.map((movie) => (
         <SingleMovie key={movie.id} movie={movie} />
        ))}
       </div>

       <ChevronRightIcon
        className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
        onClick={() => handleClick("right")}
       />
      </div>
     </div>
    );
    
};

export default Row