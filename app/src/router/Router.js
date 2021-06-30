import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import COLORS from '../consts/colors';
import SignInScreen from '../views/screens/SignInScreen';
import SignUpScreen from '../views/screens/SignUpScreen';
import BottomNavigator from '../views/navigation/BottomNavigator';
import DetailScreen from '../views/screens/DetailScreen';
import DetailBiodata from '../views/screens/DetailBiodata';
import OnBoardScreen from '../views/screens/OnBoardScreen';
import ChatDokterScreen from '../views/screens/ChatDokterScreen';
import Profile from '../views/screens/Profile';
import Consultation from '../views/screens/Consultation';
import Diagnose from '../views/screens/Diagnose';

import {
  CometChatUserProfile,
  CometChatUI,
  CometChatMessages,
  CometChatUserListWithMessages,
  CometChatUserList,
  CometChatGroupListWithMessages,
  CometChatGroupList,
  CometChatConversationListWithMessages,
  CometChatConversationList,
} from '../cometchat-pro-react-native-ui-kit';
import Product from '../views/screens/Product';
import ProductDetail from '../views/screens/ProductDetail';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <Stack.Navigator
        initialRouteName="Diagnose"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BoardScreen" component={OnBoardScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={BottomNavigator} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
        <Stack.Screen name="DetailBiodata" component={DetailBiodata} />
        <Stack.Screen name="ChatDokterScreen" component={ChatDokterScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Consultation" component={Consultation} />
        <Stack.Screen name="Diagnose" component={Diagnose} />

        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        {/* Comet Chat Components */}
        {/* <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="HomePage" component={HomePage} /> */}
        {/* <Stack.Screen name="CometChatUI" component={CometChatUI} /> */}
        <Stack.Screen name="Conversation" component={CometChatConversationListWithMessages} />
        <Stack.Screen name="ConversationComponent" component={CometChatConversationList} />
        <Stack.Screen name="Group" component={CometChatGroupListWithMessages} />
        <Stack.Screen name="GroupComponent" component={CometChatGroupList} />
        <Stack.Screen name="Users" component={CometChatUserListWithMessages} />
        <Stack.Screen name="UsersComponent" component={CometChatUserList} />
        <Stack.Screen name="CometChatMessages" component={CometChatMessages} />
        {/* Comet Chat Components */}
      </Stack.Navigator>
    </>
  );
};

export default Router;
