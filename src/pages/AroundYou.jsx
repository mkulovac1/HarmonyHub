import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const AroundYou = () => { 
    
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(true);
    const { activeSong, isPlaying } = useSelector((state) => state.player);

    useEffect(() => {
        axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_w6cT61uHl4mmpTRNtpXR9EcZQQi2s`)
        .then((res) => setCountry(res?.data?.location?.country))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false))
    }, [country])

    if(country ==='BA')
        setCountry('HR') // This rapidapi doesn't provide songs for Bosnia and Herzegovina

    const { data, isFetching, error } = useGetSongsByCountryQuery(country);

    if(isFetching && loading) return <Loader title="Loading songs around you" />

    if(error && country)
        return <Error title="Oops! Something went wrong" message="Please try again later" />

    return (
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
                Songs around you
            </h2>

            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map((song, i) => (
                    <SongCard 
                        key={song.key} 
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={data}
                        i={i}
                    />
                ))}
            </div>
        </div>
    )
}

export default AroundYou;
