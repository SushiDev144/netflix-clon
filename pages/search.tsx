import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/Components/Navbar';
import MovieList from '@/Components/MovieList';
import InfoModal from '@/Components/InfoModal';
import useInfoModal from '@/hooks/useInfoModal';
import axios from 'axios';

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState([]);
  const { isOpen, closeModal } = useInfoModal();

  useEffect(() => {
    if (q) {
      axios.get(`/api/search?query=${encodeURIComponent(String(q))}`)
        .then(res => setResults(res.data))
        .catch(console.error);
    }
  }, [q]);

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <div className="pt-32 pb-40 px-4 md:px-12">
        <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">
            Search Results for: <span className="text-zinc-400 font-normal">&quot;{q}&quot;</span>
        </h2>
        {results.length > 0 ? (
          <MovieList title="Matching Movies" data={results} />
        ) : (
          <p className="text-zinc-500">No movies found matching your query.</p>
        )}
      </div>
    </>
  );
}
