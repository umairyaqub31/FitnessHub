import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import styles from './styles';
import {BackButton} from '@components';
import {colors} from '@config';
import Entypo from 'react-native-vector-icons/Entypo';
import {Transactions} from '@components';
import CreditCardDisplay from 'react-native-credit-card-display';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1, 2, 3],
    };
  }

  _renderItem = () => {
    return (
      <View style={[styles.boxShadow, styles.card]}>
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
      </View>
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

        <Text style={styles.titleText}>Payment</Text>

        <View style={styles.spacing} />
        <View style={styles.spacing} />

        <View style={[styles.boxShadow, {borderRadius: 21}]}>
          <CreditCardDisplay
            width={width - 50}
            height={230}
            // frontImage={require('@images/card.png')}
            number={4242424242424242}
            cvc={123}
            expiration="04/21"
            name="John J. Doe"
            since="2004"
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

export default Payment;
