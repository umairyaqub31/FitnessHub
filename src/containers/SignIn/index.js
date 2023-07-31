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
  PermissionsAndroid,
} from 'react-native';
import styles from './styles';
import {colors} from '@config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AccessToken, LoginManager, Profile} from 'react-native-fbsdk-next';
import {connect} from 'react-redux';

import Geolocation from 'react-native-geolocation-service';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: '',
        password: '',
      },
      loading: false,
      fbLoading: false,
      latitude: null,
      longitude: null,
    };
  }

  async componentDidMount() {
    const {navigation} = this.props;

    this._unsubscribe = navigation.addListener('focus', () => {
      // do something
      this.props.clearErrors();
    });

    this.getCurrentLocation();
  }

  getCurrentLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This App needs access to your location ' +
            'Please allow to use location.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use locations ');
        Geolocation.getCurrentPosition(
          position => {
            console.log('locat....', position);
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            this.addUserForm('latlng', {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        console.log('Location permission denied');
        // alert('Go to setting and give location permission first!');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  addUserForm = (key, value) => {
    let form = Object.assign({}, this.props.form);

    if (key === 'email') {
      form[key] = value.trim();
    } else {
      form[key] = value;
    }

    this.props.addUserForm(form);
  };

  componentWillUnmount() {
    this._unsubscribe();
  }
  handleLoginWithGoogle = async () => {
    this.setState({
      loading: true,
    });
    try {
      GoogleSignin.configure({
        webClientId:
          '584386922348-ipiah146d1fdiqed6vddffbcevrgbc1l.apps.googleusercontent.com',
      });
      //   {
      //   iosClientId:
      //     '5201841271-cjr5qbbtk1bot6p991n2htcf1lg9cbuq.apps.googleusercontent.com',
      // }

      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();
      // console.log('gooogle...', userInfo);

      if (userInfo.idToken && userInfo.idToken !== null) {
        const data = {
          name: userInfo.user.name,
          email: userInfo.user.email,
          imageUrl: userInfo.user.photo,
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          source: 'google',
          type: 'trainee',
        };

        const res = await this.props.socialLogin(data);
        if (res == true) {
          this.setState({
            loading: false,
          });
        } else {
          this.setState({
            loading: false,
          });
        }
      }
    } catch (e) {
      this.setState({
        loading: false,
      });
      console.log('google login failed', e);
    }
  };

  handleLoginWithFacebook = async () => {
    this.setState({
      fbLoading: true,
    });
    try {
      await LoginManager.logOut();
      const res = await LoginManager.logInWithPermissions([
        'email',
        'public_profile',
      ]);
      if (res.isCancelled) {
        console.log('facebook login cancelled');
        this.setState({
          fbLoading: false,
        });
        return;
      }

      const tokens = await AccessToken.getCurrentAccessToken();
      console.log('facebook login', tokens);
      this.initUser(tokens.accessToken);
    } catch (e) {
      console.log('facebook login failed', e);
    } finally {
      // this.setState({
      //   fbLoading: false,
      // });
    }
  };

  initUser = async token => {
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=email,name,location,first_name,picture,friends&access_token=' +
        token,
    )
      .then(response => response.json())
      .then(async json => {
        const data = {
          name: json.name,
          email: json.email,
          imageUrl: json.url,
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          source: 'facebook',
          type: 'trainee',
        };
        const res = await this.props.socialLogin(data);
        this.setState({
          fbloading: false,
        });
        if (res == true) {
          this.setState({
            fbloading: false,
          });
        } else if (res == false) {
          this.setState({
            fbloading: false,
          });
        }
      })
      .catch(err => {
        this.setState({
          fbloading: false,
        });
        console.log('ERROR GETTING DATA FROM FACEBOOK', err);
      });
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

  validation = () => {
    let flag = true;
    let array = ['username', 'password'];
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
      this.login();
    }
  };

  login = () => {
    const {form} = this.state;
    // console.log(username, password);
    let data = {
      email: form.username.trim(),
      password: form.password.trim(),
      type: 'trainee',
    };
    this.props.login(data);
  };
  render() {
    const {message} = this.props;
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.spacing} />
        <Image
          style={styles.image}
          source={require('@images/logo-group.png')}
        />
        <View style={styles.spacingXL} />
        <View style={styles.spacingXL} />

        <Text style={styles.titleText}>Login</Text>
        <View style={styles.spacing} />

        {message !== '' ? (
          <Text style={{color: colors.danger}}>* {message}</Text>
        ) : null}

        <View style={styles.spacing} />

        <View>
          <Text style={styles.inputTitle}>User Name</Text>
          <TextInput
            style={[
              styles.textinputrounded,
              this.state.username ? {borderColor: 'red', borderWidth: 1} : {},
            ]}
            onChangeText={text => this.handleOnChange('username', text)}
            value={this.state.form.username}
            placeholderTextColor={colors.gray}
            placeholder="example@gmail.com"
          />
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
            onChangeText={text => this.handleOnChange('password', text)}
            value={this.state.form.password}
            placeholderTextColor={colors.gray}
            placeholder="........"
          />
        </View>
        <View style={styles.spacing} />
        <TouchableOpacity
          style={{
            flexWrap: 'wrap-reverse',
            alignSelf: 'flex-end',
          }}
          onPress={() => this.props.navigation.navigate('ResetPassword')}>
          <Text style={[styles.inputTitle, {fontWeight: '500'}]}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <View style={styles.spacing} />

        <TouchableOpacity
          style={[styles.primaryBtn, styles.boxShadow]}
<<<<<<< HEAD
          // onPress={this.login}
=======
>>>>>>> 1de6d9db70bee3570ae3bac3d39606aabc6896d1
          onPress={this.validation}>
          {this.props.isLoading ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <Text style={styles.btnText}>Login</Text>
          )}
        </TouchableOpacity>
        <View style={styles.spacingXL} />
        <View style={styles.spacingXL} />
        <TouchableOpacity
          style={[styles.roundBtn, styles.boxShadow]}
          onPress={this.handleLoginWithFacebook}>
          {this.state.fbLoading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <>
              <Image
                style={styles.btnImage}
                source={require('@images/facebook.png')}
              />
              <Text style={styles.textBold}>Login with Facebook</Text>
            </>
          )}
        </TouchableOpacity>
        <View style={styles.spacing} />

        <TouchableOpacity
          style={[styles.roundBtn, styles.boxShadow]}
          onPress={this.handleLoginWithGoogle}>
          {this.state.loading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <>
              <Image
                style={styles.btnImage}
                source={require('@images/gmail.png')}
              />

              <Text style={styles.textBold}>Login with Gmail</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.spacing} />
        <View style={styles.spacing} />

        <View style={[styles.inline, {alignSelf: 'center', marginBottom: 35}]}>
          <Text style={[styles.text, {marginRight: 6}]}>
            Don't have an account
          </Text>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Signup', {
                location: {
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                },
                getCurrentLocation: this.getCurrentLocation,
              })
            }>
            <Text
              style={[
                styles.textBold,
                {color: colors.primary, fontWeight: 'bold'},
              ]}>
              SignUp
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({User}) => {
  return {
    token: User.token,
    isLoading: User.isLoading,
    message: User.message,
    status: User.status,
    user: typeof User.user !== 'undefined' ? User.user : {},
    form: User.form,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;
  const {actions} = require('@redux/UserRedux');
  return {
    ...ownProps,
    ...stateProps,
    login: data => {
      actions.login(dispatch, data);
    },
    socialLogin: data => {
      const response = actions.socialLogin(dispatch, data);
      return response;
    },
    clearErrors: () => {
      actions.clearErrors(dispatch);
    },
    addUserForm: data => {
      dispatch(actions.addUserForm(data));
    },
  };
};

export default connect(mapStateToProps, null, mergeProps)(SignIn);
