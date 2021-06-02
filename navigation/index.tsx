// IMPORT DEPENDENCIES & NODE MODULES
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

// IMPORT SCREENS
import LoginScreen from '../src/screens/LoginScreen';
import RegisterScreen from '../src/screens/RegisterScreen';
import AuthLoadingScreen from '../src/screens/AuthLoadingScreen';
import NotFoundScreen from '../src/screens/NotFoundScreen';
import ForgotPasswordScreen from '../src/screens/ForgotPasswordScreen';

// // IMPORT OTHERS
import AdminBottomTabNavigator from './AdminBottomTabNavigator';
// //import { AuthStackParamList } from '../types';
// //import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// //import { AuthContext } from "./context";
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';


// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootStackNavigator />
    </NavigationContainer>
  );
}

// // React Navigation Fundamentals guide: https://reactnavigation.org/docs/getting-started
// // A root stack navigator is often used for displaying modals on top of all other content
// // Read more here: https://reactnavigation.org/docs/modal
const RootStack = createStackNavigator<RootStackParamList>();

function RootStackNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="AuthLoadingScreen" component={AuthLoadingScreen} />
      <RootStack.Screen name="LoginScreen" component={LoginScreen} />
      <RootStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <RootStack.Screen name="RegisterScreen" component={RegisterScreen} />
      <RootStack.Screen name="Root" component={BottomTabNavigator}  options={{headerShown: false}} />
      <RootStack.Screen name="AdminRoot" component={AdminBottomTabNavigator}  options={{headerShown: false}} />
      <RootStack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </RootStack.Navigator>
  );
}