import React from 'react';
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
      <Main />
    </PaperProvider>
  );
};

export default App;
