import React from 'react';
import {Appbar} from 'react-native-paper';

const Header = () => (
  <Appbar.Header elevated={true}>
    <Appbar.Content title="Art of Reddit" />
    <Appbar.Action icon="dots-vertical" onPress={() => {}} />
  </Appbar.Header>
);

export default Header;
