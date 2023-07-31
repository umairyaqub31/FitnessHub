import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import styles from './styles';
import {colors} from '@config';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import OTPTextInput from 'react-native-otp-textinput';

class VerifyPhone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
    };
    this.otpInputRef = React.createRef();
  }

  setText = () => {
    this.otpInputRef.current.setValue('1234');
  };

  clearText = () => {
    this.otpInputRef.clear();
  };

  render() {
    let gotoScreen = '';
    if (this.props.type === 'account') {
      gotoScreen = 'Signin';
    } else {
      gotoScreen = 'CreateNewPassword';
    }
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>
          {this.props.type === 'account' ? 'Verify Phone' : 'Verify Code'}
        </Text>
        <View style={styles.spacing} />

        <Text style={styles.textGray}>Code is sent to +1 234 567 8901</Text>
        <View style={styles.spacing} />
        <View style={styles.spacing} />

        <View>
          <OTPTextInput ref={e => (this.otpInputRef = e)} />
        </View>
        <View style={styles.spacing} />
        <View style={styles.spacing} />

        <View style={{alignSelf: 'center', alignItems: 'center'}}>
          <Text style={[styles.textGray, {marginBottom: 3}]}>
            Didn’t recieve code?
          </Text>
          <TouchableOpacity>
            <Text
              style={[styles.primaryText, {textDecorationLine: 'underline'}]}>
              Resend OTP
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.spacing} />
        <View style={styles.spacing} />
        <View style={styles.spacing} />
        <View style={styles.spacing} />
        <TouchableOpacity
          style={[styles.primaryBtn, styles.boxShadow]}
          onPress={() => this.props.navigation.navigate(gotoScreen)}>
          <Text style={styles.btnText}>
            {this.props.type === 'account' ? 'Verify Account' : 'Verify Code'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default VerifyPhone;
