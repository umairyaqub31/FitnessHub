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
import {colors} from '@config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AccessToken, LoginManager, Profile} from 'react-native-fbsdk-next';
import {connect} from 'react-redux';

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
    };
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

      console.log('google', userInfo);

      if (userInfo.idToken && userInfo.idToken !== null) {
      

        let form = {};
        form.fullName= userInfo.user.name,
        form.email= userInfo.user.email,
        form.type= 'trainer',

      
       

        await this.props.addUserForm(form)
        this.props.navigation.navigate("Signup")

        // const res = await this.props.socialLogin(data);
        // if (res == true) {
        //   this.setState({
        //     loading: false,
        //   });
        // } else {
        //   this.setState({
        //     loading: false,
        //   });
        // }
      }
    } catch (e) {
      console.log('google login failed', e);
      this.setState({
        loading: false,
      });
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

  initUser =async token => {
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=email,name,location,first_name,picture,friends&access_token=' +
        token,
    )
      .then(response => response.json())
      .then(async json => {
        console.log('user....', json);

        let form = {};
        form.fullName= json.name,
        form.email= json.email,
        form.type= 'trainer',

        console.log("\n\n form ===> ", form)
       

        await this.props.addUserForm(form)
        this.props.navigation.navigate("Signup")
        // const res = await this.props.socialLogin(data);
        // console.log('reeeeeeeeee', res);
        // if (res == true) {
        //   this.setState({
        //     fbloading: false,
        //   });
        // } else if (res == false) {
        //   this.setState({
        //     fbloading: false,
        //   });
        // }
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
    console.log('submit...', this.state.form);
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
      type: 'trainer',
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
            onPress={() => this.props.navigation.navigate('Signup')}>
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
    clearErrors: () => {
      actions.clearErrors(dispatch);
    },
    socialLogin: data => {
      const response = actions.socialLogin(dispatch, data);
      return response;
    },
    addUserForm: data => {
      
      dispatch(actions.addUserForm(data));

    },
  };
};

export default connect(mapStateToProps, null, mergeProps)(SignIn);
