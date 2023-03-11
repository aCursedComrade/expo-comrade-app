import React, {useState} from 'react';
import {BottomNavigation} from 'react-native-paper';
import Home from './home/Home';
import Other from './other/Other';
import ImageList from './reddit-art/ImageList';

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
