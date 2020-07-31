import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from '../screens/Login';
import SplashScreen from '../screens/Splash';
import Home from '../screens/Home';
import DrawImage from '../screens/DrawImage';
import ProjectReport from '../screens/AddProject';
const SplashStack = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen,
    },
  },
  {headerMode: null},
);
const AuthStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
  },
  {headerMode: null},
);
const AppStack = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    DrawImage: {
      screen: DrawImage,
    },
    ProjectReport: {
      screen: ProjectReport,
    },
  },
  {initialRouteName: 'Home', headerMode: null},
);

const App = createSwitchNavigator({
  Splash: {
    screen: SplashStack,
  },
  Auth: {
    screen: AuthStack,
  },
  App: {
    screen: AppStack,
  },
});

const Routes = createAppContainer(App);
export default Routes;
