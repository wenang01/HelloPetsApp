import 'react-native-gesture-handler';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import {View} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ChatDokterScreen from '../screens/ChatDokterScreen';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          height: 55,
          borderTopWidth: 0,
          elevation: 0,
        },
        showLabel: false,
        activeTintColor: COLORS.primary,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="home-filled" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Product"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="grid-view" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="ChatDokterScreen"
        component={ChatDokterScreen}
        options={{
          tabBarIcon: ({color}) => <Icon name="mail" color={color} size={28} />,
        }}
      />
      <Tab.Screen
        name="Akun"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="person" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
