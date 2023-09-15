import React from 'react';
import 'react-native-gesture-handler';
import { Navigator } from './src/navigator/Tab1';
import { Tabs } from './src/navigator/Tabs';
import { NavigationContainer } from '@react-navigation/native';



const App = () => {
  return (
    <NavigationContainer>
    {/* <Navigator /> */}
      <Tabs />
    </NavigationContainer>
  )
}

export default App;
