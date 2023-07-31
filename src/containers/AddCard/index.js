import React, {Component} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import {BackButton} from '@components';
import {colors} from '@config';
import Entypo from 'react-native-vector-icons/Entypo';
import {Transactions} from '@components';
class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{marginTop: 13}}>
          <BackButton navigation={this.props.navigation} />
        </View>
        <View style={styles.spacing} />
        <View style={styles.spacing} />

        <Text style={styles.titleText}>Add Card</Text>

        <View style={styles.spacingXL} />
        <View style={styles.spacingXL} />
        <View style={styles.spacing} />

        <View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AddNewCard')}
            style={[
              styles.dashedView,
              {
                paddingVertical: 50,
                backgroundColor: colors.lightGray,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <Entypo name="plus" size={50} color={colors.gray} />
          </TouchableOpacity>
        </View>

        <View style={styles.spacingXL} />
        <View style={styles.spacingXL} />
        <View style={styles.spacing} />

        <Text style={[styles.titleText, {fontSize: 20}]}>
          Last Transactions
        </Text>
        <View style={styles.spacing} />
        <View style={styles.spacing} />

        <View style={{flex: 1}}>
          <Transactions />
        </View>
      </View>
    );
  }
}

export default AddCard;
