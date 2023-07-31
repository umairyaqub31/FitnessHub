import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';

import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import ResetPasswordScreen from './ResetPasswordScreen';
import VerifyAccountScreen from './VerifyAcountScreen';
import CreateNewPasswordScreen from './CreateNewPassword';
import HomeScreen from './HomeScreen';
import PackagesScreen from './PackagesScreen';
import CreatePackageScreen from './CreatePackageScreen';
import ScheduleScreen from './ScheduleScreen';
import MessagesScreen from './MessagesScreen';
import MyFitnessHubScreen from './MyFitnessHubScreen';
import SettingsScreen from './SettingsScreen';
import ClientRequestScreen from './ClientRequestScreen';

import {colors} from '@config';
// import Navigation from '@navigation';

import TrainerBottomTabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const TrainerAuthStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signin"
        component={SignInScreen}
        options={{
          header: props => null,
        }}
      />

      <Stack.Screen
        name="Signup"
        component={SignUpScreen}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="CreateNewPassword"
        component={CreateNewPasswordScreen}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="VerifyAccount"
        component={VerifyAccountScreen}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="Home"
        component={TrainerBottomTabNavigator}
        options={{
          header: props => null,
        }}
      />
    </Stack.Navigator>
  );
};

const HomeStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="Packages"
        component={PackagesScreen}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="CreatePackage"
        component={CreatePackageScreen}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="ClientRequest"
        component={ClientRequestScreen}
        options={{
          header: props => null,
        }}
      />
    </Stack.Navigator>
  );
};

const ScheduleStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          header: props => null,
        }}
      />
    </Stack.Navigator>
  );
};

const MessagesStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          header: props => null,
        }}
      />
    </Stack.Navigator>
  );
};

const MyFitnessHubStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyFitnessHub"
        component={MyFitnessHubScreen}
        options={{
          header: props => null,
        }}
      />
    </Stack.Navigator>
  );
};

const SettingsStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          header: props => null,
        }}
      />
    </Stack.Navigator>
  );
};

export {
  TrainerAuthStackNavigator,
  HomeStackNavigator,
  ScheduleStackNavigator,
  MessagesStackNavigator,
  MyFitnessHubStackNavigator,
  SettingsStackNavigator,
};
