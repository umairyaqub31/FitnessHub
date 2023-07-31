import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Animated,
} from 'react-native';
import styles from './styles';
import {colors} from '@config';
import {connect} from 'react-redux';
import PhoneInput from 'react-native-phone-number-input';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {VerifyPhone, BackButton} from '@components';
import auth from '@react-native-firebase/auth';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

class VerifyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wcPhoneNumber: '',
      flag: false,
      loading: false,
      confirm: null,
      code: '',
      timer: false,
    };
  }

  // componentDidMount = () => {};

  componentDidMount() {
    // this.authFirebaseListener = auth().onAuthStateChanged(user => {
    //   console.log('herereeeee.........');
    //   // this.setState({
    //   //   loading: false,  // For the loader maybe
    //   //   user, // User Details
    //   //   isAuth: true
    //   // });
    // });
    this.props.clearErrors();
  }

  componentDidUpdate() {
    auth().onAuthStateChanged(user => {
      if (user) {
        // if user data exist

        //clear previous user session
        this.logOutFirebase();
      }
    });
  }

  logOutFirebase = () => {
    auth().signOut();
  };

  handleCompleteTimer = () => {
    this.setState({
      timer: false,
    });
  };

  signInWithPhoneNumber = async () => {
    const {form} = this.props;
    if (
      form.phoneNumber &&
      form.phoneNumber !== null &&
      form.phoneNumber !== ''
    ) {
      let pNumber = '';
      if (form.country) {
        pNumber = '+' + form.country.callingCode[0] + form.phoneNumber;
      } else {
        pNumber = '+92' + form.phoneNumber;
      }

      this.setState({
        loading: true,
        timer: true,
      });

      // auth().settings.appVerificationDisabledForTesting = true;

      try {
        const confirmation = await auth().signInWithPhoneNumber(pNumber);
        this.setState({
          confirm: confirmation,
          loading: false,
        });
      } catch (err) {
        console.log('num errr....', err);
        Alert.alert(
          'Invalid Phone Number!',
          'Please Enter a valid Phone Number.',
          [{text: 'OK', onPress: () => this.setState({loading: false})}],
        );
        this.setState({
          timer: false,
          loading: false,
        });
      }
    } else {
      this.setState({flag: true});
    }
  };
  confirmCode = async () => {
    const {code, confirm} = this.state;
    const {form} = this.props;
    try {
      this.setState({
        loading: true,
      });

      const confirmed = await confirm.confirm(code);
      console.log('done...........');
      // if (confirmed) {
      const res = await this.props.register(form, 'trainee');
      if (res == true) {
        this.setState({
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
        });
      }
      // }
    } catch (error) {
      console.log('error.........', error);
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

  handlePhoneChange = text => {
    this.setState({
      wcPhoneNumber: text,
      flag: false,
    });
  };

  addUserForm = (key, value) => {
    let form = Object.assign({}, this.props.form);
    form[key] = value;
    this.props.addUserForm(form);
  };

  render() {
    const {form, message} = this.props;

    let pNumber = '';
    if (form.country) {
      pNumber = '+' + form.country.callingCode[0] + form.phoneNumber;
    } else {
      pNumber = '+92' + form.phoneNumber;
    }

    if (!this.state.confirm) {
      return (
        <View style={styles.container}>
          <View style={styles.spacing} />
          <View>
            <BackButton navigation={this.props.navigation} />
          </View>
          <View style={styles.spacingXL} />
          <View style={styles.spacingXL} />
          <Text style={styles.titleText}>Continue with</Text>
          <Text style={[styles.titleText, {marginTop: 8}]}>Phone</Text>
          <View style={styles.spacing} />
          <View style={styles.spacing} />

          <Text style={styles.textGray}>You’ll receive 6 digit code</Text>
          <Text style={styles.textGray}>to verify next.</Text>
          <View style={styles.spacing} />

          <View style={styles.spacing} />

          <Text style={styles.inputTitle}>Phone Number</Text>
          <View
            style={[
              styles.textinputrounded,
              this.state.flag ? {borderColor: 'red', borderWidth: 1} : {},
            ]}>
            <PhoneInput
              disabled
              placeholder="123-456-789"
              textInputStyle={{height: 42}}
              textContainerStyle={{
                backgroundColor: colors.lightGray,
              }}
              containerStyle={{
                backgroundColor: colors.lightGray,
              }}
              defaultValue={form.phoneNumber}
              defaultCode={form.country ? form.country.cca2 : 'PK'}
              layout="first"
              withDarkTheme={false}
              // onChangeText={text => this.handlePhoneChange(text)}
              // onChangeFormattedText={text =>
              //   this.addUserForm('phoneNumber', text)
              // }
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
              <Text style={styles.btnText}>Continue</Text>
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
          <Text style={styles.titleText}>Verify Phone</Text>
          <View style={styles.spacing} />

          <Text style={styles.textGray}>Code is sent to {pNumber}</Text>
          <View style={styles.spacing} />
          {message !== '' ? (
            <Text style={{color: colors.danger}}>* {message}</Text>
          ) : null}
          {/* <View style={styles.spacing} /> */}

          <View>
            <OTPInputView
              ref={e => (this.otpInputRef = e)}
              pinCount={6}
              style={{width: '100%', height: 100}}
              autoFocusOnLoad={false}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              // code={this.state.code}
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
                strokeWidth={4}
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
                <TouchableOpacity onPress={this.signInWithPhoneNumber}>
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
              <Text style={styles.btnText}>Verify Account</Text>
            )}
          </TouchableOpacity>
        </View>
      );
  }
}

const mapStateToProps = ({User}) => {
  return {
    form: User.form,
    message: User.message,
    status: User.status,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;
  const {actions} = require('@redux/UserRedux');
  return {
    ...ownProps,
    ...stateProps,
    addUserForm: data => {
      dispatch(actions.addUserForm(data));
    },
    register: (data, type) => {
      const result = actions.register(dispatch, data, type);
      return result;
    },
    clearErrors: () => {
      actions.clearErrors(dispatch);
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(VerifyAccount);
