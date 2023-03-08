import React, {useState} from 'react';
import {SafeAreaView, Image} from 'react-native';
import {Text, BottomNavigation} from 'react-native-paper';
import ImageList from './reddit-art/ImageList';

const Home = () => (
  <SafeAreaView
    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{fontSize: 32}}>This is the home page</Text>
    <Image
      source={{
        uri: 'https://media.discordapp.net/attachments/650511623433486359/1039180313512906773/maxwell.gif',
        height: 300,
        width: 300,
      }}
      resizeMode="center"
    />
  </SafeAreaView>
);
const Other = () => (
  <SafeAreaView
    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{fontSize: 32}}>This is some other page</Text>
    <Image
      source={{
        uri: 'https://media.discordapp.net/attachments/955361448492683304/964565690407329882/meme.gif',
        height: 300,
        width: 300,
      }}
      resizeMode="center"
    />
  </SafeAreaView>
);

const Main = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'home',
      title: 'Home',
      focusedIcon: 'home-variant',
      unfocusedIcon: 'home-variant-outline',
    },
    {
      key: 'other',
      title: 'Other',
      focusedIcon: 'cog',
      unfocusedIcon: 'cog-outline',
    },
    {
      key: 'art',
      title: 'Art',
      focusedIcon: 'drawing-box',
      unfocusedIcon: 'drawing',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    other: Other,
    art: ImageList,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
      sceneAnimationEnabled={true}
    />
  );
};

export default Main;
