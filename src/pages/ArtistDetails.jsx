import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";


import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";


const ArtistDetails = () => {

    const { id: artistId } = useParams(); // requestParam for BE
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data: artistData, isFetching, error } = useGetArtistDetailsQuery(artistId);

    if(isFetching) return <Loader title="Searching artist details!"/>

    if(error) return <Error title="Something went wrong!"/>

    return (
        <div className="flex flex-col">
            <DetailsHeader artistId={artistId} artistData={artistData} />
    
            <div className="mb-10">
                <h2 className="text-white text-3xl font-bold">
                    Biography:
                </h2>
                <div className="mt-5">
                    <p className="text-gray-400 text-base my-1 text-justify">
                        {artistData.data[0].attributes.artistBio}
                    </p>
                </div>
            </div>


            {/*<RelatedSongs 
                data={Object.values(artistData?.songs)}
                artistId={artistId}
                isPlaying={isPlaying}
                activeSong={activeSong}
            /> */}
        </div>
    );
}

export default ArtistDetails;