import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import api from '../../services/api';

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

interface Props {
  data: Data;
}

const MyComponent = React.memo(function MyComponent({data}: Props) {
  return (
    <>
      <View key={data.id} style={styles.listItem}>
        <Text>{data.title}</Text>
        <Text>{data.release_date}</Text>
        <Text>{data.vote_average}</Text>
        {/* title, release_date, vote_average, vote_count, poster_path or backdrop_path */}
      </View>
    </>
  );
});

function App() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([] as Data[]);

  useEffect(() => {
    async function getUpcoming() {
      setLoading(true);
      const response = await api.get(`&page=${page}`);
      setData([...data, ...response.data.results]);
      setLoading(false);
    }
    getUpcoming();
    //
  }, [page]);

  function renderItem({item}: any) {
    // console.log(item);
    return <MyComponent key={item.id} data={item} />;
  }

  function renderFooter() {
    if (!loading) return null;
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  function renderSeparator() {
    return (
      <View
        style={{
          marginVertical: 5,
          backgroundColor: '#00000000',
          width: '100%',
          height: 0,
        }}
      />
    );
  }

  return (
    <>
      <FlatList
        contentContainerStyle={styles.list}
        data={data}
        ItemSeparatorComponent={renderSeparator}
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0.1}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        keyExtractor={(item: Item, index: number) => String(index)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 20,
  },

  listItem: {
    backgroundColor: '#8eE',
    padding: 20,
  },
});

export default App;
