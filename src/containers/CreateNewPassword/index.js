import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BackButton} from '@components';
import {connect} from 'react-redux';
import {colors} from '@config';
import {Use} from 'react-native-svg';

class CreateNewPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        newPassword: '',
        confirmPassword: '',
      },
      error: '',
    };
  }

  validation = () => {
    console.log('submit...', this.state.form);
    let flag = true;
    let array = ['newPassword', 'confirmPassword'];
    let form = Object.assign({}, this.state.form);

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

    if (flag) {
      this.handleReset();
    }
  };

  handleOnChange = (key, value) => {
    this.props.clearErrors();
    const {form} = this.state;
    let newObj = Object.assign({}, form);
    newObj[key] = value;

    this.setState({
      form: newObj,
    });
  };

  handleReset = async () => {
    const {form} = this.state;
    const {phoneNumber} = this.props.route.params;
    const result = form.newPassword.localeCompare(form.confirmPassword);

    // 0 for equal

    let data = {
      phoneNumber: phoneNumber,
      password: form.newPassword,
      type: 'trainee',
    };

    if (form.newPassword.length >= 6 && result == 0) {
      console.log('res....', result);
      const response = await this.props.resetPassword(data);
      if (response == true) {
        alert('Password Changed!');
        this.props.navigation.navigate('Signin');
      }

      // if (this.props.acknowledge) {
      //   Alert.alert('Successful!', 'Password updated.', [
      //     {
      //       text: 'OK',
      //       onPress: () => {
      //         this.props.clearErrors();
      //       },
      //     },
      //   ]);
      // }
    } else {
      this.setState({error: "Password doesn't match."});
    }
  };

  render() {
    const {message} = this.props;
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.spacing} />
        <View>
          <BackButton navigation={this.props.navigation} />
        </View>
        <View style={styles.spacing} />
        <View style={styles.spacing} />

        <Text style={styles.titleText}>Create New</Text>
        <Text style={styles.titleText}>Password</Text>

        <View style={styles.spacing} />

        <Text style={styles.textGray}>Your password must be different</Text>
        <Text style={styles.textGray}>from previous used password.</Text>
        <View style={styles.spacing} />
        {message !== '' ? (
          <Text style={{color: colors.danger}}>* {message}</Text>
        ) : null}
        <View style={styles.spacing} />

        <View>
          <Text style={styles.inputTitle}>New Password</Text>
          <TextInput
            secureTextEntry
            style={[
              styles.textinputrounded,
              this.state.newPassword
                ? {borderColor: 'red', borderWidth: 1}
                : {},
            ]}
            onChangeText={text => this.handleOnChange('newPassword', text)}
            value={this.state.form.newPassword}
            placeholder="..........."
          />
        </View>

        {this.state.form.newPassword.length > 0 &&
        this.state.form.newPassword.length < 6 ? (
          <Text style={{color: colors.danger}}>
            * Must be atleast 6 characters
          </Text>
        ) : null}

        <View style={styles.spacing} />
        <View style={styles.spacing} />
        <View>
          <Text style={styles.inputTitle}>Confirm Password</Text>
          <TextInput
            secureTextEntry
            style={[
              styles.textinputrounded,
              ,
              this.state.confirmPassword
                ? {borderColor: 'red', borderWidth: 1}
                : {},
            ]}
            onChangeText={text => this.handleOnChange('confirmPassword', text)}
            value={this.state.form.confirmPassword}
            placeholder="..........."
          />
          {this.state.error !== '' && this.state.error.length > 0 ? (
            <Text style={{color: colors.danger}}>* {this.state.error}</Text>
          ) : null}
        </View>

        <View style={styles.spacing} />
        <View style={styles.spacing} />
        <View style={styles.spacing} />

        <TouchableOpacity
          style={[styles.primaryBtn, styles.boxShadow, {marginBottom: 30}]}
          onPress={this.validation}>
          {this.props.isLoading ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <Text style={styles.btnText}>Reset Password</Text>
          )}
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({User}) => {
  return {
    isLoading: User.isLoading,
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

    resetPassword: data => {
      const res = actions.resetPassword(dispatch, data);
      return res;
    },
    clearErrors: () => {
      actions.clearErrors(dispatch);
    },
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mergeProps,
)(CreateNewPassword);
