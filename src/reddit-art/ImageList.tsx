import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Image,
  FlatList,
  Dimensions,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {Text, Chip, FAB} from 'react-native-paper';
import getImages from '../utils/getImages.js';
import Header from './Header';

type CardProps = {
  title: string;
  url: string;
};

const ImgCard = (props: CardProps) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{props.title}</Text>
    <Image
      source={{uri: props.url, cache: 'only-if-cached'}}
      resizeMode="center"
      style={{
        width:
          Dimensions.get('window').width > 900
            ? Dimensions.get('window').width * 0.4
            : Dimensions.get('window').width * 0.8,
        height:
          Dimensions.get('window').width > 900
            ? Dimensions.get('window').width * 0.3
            : Dimensions.get('window').width * 0.9,
      }}
    />
  </View>
);

type ImageListProps = {
  whichSub: string;
};

const List = (props: ImageListProps) => {
  const listRef = useRef<FlatList>(null);
  const [refreshing, setRefreshing] = useState(true);
  const [imgList, setImgList] = useState([{id: '', title: '', url: ''}]);

  const moveToTop = () =>
    listRef.current?.scrollToOffset({animated: false, offset: 0});

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
    <>
      <FlatList
        columnWrapperStyle={
          Dimensions.get('window').width > 900 ? styles.column : null
        }
        numColumns={Dimensions.get('window').width > 900 ? 2 : 1}
        ref={listRef}
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
      <FAB style={styles.fab} icon={'arrow-collapse-up'} onPress={moveToTop} />
    </>
  );
};

type NavChipsProps = {
  subList: string[];
  index: number;
  setIndex: (index: number) => void;
};

const NavChips = (props: NavChipsProps) => (
  <View style={{borderBottomWidth: 1}}>
    <FlatList
      data={props.subList}
      renderItem={sub => (
        <Chip
          style={{margin: 8}}
          selected={sub.index === props.index}
          onPress={() => {
            props.setIndex(sub.index);
          }}>
          {sub.item}
        </Chip>
      )}
      horizontal={true}
    />
  </View>
);

const ImageList = () => {
  const [index, setIndex] = useState(0);
  const [subList] = useState([
    'AlbumArtPorn',
    'ImagesAlbum',
    'SciFiArt',
    'Art',
    'ArtPorn',
    'AnimeART',
  ]);

  return (
    <>
      <Header />
      <NavChips subList={subList} index={index} setIndex={setIndex} />
      <List whichSub={subList[index]} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  column: {
    alignContent: 'space-around',
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
