import React, {useState, useEffect} from 'react';

import {FlatList, Alert} from 'react-native';
import axios from 'axios';

import {StackScreenProps} from '@react-navigation/stack';

import MovieItem from '../../components/MovieItem';

import {Container, Loading, Separator, Logo, Gradient} from './styles';
import {colors} from '../../assets/colors';

// @ts-ignore
import {API_KEY} from '@env';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

type RootStackParamList = {
  Home: undefined;
  Details: {id: number; imageBaseURL: ImageBaseURL};
};
interface Item {
  id: string;
}

interface Data {
  id: string;
  full_name: string;
  title: string;
  release_date: string;
  vote_average: string;
  vote_count: string;
}

interface ImageBaseURL {
  backdrop_sizes: string[];
  poster_sizes: string[];
  base_url: string;
  secure_base_url: string;
  poster_path: string;
}

function App({navigation}: Props) {
  const [page, setPage] = useState(1);
  const [imageBaseURL, setImageBaseURL] = useState({} as ImageBaseURL);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([] as Data[]);

  useEffect(() => {
    async function getUpcoming() {
      setLoading(true);
      try {
        if (imageBaseURL.poster_path === undefined) {
          const resp = await axios.get(
            `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`,
          );
          setImageBaseURL(resp.data.images);
        }
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`,
        );

        setData((previousData) => [...previousData, ...response.data.results]);
      } catch (err) {
        console.log(err);
        Alert.alert('Erro', err.message);
      }
      setLoading(false);
    }
    getUpcoming();
  }, [page, imageBaseURL.poster_path]);

  function renderItem({item}: any) {
    return (
      <MovieItem
        key={item.id}
        data={item}
        image={imageBaseURL}
        getDetails={(id: number, imageInfo: ImageBaseURL) => {
          navigation.navigate('Details', {id, imageBaseURL: imageInfo});
        }}
      />
    );
  }

  function renderSeparator() {
    return <Separator />;
  }

  return (
    <Container>
      {loading && <Loading size="large" color="black" />}
      <Gradient
        colors={[
          colors.primary_color,
          colors.secondary_color,
          colors.tertiary_color,
        ]}>
        <Logo />

        <FlatList
          // FlatList can't be used with styled-components 😓
          data={data}
          contentContainerStyle={{paddingBottom: 20}}
          ItemSeparatorComponent={renderSeparator}
          onEndReached={() => setPage(page + 1)}
          onEndReachedThreshold={0.2}
          renderItem={renderItem}
          keyExtractor={(item: Item, index: number) => String(index)}
        />
      </Gradient>
    </Container>
  );
}

export default App;
