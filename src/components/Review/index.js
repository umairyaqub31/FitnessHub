import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import {colors} from '@config';

function Review(props) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <AntDesign name="star" size={24} color={colors.primary} />
    </TouchableOpacity>
  );
}

export default Review;
