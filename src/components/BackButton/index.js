import React, {Component} from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '@config';
import styles from './styles';

const iconSize = 22;
const BackButton = props => {
  return (
    <>
      {Platform.OS === 'ios' ? (
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}
          style={[styles.boxShadow, , styles.buttonContainer]}>
          <Entypo name="chevron-left" size={iconSize} color={colors.primary} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.boxShadow, , styles.buttonContainer]}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <AntDesign name="arrowleft" size={iconSize} color={colors.primary} />
        </TouchableOpacity>
      )}
    </>
  );
};

export default BackButton;
