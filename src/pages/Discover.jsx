import { useDispatch, useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';
import { selectGenreListId } from '../redux/features/playerSlice';
import { React } from 'react';

const editGenre = (genre) => {
  if(genre === 'Pop') return 'POP'
  else if(genre === 'Hip-Hop') return 'HIP_HOP_RAP'
  else if(genre === 'Dance') return 'DANCE'
  else if(genre === 'Electronic') return 'ELECTRONIC'
  else if(genre === 'Soul') return 'SOUL_RNB'
  else if(genre === 'Rock') return 'ROCK'
  else if(genre === 'Alternative') return 'ALTERNATIVE'
  else if(genre === 'Country') return 'COUNTRY'
  else if(genre === 'Latin') return 'LATIN'
  else if(genre === 'Worldwide') return 'WORLDWIDE'
  else if(genre === 'Reggae') return 'REGGAE_DANCE_HALL'
  else if(genre === 'House') return 'HOUSE'
  else if(genre === 'K-Pop') return 'K_POP'
  else if(genre === 'Film') return 'FILM_TV'
  else return 'POP'
}


const Discover = () => {
  // console.log(genres);

    const dispatch = useDispatch(); // adding what we want to selector, do something to the state (modify it)

    const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player); // this properties can be find in playerSlice.js

    // console.log(genreListId)

    const { data, isFetching, error } = useGetSongsByGenreQuery(editGenre(genreListId));
  
    // console.log(data);

    if(isFetching)
        return <Loader title="Songs are loading..."/>
  
    if(error)
        return <Error title="Something went wrong!"/>

    // const genreTitle = genres.find(({ value }) => value === genreListId)?.title
    // console.log(genreTitle)

    return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreListId}
        </h2>
        <select
          onChange={(e) => {
              dispatch(selectGenreListId(e.target.value))
              console.log('Selected genre id:', e.target.value)
            }
          }
          value={genreListId || 'pop'}
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
