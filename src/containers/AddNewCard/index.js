import React, {Component} from 'react';
import {Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import styles from './styles';
import {BackButton} from '@components';
import {colors} from '@config';
import Entypo from 'react-native-vector-icons/Entypo';
import {Transactions} from '@components';
class AddNewCard extends Component {
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

        <Text style={styles.titleText}>Add New Card</Text>

        <View style={styles.spacingXL} />
        <View style={styles.spacingXL} />
        <View style={styles.spacing} />

        <Text style={styles.text}>Card Number</Text>
        <View
          style={[
            styles.customTextInput,
            styles.inline,
            {justifyContent: 'space-between'},
          ]}>
          <TextInput
            style={{width: '80%'}}
            // onChangeText={onChangeNumber}
            // value={number}
            placeholder="7860 1230 4560 7890"
          />
          <Image
            style={styles.image}
            source={require('@images/visaInput.png')}
          />
        </View>
        <View style={styles.spacingXL} />

        <View style={styles.inline}>
          <View style={{width: '48%', marginRight: 13}}>
            <Text style={styles.text}>Expiry Date</Text>
            <View
              style={[
                styles.customTextInput,
                styles.inline,
                {justifyContent: 'space-between'},
              ]}>
              <TextInput
                // onChangeText={onChangeNumber}
                // value={number}
                placeholder="10/25"
              />
            </View>
          </View>

          <View style={{width: '48%'}}>
            <Text style={styles.text}>CVV</Text>
            <View
              style={[
                styles.customTextInput,
                styles.inline,
                {justifyContent: 'space-between'},
              ]}>
              <TextInput
                // onChangeText={onChangeNumber}
                // value={number}
                placeholder="522"
              />
            </View>
          </View>
        </View>
        <View style={styles.spacingXL} />

        <Text style={styles.text}>Card Holder</Text>
        <View
          style={[
            styles.customTextInput,
            styles.inline,
            {justifyContent: 'space-between'},
          ]}>
          <TextInput
            // onChangeText={onChangeNumber}
            // value={number}
            placeholder="Olivia James"
          />
        </View>
        <View style={styles.spacingXL} />
        <View style={styles.spacingXL} />

        <TouchableOpacity
          // onPress={() => this.props.navigation.navigate('PaymentMethod')}
          style={[styles.roundBtn, styles.boxShadow, {marginTop: 6}]}>
          <Text style={[styles.textBold, {color: colors.white}]}>Add Card</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default AddNewCard;
