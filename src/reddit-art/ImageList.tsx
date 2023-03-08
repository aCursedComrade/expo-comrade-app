import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  FlatList,
  Dimensions,
  RefreshControl,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {Text, Chip} from 'react-native-paper';
import getImages from '../utils/getImages.mjs';
import Header from './Header';

type CardProps = {
  title: string;
  url: string;
};

const ImgCard = (props: CardProps) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{props.title}</Text>
    <Image
      source={{uri: props.url}}
      resizeMode="contain"
      style={{
        width: Dimensions.get('window').width * 0.8,
        height: 420,
      }}
    />
  </View>
);

type ImageListProps = {
  whichSub: string;
};

const List = (props: ImageListProps) => {
  const [refreshing, setRefreshing] = useState(true);
  const [imgList, setImgList] = useState([{id: '', title: '', url: ''}]);

  const refreshFunc = () => {
    getImages(props.whichSub)
      .then(list => {
        setImgList(list);
        setRefreshing(false);
      })
      .catch(error => console.error(error.message));
  };

  useEffect(() => {
    refreshFunc();
  });

  return (
    <FlatList
      data={imgList}
      renderItem={({item}) => {
        if (item.url !== '') {
          return <ImgCard title={item.title} url={item.url} />;
        } else {
          return (
            <ImgCard
              title={'Placeholder'}
              url={'https://picsum.photos/480?grayscale'}
            />
          );
        }
      }}
      keyExtractor={item => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshFunc} />
      }
    />
  );
};

const ImageList = () => {
  const [index, setIndex] = useState(0);
  const [subList] = useState([
    'Art',
    'ArtPorn',
    'AnimeART',
    'SFMCompileClub',
    'hentai',
    'rule34',
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={{borderBottomWidth: 1}}>
        <FlatList
          data={subList}
          renderItem={sub => (
            <Chip
              style={{margin: 8}}
              selected={sub.index === index}
              onPress={() => {
                setIndex(sub.index);
              }}>
              {sub.item}
            </Chip>
          )}
          horizontal={true}
        />
      </View>
      <List whichSub={subList[index]} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    borderWidth: 2,
    borderColor: 'grey',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
});

export default ImageList;
