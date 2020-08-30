import React, {useState, useEffect, useMemo} from 'react';

import {FlatList, Alert} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import MovieItem from '../../components/MovieItem';

import api from '../../services/api';

import {Container, Loading, Separator, Logo, Gradient} from './styles';
import {colors} from '../../assets/colors';

// @ts-ignore
import {API_KEY} from '@env';

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

function App() {
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(999);
  const [imageBaseURL, setImageBaseURL] = useState({} as ImageBaseURL);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([] as Data[]);

  useEffect(() => {
    async function getUpcoming() {
      setLoading(true);
      try {
        if (imageBaseURL.poster_path === undefined) {
          const resp = await api.get(`configuration?api_key=${API_KEY}`);
          setImageBaseURL(resp.data.images);
        }
        const response = await api.get(
          `movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`,
        );
        setTotalPages(response.data.total_pages);
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
          navigation.setParams({id, imageBaseURL: imageInfo});
          // navigation.
          navigation.navigate('Details', {
            id,
            imageBaseURL: imageInfo,
          });
        }}
      />
    );
  }

  function onEndReached() {
    if (totalPages > page) {
      setPage(page + 1);
    }
  }

  function renderSeparator() {
    return <Separator />;
  }

  const List = useMemo(() => FlatList, []);

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

        <List
          data={data}
          maxToRenderPerBatch={20}
          updateCellsBatchingPeriod={100}
          windowSize={120}
          initialNumToRender={20}
          contentContainerStyle={{paddingBottom: 20}}
          ItemSeparatorComponent={renderSeparator}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          renderItem={renderItem}
          keyExtractor={(item: Item, index: number) => String(index)}
        />
      </Gradient>
    </Container>
  );
}

export default App;
