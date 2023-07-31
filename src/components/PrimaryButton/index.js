import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles';
function PrimaryButton({title, handlePress}) {
  return (
    <TouchableOpacity style={styles.primaryBtn} onPress={() => handlePress()}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default PrimaryButton;
