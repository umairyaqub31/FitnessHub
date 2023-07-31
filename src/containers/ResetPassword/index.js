import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Animated,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import styles from './styles';
import {colors} from '@config';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/auth';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

import {VerifyPhone, BackButton} from '@components';
class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      flag: false,
      loading: false,
      confirm: null,
      code: '',
      timer: false,
    };
  }

  componentDidMount() {
    // Bind the variable to the instance of the class.
    this.authFirebaseListener = auth().onAuthStateChanged(user => {
      console.log('herereeeee.........');
      // this.setState({
      //   loading: false,  // For the loader maybe
      //   user, // User Details
      //   isAuth: true
      // });
    });
  }

  componentWillUnmount() {
    this.authFirebaseListener && this.authFirebaseListener(); // Unlisten it by calling it as a function
  }

  handleCompleteTimer = () => {
    this.setState({
      timer: false,
    });
  };

  signInWithPhoneNumber = async () => {
    // setTimer(false);
    const {phoneNumber} = this.state;
    if (phoneNumber && phoneNumber !== null && phoneNumber !== '') {
      this.setState({
        loading: true,
        timer: true,
      });

      // auth().settings.appVerificationDisabledForTesting = true;

      try {
        const confirmation = await auth().signInWithPhoneNumber(
          phoneNumber,
          true,
        );
        this.setState({
          confirm: confirmation,
          loading: false,
        });
      } catch (err) {
        Alert.alert(
          'Invalid Phone Number!',
          'Please Enter a valid Phone Number.',
          [{text: 'OK', onPress: () => this.setState({loading: false})}],
        );
        this.setState({timer: false});
      }
    } else {
      this.setState({flag: true});
      // Alert.alert(
      //   'Invalid Phone Number!',
      //   'Please Enter a valid Phone Number.',
      //   [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      // );
    }
  };
  confirmCode = async () => {
    const {code, confirm, phoneNumber} = this.state;
    try {
      this.setState({
        loading: true,
      });

      const confirmed = await confirm.confirm(code);

      // if (confirmed.additionalUserInfo.isNewUser) {
      //   // this.props.register(form);
      //   Alert.alert(
      //     'Not registered!',
      //     'Please enter a registered phone number.',
      //     [
      //       {
      //         text: 'OK',
      //         onPress: () =>
      //           this.setState({
      //             loading: false,
      //           }),
      //       },
      //     ],
      //   );
      // }

      if (confirmed) {
        this.setState({loading: false});
        this.props.navigation.navigate('CreateNewPassword', {
          phoneNumber: phoneNumber,
        });
      }
    } catch (error) {
      console.log('errr....', error);
      Alert.alert('Invalid Code', 'Please enter a valid code number', [
        {
          text: 'OK',
          onPress: () =>
            this.setState({
              loading: false,
            }),
        },
      ]);
    }
  };

  handleChange = text => {
    this.setState({
      phoneNumber: text,
      flag: false,
    });
  };

  render() {
    if (!this.state.confirm) {
      return (
        <View style={styles.container}>
          <View style={styles.spacing} />
          <View>
            <BackButton navigation={this.props.navigation} />
          </View>
          <View style={styles.spacingXL} />
          <View style={styles.spacingXL} />

          <Text style={styles.titleText}>Reset Password</Text>
          <View style={styles.spacing} />

          <Text style={styles.textGray}>
            Enter your phone number associated with your account and we’ll send
            an verification code for reset your password
          </Text>
          <View style={styles.spacingXL} />

          <Text style={styles.inputTitle}>Phone Number</Text>
          <View
            style={[
              styles.textinputrounded,
              this.state.flag ? {borderColor: 'red', borderWidth: 1} : {},
            ]}>
            <PhoneInput
              placeholder="123-456-789"
              textInputStyle={{height: 42}}
              textContainerStyle={{backgroundColor: colors.lightGray}}
              containerStyle={{backgroundColor: colors.lightGray}}
              defaultValue={this.state.phoneNumber}
              defaultCode={'PK'}
              layout="first"
              withDarkTheme={false}
              onChangeFormattedText={text => this.handleChange(text)}
            />
          </View>

          <View style={styles.spacingXL} />
          <View style={styles.spacingXL} />
          <View style={styles.spacingXL} />

          <TouchableOpacity
            style={[styles.primaryBtn, styles.boxShadow]}
            onPress={this.signInWithPhoneNumber}>
            {this.state.loading ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text style={styles.btnText}>Send Code</Text>
            )}
          </TouchableOpacity>
        </View>
      );
    } else
      return (
        <View style={styles.container}>
          <View style={styles.spacing} />
          <View>
            <BackButton navigation={this.props.navigation} />
          </View>
          <View style={styles.spacingXL} />
          <View style={styles.spacingXL} />

          {/* <VerifyPhone type={'account'} navigation={this.props.navigation} /> */}
          <Text style={styles.titleText}>Verify Code</Text>
          <View style={styles.spacing} />

          <Text style={styles.textGray}>
            Code is sent to {this.state.phoneNumber}
          </Text>
          <View style={styles.spacing} />
          {/* <View style={styles.spacing} /> */}

          <View>
            <OTPInputView
              ref={e => (this.otpInputRef = e)}
              pinCount={6}
              style={{width: '100%', height: 100}}
              autoFocusOnLoad={false}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              code={this.state.code}
              editable
              keyboardAppearance={'default'}
              keyboardType={'number-pad'} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={c =>
                this.setState({
                  code: c,
                })
              }
              // onCodeFilled={c => {
              //   this.confirmCode(c);
              // }}
            />
          </View>
          <View style={styles.spacing} />
          {/* <View style={styles.spacing} /> */}

          <View style={{alignSelf: 'center', alignItems: 'center'}}>
            {this.state.timer ? (
              <CountdownCircleTimer
                isPlaying
                size={50}
                strokeWidth={5}
                duration={60}
                onComplete={this.handleCompleteTimer}
                colors={[
                  ['#004777', 0.4],
                  ['#F7B801', 0.4],
                  ['#A30000', 0.2],
                ]}>
                {({remainingTime, animatedColor}) => (
                  <Animated.Text style={{color: animatedColor}}>
                    {remainingTime}
                  </Animated.Text>
                )}
              </CountdownCircleTimer>
            ) : (
              <>
                <Text style={[styles.textGray, {marginBottom: 3}]}>
                  Didn’t recieve code?
                </Text>
                <TouchableOpacity>
                  <Text
                    style={[
                      styles.primaryText,
                      {textDecorationLine: 'underline', fontWeight: 'bold'},
                    ]}>
                    Resend OTP
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          <View style={styles.spacing} />
          <View style={styles.spacing} />
          <View style={styles.spacing} />
          <View style={styles.spacing} />
          <TouchableOpacity
            style={[styles.primaryBtn, styles.boxShadow]}
            onPress={this.confirmCode}>
            {this.state.loading ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text style={styles.btnText}>Verify Code</Text>
            )}
          </TouchableOpacity>
        </View>
      );
  }
}

export default ResetPassword;
