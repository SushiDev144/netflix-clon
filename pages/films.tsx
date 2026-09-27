import React from 'react';
import Navbar from '@/Components/Navbar';
import MovieList from '@/Components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import InfoModal from '@/Components/InfoModal';
import useInfoModal from '@/hooks/useInfoModal';

export default function Films() {
  const { data: movies = [] } = useMovieList();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <div className="pt-32 pb-40 px-4 md:px-12 space-y-8">
        <h1 className="text-3xl text-white font-bold">Movies & Films</h1>
        <MovieList title="Action & Sci-Fi" data={movies.filter((m: any) => m.genre === 'Action' || m.genre === 'Sci-Fi')} />
        <MovieList title="Drama & Thriller" data={movies.filter((m: any) => m.genre === 'Drama' || m.genre === 'Thriller')} />
      </div>
    </>
  );
}
