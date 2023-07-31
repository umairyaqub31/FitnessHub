import React, {Component, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import styles from './styles';
export default function DropDown({
  list,
  title,
  showPicker,
  onPressPicker,
  onSelect,
  key,
}) {
  return (
    <View style={styles.DropdownMainView}>
      <TouchableOpacity
        key={key}
        style={styles.DropdownTouch}
        onPress={onPressPicker}>
        <Text style={styles.DropdownOptionText}>{title}</Text>
        <Image
          style={styles.DropdownImage}
          resizeMode="contain"
          source={require('@images/primaryArrowDown.png')}
        />
      </TouchableOpacity>
      {showPicker ? (
        <View style={styles.DropdownOptionView}>
          <ScrollView nestedScrollEnabled>
            {list.map(element => (
              <TouchableOpacity onPress={() => onSelect(element)}>
                <Text style={styles.DropdownOptionText1}>{element.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
}
