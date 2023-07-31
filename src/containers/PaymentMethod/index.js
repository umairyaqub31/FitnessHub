import React, {Component} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import {BackButton} from '@components';
import {colors} from '@config';
import Entypo from 'react-native-vector-icons/Entypo';
import {Transactions} from '@components';
class PaymentMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1, 2, 3],
    };
  }

  _renderItem = () => {
    return (
      <TouchableOpacity
        style={[styles.boxShadow, styles.card]}
        onPress={() => this.props.navigation.navigate('Payment')}>
        <Image
          style={{width: 50, height: 35, resizeMode: 'contain'}}
          source={require('@images/visaDark.png')}
        />
        <View style={styles.spacing} />

        <Text style={[styles.text, {fontSize: 14, fontWeight: 'bold'}]}>
          7860 **** **** **
        </Text>

        <View style={styles.spacing} />
        <View style={styles.spacing} />
        <View style={styles.spacing} />

        <Text style={[styles.text, {fontSize: 18, fontWeight: 'bold'}]}>
          Oliva
        </Text>
        <Text style={[styles.text, {fontSize: 12}]}>Debit Card</Text>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{marginTop: 13}}>
          <BackButton navigation={this.props.navigation} />
        </View>
        <View style={styles.spacing} />
        <View style={styles.spacing} />

        <Text style={styles.titleText}>Payment Method</Text>

        <View style={styles.spacing} />
        <View style={styles.spacing} />

        <View style={styles.inline}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AddCard')}
            style={[
              styles.dashedView,
              {
                paddingHorizontal: 11,
                paddingVertical: 15,
                marginRight: 15,
              },
            ]}>
            <Entypo name="plus" size={30} color={colors.darkPrimary} />
          </TouchableOpacity>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            data={this.state.data}
            renderItem={this._renderItem}
          />
        </View>
        <View style={styles.spacing} />
        <View style={styles.spacing} />
        <View style={styles.spacing} />
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

export default PaymentMethod;
