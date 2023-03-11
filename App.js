import React from 'react';
import {StatusBar} from 'expo-status-bar';
import Main from './src/Main';
import {
  Provider as PaperProvider,
  MD3DarkTheme as DefaultTheme,
} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  mode: 'adaptive',
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <StatusBar style="auto" />
      <Main />
    </PaperProvider>
  );
};

export default App;
