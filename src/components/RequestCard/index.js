import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Avatar} from 'react-native-paper';
import {colors} from '@config';
function RequestCard() {
  return (
    <View style={[styles.container, styles.boxShadow]}>
      <View style={styles.inline}>
        <Avatar.Image
          size={100}
          source={require('@images/requestProfile.png')}
        />
        <View style={{flex: 1, marginTop: 7}}>
          <View
            style={[
              styles.inline,
              {justifyContent: 'space-between', alignItems: 'center'},
            ]}>
            <Text style={styles.titleText}>Sarah Lee</Text>
            <Text style={[styles.textGray, {fontWeight: '600'}]}>1 w ago</Text>
          </View>
          <View style={[styles.inline, styles.buttonView]}>
            <TouchableOpacity style={styles.confirmBtn}>
              <Text style={styles.btnText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn}>
              <Text style={[styles.btnText, {color: colors.gray}]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={[styles.inline, {marginTop: 20}]}>
        <View style={{marginRight: 40, width: '40%'}}>
          <Text style={styles.heading}>Bundle</Text>
          <Text style={styles.textGray}>One week bundle</Text>
        </View>
        <View style={{}}>
          <Text style={styles.heading}>Payment Method</Text>
          <Text style={styles.textGray}>Via Credit Card</Text>
        </View>
      </View>

      <View style={[styles.inline, {marginTop: 20}]}>
        <View style={{marginRight: 40, width: '40%'}}>
          <Text style={styles.heading}>Package Detail</Text>
          <Text style={styles.textGray}>2x week package</Text>
          <Text style={styles.textGray}>10 percent discount</Text>
          <Text style={styles.textGray}>
            Per session{'   '}
            <Text style={{color: colors.black, fontWeight: 'bold'}}>£20</Text>
          </Text>
        </View>
        <View style={{}}>
          <Text style={styles.heading}>Procurement option</Text>
          <Text style={styles.textGray}>Via Credit Card</Text>
        </View>
      </View>
    </View>
  );
}

export default RequestCard;
