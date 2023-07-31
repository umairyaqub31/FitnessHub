import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {colors} from '@config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PhoneInput from 'react-native-phone-number-input';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {connect, useSelector} from 'react-redux';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addUserForm = (key, value) => {
    let form = Object.assign({}, this.props.form);

    if (key === 'email') {
      form[key] = value.trim();
    } else {
      form[key] = value;
    }

    this.props.addUserForm(form);
  };

  validation = () => {
    console.log('submit...', this.props.form);
    let flag = true;
    let array = ['fullName', 'email', 'password', 'phoneNumber'];
    let form = Object.assign({}, this.props.form);

    array.map((item, key) => {
      if (!Object.keys(form).some(index => index === item)) {
        this.setState({[item]: true});
        flag = false;
      }
    });
    Object.keys(form).map(item => {
      if (array.some(index => index === item)) {
        if (
          form[item] === null ||
          form[item] === 'null' ||
          form[item] === '' ||
          form[item].length === 0
        ) {
          this.setState({[item]: true});
          flag = false;
        } else {
          this.setState({[item]: false});
        }
      }
    });
    // const {location} = this.props.route.params;
    // console.log('loc', location);

    // let lat = null;
    // let lng = null;

    // if (location.latitude !== null || location.longitude !== null) {
    //   lat = location.latitude.toString();
    //   lng = location.longitude.toString();

    //   this.addUserForm('latlng', {
    //     latitude: lat,
    //     longitude: lng,
    //   });
    // }

    // console.log('paasss....', this.props.form.password);

    if (flag) {
      if (
        this.props.form.password &&
        this.props.form.password !== undefined &&
        this.props.form.password.length >= 6
      ) {
        if (
          this.props.form.latlng &&
          (this.props.form.latlng.latitude !== null ||
            this.props.form.latlng.longitude !== null)
        ) {
          this.register();
        } else {
          this.getCurrentLocation();
        }
      }
    }
  };

  getCurrentLocation = () => {
    this.props.route.params.getCurrentLocation();
  };

  register = () => {
    this.props.navigation.navigate('VerifyAccount');
  };

  render() {
    const {form} = this.props;
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.spacing} />

        <View style={styles.spacing} />
        <View style={styles.spacing} />
        <View style={styles.spacing} />

        <Text style={styles.titleText}>Register</Text>
        <View style={styles.spacing} />
        <View style={styles.spacing} />

        <View>
          <Text style={styles.inputTitle}>Full Name</Text>
          <TextInput
            style={[
              styles.textinputrounded,
              this.state.fullName ? {borderColor: 'red', borderWidth: 1} : {},
            ]}
            onChangeText={text => this.addUserForm('fullName', text)}
            value={form.fullName}
            placeholderTextColor={colors.gray}
            placeholder="Full Name"
          />
        </View>
        <View style={styles.spacing} />
        <View>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            style={[
              styles.textinputrounded,
              this.state.email ? {borderColor: 'red', borderWidth: 1} : {},
            ]}
            onChangeText={text => this.addUserForm('email', text)}
            value={form.email}
            placeholderTextColor={colors.gray}
            placeholder="example@gmail.com"
          />
        </View>
        <View style={styles.spacing} />
        <View>
          <Text style={styles.inputTitle}>Phone Number</Text>
          <View
            style={[
              styles.textinputrounded,
              {paddingHorizontal: 0},
              this.state.phoneNumber
                ? {borderColor: 'red', borderWidth: 1}
                : {},
            ]}>
            <PhoneInput
              placeholder="123-456-789"
              placeholderTextColor={colors.gray}
              textInputStyle={{
                height: responsiveHeight(6.5),
                paddingTop: 13,
              }}
              textContainerStyle={{
                backgroundColor: colors.lightGray,
                height: responsiveHeight(6),
              }}
              codeTextStyle={{
                fontSize: responsiveFontSize(1.7),
              }}
              containerStyle={{
                backgroundColor: colors.lightGray,
                height: responsiveHeight(6),
              }}
              defaultValue={form.phoneNumber}
              onChangeCountry={text => this.addUserForm('country', text)}
              onChangeText={text => this.addUserForm('phoneNumber', text)}
              // onChangeFormattedText={text => this.onChange('phoneNumber', text)}
              defaultCode={form.country ? form.country.cca2 : 'PK'}
              layout="first"
              withDarkTheme={false}
            />
          </View>
        </View>
        <View style={styles.spacing} />
        <View>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            secureTextEntry
            style={[
              styles.textinputrounded,
              this.state.password ? {borderColor: 'red', borderWidth: 1} : {},
            ]}
            onChangeText={text => this.addUserForm('password', text)}
            value={form.password}
            placeholderTextColor={colors.gray}
            placeholder="..........."
          />
        </View>

        {form.password &&
        form.password.length > 0 &&
        form.password.length < 6 ? (
          <Text style={{color: colors.danger}}>
            * Must be atleast 6 characters
          </Text>
        ) : null}

        <View style={styles.spacingXL} />
        <View style={styles.spacingXL} />

        <TouchableOpacity
          style={[styles.primaryBtn, styles.boxShadow]}
          // onPress={this.register}
          onPress={this.validation}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>

        <View style={styles.spacingXL} />
        <View style={styles.spacingXL} />

        <View style={[styles.inline, {alignSelf: 'center', marginBottom: 35}]}>
          <Text style={[styles.text, {marginRight: 6}]}>
            Already have an account
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Signin')}>
            <Text
              style={[
                styles.textBold,
                {color: colors.primary, fontWeight: 'bold'},
              ]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({User}) => {
  return {
    form: User.form,
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
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(SignUp);
