import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import Home from '../pages/Home';
// import Details from '../pages/Details';
// import {colors} from '../assets/colors';

const Stack = createStackNavigator();

const MockedNavigator = ({component, params = {}}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="MockedScreen"
          component={component}
        />
        {/* <Stack.Screen
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
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MockedNavigator;
