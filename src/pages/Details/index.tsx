import React, {useEffect, useState} from 'react';

import {useRoute} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/native';

// @ts-ignore
import {API_KEY} from '@env';

import api from '../../services/api';

import {
  Container,
  ScrollContainer,
  MoviePoster,
  MovieName,
  MovieInfo,
  MovieInfoTitle,
} from './styles';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type RootStackParamList = {
  Home: undefined;
  Details: {id: number; imageBaseURL: ImageBaseURL};
};

interface ImageBaseURL {
  backdrop_sizes: string[];
  poster_sizes: string[];
  base_url: string;
  secure_base_url: string;
  poster_path: string;
}

interface Data {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompanies[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

function Details() {
  const {params}: DetailsScreenRouteProp = useRoute();
  const [details, setDetails] = useState({} as Data);

  useEffect(() => {
    async function getDetails() {
      const response = await api.get(
        `movie/${params.id}?api_key=${API_KEY}&language=en-US`,
      );
      setDetails(response.data);
      console.log(response.data);
    }
    getDetails();
  }, [params]);

  return (
    <ScrollContainer>
      <Container>
        <MoviePoster
          source={{
            uri: `${params.imageBaseURL.secure_base_url}${params.imageBaseURL.poster_sizes[5]}/${details.poster_path}`,
          }}
        />
        <MovieName>
          {details.title}
          {details.tagline !== '' ? `\n${details.tagline}` : ''}
        </MovieName>

        {details.genres && (
          <MovieInfo>
            <MovieInfoTitle>Genres:</MovieInfoTitle>{' '}
            {details.genres.map((genre, index) => {
              return (
                genre.name + (index + 1 < details.genres.length ? ', ' : '')
              );
            })}
          </MovieInfo>
        )}
        <MovieInfo>
          <MovieInfoTitle>Overview: </MovieInfoTitle>
          {details.overview}
        </MovieInfo>

        <MovieInfo>
          <MovieInfoTitle>Release Date: </MovieInfoTitle>
          {details.release_date}
        </MovieInfo>

        <MovieInfo>
          <MovieInfoTitle>Average: </MovieInfoTitle>
          {details.vote_average}
        </MovieInfo>

        <MovieInfo>
          <MovieInfoTitle>Votes: </MovieInfoTitle>
          {details.vote_count}
        </MovieInfo>

        <MovieInfo>
          <MovieInfoTitle>Budget: </MovieInfoTitle>
          {details.budget}
        </MovieInfo>

        <MovieInfo>
          <MovieInfoTitle>Revenue: </MovieInfoTitle>
          {details.revenue}
        </MovieInfo>

        {details.production_companies && (
          <MovieInfo>
            <MovieInfoTitle>Production Companies:</MovieInfoTitle>{' '}
            {details.production_companies.map((companies, index) => {
              return (
                companies.name +
                (index + 1 < details.production_companies.length ? ', ' : '')
              );
            })}
          </MovieInfo>
        )}

        <MovieInfo>
          <MovieInfoTitle>Duration: </MovieInfoTitle>
          {details.runtime} min
        </MovieInfo>

        <MovieInfo>
          <MovieInfoTitle>Popularity: </MovieInfoTitle>
          {details.popularity}
        </MovieInfo>
      </Container>
    </ScrollContainer>
  );
}

export default Details;
