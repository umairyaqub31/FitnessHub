import React, {Component, useState} from 'react';
import {Platform, TouchableOpacity, FlatList, View, Text} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '@config';
import styles from './styles';
import {Avatar} from 'react-native-paper';

const data = [1, 2, 3, 4, 5, 6, 7];
const Transactions = props => {
  const _renderItem = () => {
    return (
      <View style={[styles.inline, styles.itemContainer, styles.boxShadow]}>
        <View style={styles.inline}>
          <Avatar.Image size={40} source={require('@images/profilepic.png')} />
          <View style={{marginLeft: 15}}>
            <Text style={[styles.textBold, {color: colors.black}]}>Tommy</Text>
            <Text style={styles.textGray}>2 hr ago</Text>
          </View>
        </View>
        <Text
          style={[styles.textBold, {color: colors.darkPrimary, fontSize: 20}]}>
          £600.00
        </Text>
      </View>
    );
  };
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      data={data}
      renderItem={_renderItem}
    />
  );
};

export default Transactions;
