import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import SplashScreen from 'react-native-splash-screen';

import Home from './pages/Home';
import Details from './pages/Details';
import {colors} from './assets/colors';

const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    changeNavigationBarColor(colors.tertiary_color, false, true);
    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar backgroundColor={colors.primary_color} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="Details"
            component={Details}
            options={{
              headerTitleStyle: {
                fontFamily: 'Roboto-Medium',
                textAlignVertical: 'center',
              },
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: colors.primary_color,
              },
              headerTintColor: '#fff',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
