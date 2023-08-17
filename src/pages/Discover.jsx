import { useDispatch, useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';



const Discover = () => {
  // console.log(genres);

    const dispatch = useDispatch(); // adding what we want to selector, do something to the state

    const { activeSong, isPlaying } = useSelector((state) => state.player); // this properties can be find in playerSlice.js

    const { data, isFetching, error } = useGetTopChartsQuery();
  
    // console.log(data);

    if(isFetching)
        return <Loader title="Songs are loading..."/>
  
    if(error)
        return <Error title="Something went wrong!"/>

    const genreTitle = 'Pop';
  
    return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
        <select
          onChange={() => {

          }}
          value=""
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5">
          {genres.map(
            (genre) => (
              <option key={genre.value} value={genre.title}>
                {genre.title}
              </option>
            ),
          )}
        </select>
      </div>
        <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
            {data?.map((song, i) => (
                <SongCard 
                key={song.key}
                song={song}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={data}
                i = {i} />
            ))}
        </div>
    </div>
  );
};

export default Discover;
