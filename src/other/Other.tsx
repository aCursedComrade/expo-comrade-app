import React from 'react';
import {View, Image} from 'react-native';
import {Text} from 'react-native-paper';

const Other = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{fontSize: 32}}>This is some other page</Text>
    <Image
      source={{
        uri: 'https://media.discordapp.net/attachments/955361448492683304/964565690407329882/meme.gif',
        height: 300,
        width: 300,
      }}
      resizeMode="center"
    />
  </View>
);

export default Other;
