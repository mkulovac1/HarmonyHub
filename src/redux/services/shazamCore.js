import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '887c955a35msh416cb1d9e68654fp1066acjsna2cb3403ad8e');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => 'v1/charts/world',
    }),
    getSongsByGenre: builder.query({
      query: (genre) => `v1/charts/genre-world?genre_code=${genre}`,
    }),
    getSongDetails: builder.query({
      query: (songid) => `v1/tracks/details?track_id=${songid}`,
    }),
    getSongRelated: builder.query({ 
      query: (songid) => `v1/tracks/related?track_id=${songid}`,
    }),
    getArtistDetails: builder.query({ 
      query: (artistId) => `v2/artists/details?artist_id=${artistId}`,
    }),
    getSongsByCountry: builder.query({
      query: (countryCode) => `v1/charts/country?country_code=${countryCode}`,
    })
  }),
});



export const { useGetTopChartsQuery, useGetSongDetailsQuery, useGetSongRelatedQuery, 
               useGetArtistDetailsQuery, useGetSongsByCountryQuery, useGetSongsByGenreQuery } = shazamCoreApi;
