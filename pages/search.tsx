import { useState, useEffect } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { getNewLeagueData } from '@/utils/firebase-requests';
import Layout from '@/components/layout';

const Search = ({ data }: { data: any }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searcher = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const fuse = new Fuse(data, { keys: ['name'] });

  useEffect(() => {
    setSearchResults(fuse.search(searchTerm));
  }, [searchTerm]);

  return (
    <Layout>
      <div className="flex flex-col items-center h-full py-12 my-10">
        <h1 className="my-8 text-xl">Search leagues</h1>
        <input
          onChange={searcher}
          value={searchTerm}
          placeholder="Search leagues"
          className="px-4 py-2 border-2 border-blue-500 rounded-md"
        />
        <div className="flex flex-col items-start px-10 py-4 mt-10 bg-white rounded-md w-80">
          {searchResults
            && searchResults.map((result) => (
              <div
                key={result.item.slug}
                className="mb-4 text-lg text-blue-700"
              >
                <Link href={`/league/${result.item.slug}`}>
                  {result.item.name}
                </Link>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const data = await getNewLeagueData();

  return {
    props: {
      data,
    },
  };
};

export default Search;
