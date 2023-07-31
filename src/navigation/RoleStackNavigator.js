import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthStackNavigator} from './StackNavigator';
import RoleSelectionScreen from './RoleSelectionScreen';
import {TrainerAuthStackNavigator} from './Trainer/StackNavigator';

const Stack = createStackNavigator();

const RoleStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RoleSelection"
        component={RoleSelectionScreen}
        options={{
          header: props => null,
        }}
      />
      <Stack.Screen
        name="Trainee"
        component={AuthStackNavigator}
        options={{
          header: props => null,
        }}
      />

      <Stack.Screen
        name="Trainer"
        component={TrainerAuthStackNavigator}
        options={{
          header: props => null,
        }}
      />
    </Stack.Navigator>
  );
};

export {RoleStackNavigator};
