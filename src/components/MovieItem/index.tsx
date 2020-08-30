import React from 'react';

import {Container, MovieImage, Item, MovieInfo, EmptyImage} from './styles';

import {colors} from '../../assets/colors';

interface Props {
  data: Data;
  image: ImageBaseURL;
  getDetails(id: number, imageBaseURL: ImageBaseURL): void;
}

interface ImageBaseURL {
  backdrop_sizes: string[];
  poster_sizes: string[];
  base_url: string;
  secure_base_url: string;
}

interface Data {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  poster_path: string;
}

const MovieItem = React.memo(function MovieItem({
  data,
  image,
  getDetails,
}: Props) {
  return (
    <Container
      onPress={() => getDetails(data.id, image)}
      activeOpacity={0.7}
      key={data.id}>
      {data.poster_path !== null ? (
        <MovieImage
          resizeMode="contain"
          source={{
            uri: `${image.secure_base_url}${image.poster_sizes[5]}/${data.poster_path}`,
          }}
        />
      ) : (
        <EmptyImage />
      )}

      <Item>
        <MovieInfo>Movie: {data.title}</MovieInfo>
        <MovieInfo>Release Date: {data.release_date}</MovieInfo>
        <MovieInfo>Average: {data.vote_average}</MovieInfo>
        <MovieInfo>Votes: {data.vote_count}</MovieInfo>
        <MovieInfo
          style={{
            color: colors.secondary_color,
          }}>
          See More Details
        </MovieInfo>
      </Item>
    </Container>
  );
});

export default MovieItem;
