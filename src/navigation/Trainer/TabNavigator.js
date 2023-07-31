import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  HomeStackNavigator,
  ScheduleStackNavigator,
  MessagesStackNavigator,
  MyFitnessHubStackNavigator,
  SettingsStackNavigator,
} from './StackNavigator';
import {colors} from '@config';
import {DeviceEventEmitter, View, Image, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

const TrainerBottomTabNavigator = props => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        // showLabel: false,
        activeTintColor: colors.primary,
        inactiveTintColor: colors.gray,

        style: {
          backgroundColor: colors.white,
          height: 90,
          flexDirection: 'column',
          elevation: 2,
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
          paddingBottom: 10,
        },
        labelStyle: {fontSize: 12, marginBottom: 2},
      }}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <AntDesign
              name="home"
              size={30}
              color={color}
              style={{marginTop: 10}}
            />
          ),
        }}
        //   listeners={({ navigation, route }) => ({
        //     tabPress: (e) => {
        //       e.preventDefault();
        //       navigation.navigate("Feed", {screen:"Feed"});
        //     },
        //   })}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleStackNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <Feather
              name="calendar"
              size={30}
              color={color}
              style={{marginTop: 10}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyFitnessHub"
        component={MyFitnessHubStackNavigator}
        options={{
          tabBarIcon: ({color}) => (
            // <FontAwesome5 style={{ width:30 }} name="users" size={24} color={color} />
            <View
              style={{
                borderWidth: 3,
                borderColor: colors.primary,
                padding: 10,
                width: 60,
                height: 60,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 0,
              }}>
              <Image
                style={{height: 20, width: 40}}
                source={require('@images/logo-group.png')}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        message-processing-outline
        component={MessagesStackNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="message-processing-outline"
              size={30}
              color={color}
              style={{marginTop: 10}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons
              name="settings-outline"
              size={30}
              color={color}
              style={{marginTop: 10}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TrainerBottomTabNavigator;
