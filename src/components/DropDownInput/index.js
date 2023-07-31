import React, {Component, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {colors} from '@config';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

export default function DropDownInput({
  list,
  title,
  showPicker,
  onPressPicker,
  onSelect,
  HeadingTitle,
  key,
}) {
  return (
    <View style={styles.DropdownMainView}>
      <Text style={styles.DropdownHeading}>{HeadingTitle}</Text>
      {console.log(" \n\n list component ==> ", list)}
      <TouchableOpacity
        key={key}
        style={styles.DropdownTouch}
        onPress={onPressPicker}>
        <Text style={styles.DropdownOptionText}>{title}</Text>
        <Image
          style={styles.DropdownImage}
          resizeMode="contain"
          source={require('@images/DownArrow.png')}
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

const styles = StyleSheet.create({
  DropdownMainView: {
    width: '100%',
    alignSelf: 'center',
  },
  DropdownTouch: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    // paddingTop: 17,
    backgroundColor: colors.lightGray,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    // borderBottomWidth: 2,
    // borderColor: colors.primary,
    paddingHorizontal: 10,
  },
  DropdownImage: {
    width: 12,
    height: 14,
    marginRight: 5,
  },
  DropdownOptionText: {
    fontSize: 16,
    color: colors.black,
    // opacity: 0.6,
  },
  DropdownOptionText1: {
    fontSize: 20,
    color: colors.black,
    opacity: 0.5,
    paddingVertical: 5,
  },
  DropdownOptionView: {
    maxHeight: 180,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 80,
    position: 'absolute',
    zIndex: 111,
    width: '100%',
    elevation: 5,
  },
  DropdownHeading: {
    fontSize: responsiveFontSize(1.8),
    color: colors.black,
    marginBottom: 10,
  },
});
