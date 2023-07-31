import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Dimensions,
} from 'react-native';

import styles from './styles';
import {BackButton} from '@components';
import {colors} from '@config';
const height = Dimensions.get('window').height;

class SelectedPackage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.navigation.addListener('focus', this.focus);
  }

  focus = () => {
    this.props.navigation
      .dangerouslyGetParent()
      ?.setOptions({tabBarVisible: false});
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <ImageBackground
          source={require('@images/handsome-man-closeup.png')}
          resizeMode="cover"
          style={[styles.backgroundImage, styles.imageContainer]}>
          <View style={{marginTop: 13}}>
            <BackButton navigation={this.props.navigation} />
          </View>
          <View style={styles.spacing} />
          <View style={styles.spacing} />

          <Text style={[styles.titleText, {color: colors.white}]}>
            Selected Package
          </Text>

          <View style={styles.spacing} />
          <View style={styles.spacing} />
          <View style={styles.spacing} />
          <View style={styles.spacing} />

          <View
            style={{
              backgroundColor: colors.primary,
              //   alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 13,
              marginHorizontal: 13,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}>
            <Text style={[styles.textBold, {color: colors.white}]}>
              Selected
            </Text>
          </View>
          <View
            style={{
              borderWidth: 2,
              borderColor: colors.primary,
              marginHorizontal: 13,
              alignItems: 'center',
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}>
            <View style={styles.spacing} />
            <View style={styles.spacing} />
            <View style={styles.spacing} />

            <Text style={[styles.text, {color: colors.primary}]}>
              4x a Week
            </Text>

            <View style={[styles.inline, {marginTop: 35}]}>
              <Text style={[styles.text, {fontSize: 30}]}>£400/</Text>
              <Text style={[styles.text, {fontSize: 14, marginTop: 15}]}>
                Week
              </Text>
            </View>

            <Text style={[styles.text, {fontSize: 14, marginTop: 35}]}>
              Transaction Fee
            </Text>
            <View style={styles.spacing} />

            <Text style={[styles.text, {color: colors.primary, fontSize: 18}]}>
              £44
            </Text>
            <View style={styles.spacing} />
            <View style={styles.spacing} />
            <View style={styles.spacing} />
            <View style={styles.spacing} />
            <View style={styles.spacing} />
            <View style={styles.spacing} />
          </View>

          <View style={styles.spacing} />
          <View style={styles.spacing} />
          <View style={styles.spacing} />
          <View style={styles.spacing} />
          <View style={styles.spacing} />
          <View style={styles.spacing} />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('PaymentMethod')}
            style={[styles.roundBtn, styles.boxShadow, {marginTop: 6}]}>
            <Text style={[styles.textBold, {color: colors.white}]}>
              Continue
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

export default SelectedPackage;
