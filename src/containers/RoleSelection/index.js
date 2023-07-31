import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  LogBox,
} from 'react-native';
import styles from './styles';
import {BackButton} from '@components';
import {colors} from '@config';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {connect} from 'react-redux';
// LogBox.ignoreLogs(['Failed prop type: Invalid props.style']); // Ignore log notification by message
class RoleSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.spacing} />

        <View style={styles.spacing} />
        <View style={styles.spacing} />

        <View>
          <Image
            source={require('@images/logo-white.png')}
            style={styles.logo}
          />
        </View>

        <View style={styles.spacingXL} />
        <View style={styles.spacingXL} />
        <View style={styles.spacingXL} />
        <View style={styles.spacingXL} />
        <View style={styles.spacingXL} />

        <View>
          <Image
            source={require('@images/trainer.png')}
            style={styles.femaleImage}
          />
          <Image
            source={require('@images/male.png')}
            style={styles.maleImage}
          />

          <TouchableOpacity
            style={[
              styles.card,
              styles.boxShadow,
              {backgroundColor: '#CC54EA'},
            ]}
            onPress={() => this.props.navigation.navigate('Trainer')}>
            <View style={styles.inline}>
              <Image
                source={require('@images/vector1.png')}
                style={styles.vector}
              />
              <Text
                style={[
                  styles.btnText,
                  {
                    position: 'absolute',
                    left: responsiveWidth(11),
                    top: responsiveHeight(8),
                  },
                ]}>
                Trainer
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.spacingXL} />
          <View style={styles.spacingXL} />
          <View style={styles.spacingXL} />
          <View style={styles.spacingXL} />

          <TouchableOpacity
            style={[styles.card, styles.boxShadow]}
            onPress={() => this.props.navigation.navigate('Trainee')}>
            <View style={styles.inline}>
              <Image
                source={require('@images/vector1.png')}
                style={styles.vector}
              />
              <Text
                style={[
                  styles.btnText,
                  {
                    position: 'absolute',
                    left: responsiveWidth(11),
                    top: responsiveHeight(8),
                  },
                ]}>
                Trainee
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default RoleSelection;
