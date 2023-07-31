import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MapView, {MAP_TYPES, ProviderPropType, Marker} from 'react-native-maps';
import styles from './styles';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '@config';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const {width, height} = Dimensions.get('window');

import {Modalize} from 'react-native-modalize';
import {Host, Portal} from 'react-native-portalize';
import Geolocation from 'react-native-geolocation-service';
import {connect} from 'react-redux';

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

navigator.geolocation = require('@react-native-community/geolocation');

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
    this.tModalRef = React.createRef();
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', this.focus);
    this.setCurrentLocation();
  }

  focus = () => {
    this.props.navigation
      .dangerouslyGetParent()
      ?.setOptions({tabBarVisible: true});
  };

  openTrainerModal = () => {
    this.tModalRef.current?.open();
  };
  onRegionChange(region) {
    this.setState({region});
  }

  goToPackages = () => {
    this.tModalRef.current?.close();
    this.props.navigation.navigate('Packages');
  };

  setCurrentLocation = () => {
    const {user} = this.props;
    Geolocation.getCurrentPosition(
      position => {
        // console.log('locat....', position);
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };

        this.mapRef.current.animateToRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });

        this.setState({region});

        const data = {
          user,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        };
        this.props.getTrainerByLocation(data);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  getLatLong = (data, details) => {
    let lat = details.geometry.location.lat;
    let lng = details.geometry.location.lng;

    const region = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0922 * ASPECT_RATIO,
    };
    this.mapRef.current.animateToRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
    this.setState({region});

    // this.addUserForm('latlng', {
    //   latitude: lat,
    //   longitude: lng,
    // });
  };
  render() {
    return (
      <View style={{flex: 0.6}}>
        <MapView.Animated
          provider={this.props.provider}
          ref={this.mapRef}
          mapType={MAP_TYPES.STANDARD}
          style={{height: height}}
          initialRegion={this.state.region}
          onRegionChange={region => this.onRegionChange(region)}>
          <Marker
            coordinate={{latitude: LATITUDE, longitude: LONGITUDE}}
            onPress={this.openTrainerModal}
            // image={require('@images/marker1.png')}
          >
            <Image
              source={require('@images/marker2.png')}
              style={styles.markerItemImg}
            />
            <Image
              source={require('@images/marker.png')}
              style={styles.markerItemBkg}
            />
          </Marker>
          <Marker
            coordinate={{latitude: 37.78824, longitude: -122.452}}
            // image={require('@images/marker1.png')}
          >
            <Image
              source={require('@images/marker1.png')}
              style={styles.markerItemImg}
            />
            <Image
              source={require('@images/marker.png')}
              style={styles.markerItemBkg}
            />
          </Marker>
        </MapView.Animated>
        <Fragment>
          <GooglePlacesAutocomplete
            placeholder="Trainer"
            fetchDetails={true}
            listViewDisplayed={false}
            renderLeftButton={() => (
              <Feather name="search" size={20} style={{alignSelf: 'center'}} />
            )}
            onFail={error => console.error(error)}
            onPress={(data, details = null) => this.getLatLong(data, details)}
            query={{
              key: 'AIzaSyDbL0YfTbBkhxHkxZ92jGjQL3lSHBg48SE',
              language: 'en',
            }}
            styles={{
              container: {
                position: 'absolute',
                top: 50,
                width: '75%',
                // height: 60,
                alignSelf: 'center',
                backgroundColor: colors.white,
                borderRadius: 30,
                paddingHorizontal: 20,
              },
              textInput: {
                backgroundColor: colors.white,
                color: colors.black,
                fontSize: 15,
                borderRadius: 30,
                height: 60,
                marginBottom: 0,
              },

              listView: {
                backgroundColor: 'transparent',
                borderRadius: 30,
                width: '100%',
                flex: 1,
                // elevation: 3,
                margin: 0,
              },
              poweredContainer: {
                justifyContent: 'flex-end',
                alignItems: 'center',
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 5,
                borderColor: '#c8c7cc',
                borderTopWidth: 0.5,
              },
            }}
            currentLocation={true}
            currentLocationLabel="Current location"
          />
          {/* <View
            style={[
              styles.customTextInput,
              styles.boxShadow,
              {flexDirection: 'row', alignItems: 'center'},
            ]}>
            <Feather name="search" size={20} />
            <TextInput
              style={{width: '70%', paddingHorizontal: 15}}
              // onChangeText={onChangeNumber}
              // value={number}
              placeholderTextColor={colors.black}
              placeholder="Trainer"
            />
           
            <View style={styles.verticleLine}></View>
            <Image
              source={require('@images/filter.png')}
              style={{width: 22, height: 22, position: 'absolute', right: 20}}
            />
          </View> */}
        </Fragment>

        <Portal>
          <Modalize ref={this.tModalRef} adjustToContentHeight={true}>
            <View>
              <View style={styles.popUpHead}>
                <TouchableOpacity
                  style={styles.touchOpacity}
                  onPress={() => this.tModalRef.current?.close()}>
                  <Entypo name="cross" size={24} color={colors.primary} />
                </TouchableOpacity>
              </View>
              <View style={styles.spacingXL} />
              <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                style={styles.scrolledview}>
                <Image
                  source={require('@images/handsome-man-detail.png')}
                  style={{width: '100%', height: 250, borderRadius: 20}}
                />
                <View style={styles.spacingXL} />
                <View style={styles.inline}>
                  <View style={{width: '80%'}}>
                    <Text style={styles.titleText}>Paul Smith</Text>
                    <View style={styles.spacing} />
                    <Text numberOfLines={2} style={styles.textgray}>
                      1708 Innovation Dr, Kelowna, BC V1V 2Y4, United Kingdom
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: 'rgba(0, 204, 82, 0.2)',
                      height: 50,
                      width: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'absolute',
                      right: 10,
                      marginTop: 5,
                      borderRadius: 10,
                    }}>
                    <Ionicons
                      name="bookmark-outline"
                      size={24}
                      color={colors.primary}
                    />
                  </View>
                </View>

                <View style={styles.spacingXL} />
                <View style={styles.spacing} />

                <View style={styles.inline}>
                  <View style={{width: '80%'}}>
                    <Text style={styles.titleText}>Trainer Specialities</Text>
                    <View style={styles.spacing} />
                    <Text numberOfLines={2} style={styles.textgray}>
                      Bodybuilding, Weight Loss, Strengthen & tone
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: 'rgba(0, 204, 82, 0.2)',
                      height: 50,
                      width: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'absolute',
                      right: 10,
                      marginTop: 5,
                      borderRadius: 10,
                    }}>
                    <AntDesign name="star" size={24} color={colors.primary} />
                  </View>
                </View>

                <View style={styles.spacingXL} />
                <View style={styles.spacing} />

                <View style={styles.inline}>
                  <View style={{width: '80%'}}>
                    <Text style={styles.titleText}>Qualifications</Text>
                    <View style={styles.spacing} />
                    <Text numberOfLines={2} style={styles.textgray}>
                      Level 2 Diploma in Health, Fitness, and Exercise
                      Instruction
                    </Text>
                  </View>
                </View>

                <View style={styles.spacingXL} />
                <View style={styles.spacing} />

                <View style={{width: '80%'}}>
                  <Text style={styles.titleText}>Price</Text>
                  <View style={styles.spacing} />
                  <View style={styles.inline}>
                    <Text style={styles.titleText}>£20</Text>
                    <Text style={[styles.textgray, {fontSize: 12}]}>
                      /Perhour
                    </Text>
                  </View>
                </View>

                <View style={styles.spacingXL} />
                <View style={styles.spacing} />

                <View
                  style={[
                    styles.inline,
                    {
                      justifyContent: 'space-between',
                      paddingHorizontal: 20,
                    },
                  ]}>
                  <TouchableOpacity style={styles.primaryBtn}>
                    <Text style={styles.primaryBtnText}>Availability</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.borderBtn}
                    onPress={this.goToPackages}>
                    <Text
                      style={[styles.primaryBtnText, {color: colors.primary}]}>
                      View Package
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </Modalize>
        </Portal>
      </View>
    );
  }
}

const mapStateToProps = ({User, Trainee}) => {
  return {
    user: User.user,
    trainers: Trainee.trainers,
    isFetching: Trainee.isFetching,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;
  const {actions} = require('@redux/TraineeRedux');
  return {
    ...ownProps,
    ...stateProps,
    getTrainerByLocation: data => {
      actions.getTrainerByLocation(dispatch, data);
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(Location);

// getTrainerByLocation
