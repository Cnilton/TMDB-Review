import React from 'react';
import {Text} from 'react-native';

import {Container, MovieImage, Item} from './styles';

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
      <MovieImage
        resizeMode="contain"
        source={{
          uri: `${image.secure_base_url}${image.poster_sizes[5]}/${data.poster_path}`,
        }}
      />
      <Item>
        <Text>Movie: {data.title}</Text>
        <Text>Released: {data.release_date}</Text>
        <Text>Average: {data.vote_average}</Text>
        <Text>Votes: {data.vote_count}</Text>
      </Item>
      {/* title, release_date, vote_average, vote_count, poster_path or backdrop_path */}
    </Container>
  );
});

export default MovieItem;
