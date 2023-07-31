import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '@config';
import {Avatar} from 'react-native-paper';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class Home extends Component {
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
      ?.setOptions({tabBarVisible: true});
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <ImageBackground
          source={require('@images/couple-trainer.png')}
          resizeMode="cover"
          style={styles.backImage}>
          <View style={styles.spacing} />
          <View style={[styles.inline, {justifyContent: 'space-between'}]}>
            <Text style={styles.titleText}>Dashboard</Text>
            <View style={styles.inline}>
              <TouchableOpacity
                style={[
                  styles.boxShadow,
                  {
                    backgroundColor: colors.white,
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color={colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{marginLeft: 20}}>
                <Avatar.Image
                  size={40}
                  source={require('@images/profilepic.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.spacing} />
          <View style={styles.spacing} />
          <View style={styles.spacing} />
        </ImageBackground>

        <View style={styles.scrolledView}>
          <View
            style={[styles.card, styles.boxShadow, {justifyContent: 'center'}]}>
            <View
              style={[
                styles.inline,
                {justifyContent: 'space-between', marginBottom: 10},
              ]}>
              <Text style={styles.opacityTitle}>Total Earning</Text>
              <Text>DropDown</Text>
            </View>
            <View style={[styles.inline, {justifyContent: 'space-between'}]}>
              <Text style={styles.whiteTitle}>£5,999.00</Text>

              <Image
                source={require('@images/view.png')}
                style={{width: 20, height: 20, marginBottom: 3}}
              />
            </View>
          </View>
          <View style={styles.spacingXL} />

          <View style={[styles.inline, {justifyContent: 'space-between'}]}>
            <Text style={styles.heading}>Quick Access</Text>
            <Text>DropDown</Text>
          </View>
          <View style={styles.spacing} />
          <View style={styles.spacing} />

          <View style={[styles.inline, {justifyContent: 'space-between'}]}>
            <TouchableOpacity
              style={[styles.smallCard, styles.boxShadow]}
              onPress={() => this.props.navigation.navigate('ClientRequest')}>
              <View style={styles.roundView}>
                <Image
                  source={require('@images/user.png')}
                  style={{height: 23, width: 20.5}}
                />
              </View>
              <View style={styles.textView}>
                <Text style={styles.textBold}>50</Text>
                <Text style={styles.textGray}>Client Request</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.smallCard, styles.boxShadow]}
              onPress={() => this.props.navigation.navigate('Packages')}>
              <View style={styles.roundView}>
                <Image
                  source={require('@images/dumble.png')}
                  style={{height: 19, width: 30}}
                />
              </View>
              <View style={styles.textView}>
                <Text style={styles.textBold}>50</Text>
                <Text style={styles.textGray}>Create Package</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.spacing} />

          <View style={[styles.inline, {justifyContent: 'space-between'}]}>
            <View style={[styles.smallCard, styles.boxShadow]}>
              <View style={styles.roundView}>
                <Image
                  source={require('@images/payment.png')}
                  style={{height: 28, width: 28}}
                />
              </View>
              <View style={styles.textView}>
                <Text style={styles.textBold}>50</Text>
                <Text style={styles.textGray}>Client Request</Text>
              </View>
            </View>
            <View style={[styles.smallCard, styles.boxShadow]}>
              <View style={styles.roundView}>
                <Image
                  source={require('@images/star.png')}
                  style={{height: 23, width: 23}}
                />
              </View>
              <View style={styles.textView}>
                <Text style={styles.textBold}>50</Text>
                <Text style={styles.textGray}>Client Request</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Home;
