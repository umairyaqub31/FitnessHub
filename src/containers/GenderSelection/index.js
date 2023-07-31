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

LogBox.ignoreLogs(['Failed prop type: Invalid props.style']); // Ignore log notification by message
class GenderSelection extends Component {
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

  navigateToChallenge = type => {
    this.addFindTrainerData('gender', type);
    this.props.navigation.navigate('ChooseChallenge');
  };

  addFindTrainerData = (key, value) => {
    let data = Object.assign({}, this.props.findTrainerData);

    data[key] = value.trim();

    this.props.addFindTrainerData(data);
  };

  render() {
    const {findTrainerData} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.spacing} />
        <View>
          <BackButton navigation={this.props.navigation} />
        </View>
        <View style={styles.spacing} />
        <View style={styles.spacing} />

        <View>
          <Text style={styles.titleText}>Select</Text>
        </View>

        <View style={styles.spacingXL} />
        <View style={styles.spacingXL} />
        <View style={styles.spacingXL} />

        <View>
          <Image
            source={require('@images/female.png')}
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
              {backgroundColor: colors.purple},
            ]}
            onPress={() => this.navigateToChallenge('female')}>
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
                Female
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.spacingXL} />
          <View style={styles.spacingXL} />
          <View style={styles.spacingXL} />
          <View style={styles.spacingXL} />

          <TouchableOpacity
            style={[styles.card, styles.boxShadow]}
            onPress={() => this.navigateToChallenge('male')}>
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
                Male
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.spacingXL} />
          <View style={styles.spacingXL} />
          <View style={styles.spacingXL} />

          {/* <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ChooseChallenge')}
            style={[styles.primaryBtn, styles.boxShadow]}
            //   onPress={() => this.props.navigation.navigate('GenderSelection')}
          >
            <Text style={styles.btnText}>Next</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({User, Trainee}) => {
  return {
    user: User.user,
    findTrainerData: Trainee.findTrainerData,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;
  const {actions} = require('@redux/TraineeRedux');
  return {
    ...ownProps,
    ...stateProps,
    addFindTrainerData: data => {
      dispatch(actions.addFindTrainerData(data));
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(GenderSelection);
