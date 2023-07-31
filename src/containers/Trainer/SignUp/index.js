import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import { colors } from '@config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PhoneInput from 'react-native-phone-number-input';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { connect } from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import { RNS3 } from 'react-native-aws3';
import { options } from '@config';
import { ActivityIndicator } from 'react-native-paper';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DropDownInput } from '@components';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      fileLoading: false,
      showSpecialization: false,
      specilizationList: [
        {
          id: '0',
          title: 'Martial Art',
        },
        {
          id: '1',
          title: 'Burn Fat',
        },
        {
          id: '2',
          title: 'Become Fat',
        },
        {
          id: '3',
          title: 'jym specialist',
        },
        {
          id: '4',
          title: 'Weight Lifting',
        },

      ],

    };
  }

  componentDidMount() {
    navigator.geolocation = require('@react-native-community/geolocation');
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

  generateUID = () => {
    var d = new Date().getTime(); //Timestamp
    var d2 =
      (typeof performance !== 'undefined' &&
        performance.now &&
        performance.now() * 1000) ||
      0; //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      },
    );
  };

  getLatLong = (data, details) => {
    let lat = details.geometry.location.lat.toString();
    let lng = details.geometry.location.lng.toString();
    this.addUserForm('latlng', {
      latitude: lat,
      longitude: lng,
    });
  };

  handlePickFile = async () => {
    console.log('pressed');
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const file = {
        uri: res[0].fileCopyUri,
        name: this.generateUID() + '.jpg',
        type: 'image/jpeg',
      };

      this.setState({
        fileLoading: true,
      });
      RNS3.put(file, options).then(response => {
        if (response.status !== 201) {
          alert('Failed to upload file.');
        } else {
          this.addUserForm(
            'certificateUrl',
            response.body.postResponse.location,
          );
        }
        //certificateUrl

        this.setState({
          fileLoading: false,
          file: {
            url: res[0].fileCopyUri,
            type: res[0].type, // mime type
            name: res[0].name,
            size: res[0].size,
          },
        });
        if (response.status !== 201) {
        }
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
        this.setState({
          fileLoading: false,
        });
      } else {
        this.setState({
          fileLoading: false,
        });
        throw err;
      }
    }
  };

  validation = () => {
    let flag = true;
    let array = [
      'fullName',
      'email',
      'phoneNumber',
      'password',
      'gymAffiliation',
      'experience',
      'specialization',
      'description',
      'latlng',
    ];
    let form = Object.assign({}, this.props.form);

    array.map((item, key) => {
      if (!Object.keys(form).some(index => index === item)) {
        this.setState({ [item]: true });
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
          this.setState({ [item]: true });
          flag = false;
        } else {
          this.setState({ [item]: false });
        }
      }
    });

    if (flag) {
      if (this.props.form.password && this.props.form.password.length >= 6) {
        this.register();
      }
    }
  };

  register = () => {
    this.props.navigation.navigate('VerifyAccount');
  };


  handleOnChange = (key, value) => {
    this.setState({
      showSpecialization: false
    });
    const {form} = this.state;
    let newObj = Object.assign({}, form);
    newObj[key] = value;

    // this.setState({
    //   form: newObj,
    // });
    this.addUserForm(key,value);
  };

  render() {
    const { form } = this.props;
    console.log('form', form);
    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        style={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.spacing} />

        <View style={styles.spacing} />
        <View style={styles.spacing} />
        <View style={styles.spacing} />

        <Text style={styles.titleText}>Register</Text>
        <View style={styles.spacingXL} />

        <View style={[styles.inline, { justifyContent: 'space-between' }]}>
          <Text
            style={[
              styles.inputTitle,
              { fontSize: responsiveFontSize(2), fontWeight: '500' },
            ]}>
            Upload certificate
          </Text>
          <TouchableOpacity onPress={this.handlePickFile}>
            {this.state.fileLoading ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <Image
                source={require('@images/upload.png')}
                style={styles.image}
              />
            )}
          </TouchableOpacity>
        </View>



        {this.state.file.name && this.state.file.name !== '' ? (
          <Text>{this.state.file.name}</Text>
        ) : null}
        <View style={styles.spacingXL} />

        <View>
          <Text style={styles.inputTitle}>Full Name</Text>
          <TextInput
            style={[
              styles.textinputrounded,
              this.state.fullName ? { borderColor: 'red', borderWidth: 1 } : {},
            ]}
            onChangeText={text => this.addUserForm('fullName', text)}
            value={form.fullName}
            placeholder="Full Name"
          />
        </View>
        <View style={styles.spacing} />
        <View>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            style={[
              styles.textinputrounded,
              this.state.email ? { borderColor: 'red', borderWidth: 1 } : {},
            ]}
            onChangeText={text => this.addUserForm('email', text)}
            value={form.email}
            placeholder="example@gmail.com"
          />
        </View>
        <View style={styles.spacing} />
        <View>
          <Text style={styles.inputTitle}>Phone Number</Text>
          <View
            style={[
              styles.textinputrounded,
              { paddingHorizontal: 0 },
              this.state.phoneNumber
                ? { borderColor: 'red', borderWidth: 1 }
                : {},
            ]}>
            <PhoneInput
              placeholder="123-456-789"
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
              // onChangeFormattedText={text =>
              //   this.addUserForm('phoneNumber', text)
              // }
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
              this.state.password ? { borderColor: 'red', borderWidth: 1 } : {},
            ]}
            onChangeText={text => this.addUserForm('password', text)}
            value={form.password}
            placeholder="..........."
          />
        </View>

        {form.password &&
          form.password.length > 0 &&
          form.password.length < 6 ? (
          <Text style={{ color: colors.danger }}>
            * Must be atleast 6 characters
          </Text>
        ) : null}

        <View style={styles.spacing} />
        <View>
          <Text style={styles.inputTitle}>Gym Affiliation</Text>
          <TextInput
            style={[
              styles.textinputrounded,
              this.state.gymAffiliation
                ? { borderColor: 'red', borderWidth: 1 }
                : {},
            ]}
            onChangeText={text => this.addUserForm('gymAffiliation', text)}
            value={form.gymAffiliation}
            placeholder="City gym"
          />
        </View>

        <View style={styles.spacing} />
        <View>
          <Text style={styles.inputTitle}>Experience</Text>
          <TextInput
            style={[
              styles.textinputrounded,
              this.state.experience ? { borderColor: 'red', borderWidth: 1 } : {},
            ]}
            onChangeText={text => this.addUserForm('experience', text)}
            value={form.experience}
            placeholder="5 years"
          />
        </View>

        <View style={styles.spacing} />
        <View>
          <Text style={styles.inputTitle}>Description</Text>
          <TextInput
            style={[
              styles.textinputrounded,
              this.state.specialization
                ? { borderColor: 'red', borderWidth: 1 }
                : {},
            ]}
            onChangeText={text => this.addUserForm('description', text)}
            value={form.description}
            placeholder="Description"
          />
        </View>

        {console.log("\n\n list ==> ", this.state.specilizationList)}

        <DropDownInput
          HeadingTitle="Specializaition"
          list={this.state.specilizationList}
          title={form.specialization}
          showPicker={this.state.showSpecialization}
          onPressPicker={() => this.setState({ showSpecialization: !this.state.showSpecialization })}
          onSelect={item => this.handleOnChange('specialization', item.title)}
        />

        <View style={styles.spacing} />

        <Text style={styles.inputTitle}>Address</Text>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          listViewDisplayed={false}
          onFail={error => console.error(error)}
          onPress={(data, details = null) => this.getLatLong(data, details)}
          query={{
            key: 'AIzaSyDbL0YfTbBkhxHkxZ92jGjQL3lSHBg48SE',
            language: 'en',
          }}
          styles={{
            container: {
              width: '100%',
              borderWidth: this.state.latlng ? 1 : 0,
              borderColor: this.state.latlng ? 'red' : '',
              backgroundColor: colors.lightGray,
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
              borderBottomLeftRadius: 6,
              borderBottomRightRadius: 6,
              marginTop: 10,
              justifyContent: 'center',
            },
            listView: {
              backgroundColor: 'transparent',
              borderRadius: 5,
              flex: 1,
              elevation: 3,
              margin: 0,
            },

            textInput: {
              backgroundColor: colors.lightGray,
              color: colors.black,
              fontSize: 15,
            },
          }}
          currentLocation={true}
          currentLocationLabel="Current location"
        />

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

        <View style={[styles.inline, { alignSelf: 'center', marginBottom: 35 }]}>
          <Text style={[styles.text, { marginRight: 6 }]}>
            Already have an account
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Signin')}>
            <Text
              style={[
                styles.textBold,
                { color: colors.primary, fontWeight: 'bold' },
              ]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({ User }) => {
  return {
    form: User.form,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require('@redux/UserRedux');
  return {
    ...ownProps,
    ...stateProps,
    addUserForm: data => {
      dispatch(actions.addUserForm(data));
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(SignUp);
