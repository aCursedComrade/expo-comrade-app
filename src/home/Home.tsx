import React from 'react';
import {View, Image} from 'react-native';
import {Text} from 'react-native-paper';

const Home = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{fontSize: 24}}>This is the home page</Text>
    <Image
      source={{
        uri: 'https://media.discordapp.net/attachments/650511623433486359/1039180313512906773/maxwell.gif',
        height: 300,
        width: 300,
      }}
      resizeMode="center"
    />
  </View>
);

export default Home;
