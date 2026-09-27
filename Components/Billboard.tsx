import React, { useState, useEffect, useRef } from 'react';
import useBillboard from '@/hooks/useBillboard';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import PlayButton from '@/Components/PlayButton';
import useInfoModal from '@/hooks/useInfoModal';

const Billboard = () => {
  const { data } = useBillboard();
  const [index, setIndex] = useState(0);
  const { openModal } = useInfoModal();
  const videoRef = useRef<HTMLVideoElement>(null);

  const movies = Array.isArray(data) ? data : (data ? [data] : []);

  useEffect(() => {
    if (movies.length > 0) {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % movies.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [movies.length]);

  const movie = movies[index] || movies[0];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        // Handle browser autoplay policy gracefully
      });
    }
  }, [index, movie?.videoUrl]);

  if (!movie) {
    return <div className="h-[56.25vw] bg-zinc-900 animate-pulse" />;
  }

  return (
    <div className="relative h-[56.25vw] bg-zinc-900">
      {/* Fallback image layer so hero is never black */}
      <img
        src={movie.thumbnailUrl}
        alt={movie.title}
        className="w-full h-[56.25vw] object-cover brightness-[60%] absolute top-0 left-0"
      />

      {/* Auto-playing hero video */}
      <video 
        ref={videoRef}
        key={movie.id || index}
        className="w-full h-[56.25vw] object-cover brightness-[60%] relative z-10 transition duration-1000"
        autoPlay 
        muted 
        playsInline
        loop 
        poster={movie.thumbnailUrl} 
        src={movie.videoUrl} 
      />

      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16 z-20">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {movie.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl line-clamp-3">
          {movie.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={movie.id} />
          <button
            onClick={() => openModal(movie.id)}
            className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition"
          >
            <AiOutlineInfoCircle className="mr-1" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
