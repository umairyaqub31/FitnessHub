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

import RoleSelectionScreen from './RoleSelectionScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import ResetPasswordScreen from './ResetPasswordScreen';
import VerifyAccountScreen from './VerifyAcountScreen';
import CreateNewPasswordScreen from './CreateNewPassword';
import HomeScreen from './HomeScreen';
import MotivationScreen from './MotivationScreen';
import GenderSelectionScreen from './GenderSelectionScreen';
import ChooseChallengeScreen from './ChooseChallengeScreen';
import ChooseTargetBodyScreen from './ChooseTargetBodyScreen';
import FitnessLevelScreen from './FitnessLevelScreen';
import CurrentWeightScreen from './CurrentWeightScreen';
import GoalWeightScreen from './GoalWeightScreen';
import AgeScreen from './AgeScreen';
import HeightScreen from './HeightScreen';
import LocationScreen from './LocationScreen';
import PackagesScreen from './PackagesScreen';
import BookScheduleScreen from './BookScheduleScreen';
import SelectedPackageScreen from './SelectedPackageScreen';
import PaymentMethodScreen from './PaymentMethodScreen';
import AddCardScreen from './AddCardScreen';
import AddNewCardScreen from './AddNewCardScreen';
import PaymentScreen from './PaymentScreen';
import MessagesScreen from './MessagesScreen';
import MyFitnessHubScreen from './MyFitnessHubScreen';
import SettingsScreen from './SettingsScreen';
import BookmarksScreen from './BookmarkScreen';
import WriteReviewScreen from './WriteReviewScreen';
import NotificationsScreen from './NotificationsScreen';
import TrainerOnNeedScreen from './TrainerOnNeedScreen';

import colors from '../config/color/index';
import Navigation from '@navigation';
import {TrainerOnNeed} from '@containers';

const Stack = createStackNavigator();

const AuthStackNavigator = ({navigation}) => {
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
        name="VerifyAccount"
        component={VerifyAccountScreen}
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
        name="WriteReview"
        component={WriteReviewScreen}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="Motivation"
        component={MotivationScreen}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="GenderSelection"
        component={GenderSelectionScreen}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="ChooseChallenge"
        component={ChooseChallengeScreen}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="ChooseTargetBody"
        component={ChooseTargetBodyScreen}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="FitnessLevel"
        component={FitnessLevelScreen}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="CurrentWeight"
        component={CurrentWeightScreen}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="GoalWeight"
        component={GoalWeightScreen}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="Age"
        component={AgeScreen}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="Height"
        component={HeightScreen}
        options={{
          header: props => null,
        }}
      />

      <Stack.Screen
        name="TrainerOnNeed"
        component={TrainerOnNeedScreen}
        options={{
          header: props => null,
        }}
      />

      {/* location duplicates */}
      <Stack.Screen
        name="Packages"
        component={PackagesScreen}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="BookSchedule"
        component={BookScheduleScreen}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="SelectedPackage"
        component={SelectedPackageScreen}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethodScreen}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="AddCard"
        component={AddCardScreen}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="AddNewCard"
        component={AddNewCardScreen}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          header: props => null,
        }}
      />
    </Stack.Navigator>
  );
};

const LocationStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Location"
        component={LocationScreen}
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
        name="SelectedPackage"
        component={SelectedPackageScreen}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethodScreen}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="AddCard"
        component={AddCardScreen}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="AddNewCard"
        component={AddNewCardScreen}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
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
      <Stack.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          header: props => null,
        }}
      />
    </Stack.Navigator>
  );
};

export {
  AuthStackNavigator,
  HomeStackNavigator,
  LocationStackNavigator,
  MessagesStackNavigator,
  MyFitnessHubStackNavigator,
  SettingsStackNavigator,
};
