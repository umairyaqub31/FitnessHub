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
import {connect} from 'react-redux';

LogBox.ignoreLogs(['Failed prop type: Invalid props.style']); // Ignore log notification by message
class ChooseChallenge extends Component {
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

  addFindTrainerData = (key, value) => {
    let data = Object.assign({}, this.props.findTrainerData);
    data[key] = value.trim();
    this.props.addFindTrainerData(data);
  };

  validation = () => {
    let flag = true;
    let array = ['challenge'];
    let form = Object.assign({}, this.props.findTrainerData);

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
      this.props.navigation.navigate('ChooseTargetBody');
    }
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
          <Text style={styles.titleText}>Choose Your</Text>
          <Text style={styles.titleText}>Challenge</Text>
        </View>

        <View style={styles.spacingXL} />
        {this.state.challenge ? (
          <Text style={{color: colors.danger}}>*Please select one</Text>
        ) : null}
        <View style={styles.spacingXL} />
        <View style={styles.spacingXL} />

        <View>
          <TouchableOpacity
            style={
              findTrainerData.challenge === 'weight_loss'
                ? [
                    styles.selectedCard,
                    styles.boxShadow,
                    {
                      backgroundColor:
                        findTrainerData.gender === 'female'
                          ? colors.purple
                          : colors.primary,
                    },
                  ]
                : styles.card
            }
            onPress={() => this.addFindTrainerData('challenge', 'weight_loss')}>
            <View style={[styles.inline, {paddingHorizontal: 15}]}>
              <Text
                style={
                  findTrainerData.challenge === 'weight_loss'
                    ? [styles.heading, {color: colors.white}]
                    : styles.heading
                }>
                Weight Loss
              </Text>
              <Image
                source={require('@images/weightloss.png')}
                style={styles.femaleImage}
              />
            </View>
          </TouchableOpacity>

          <View style={styles.spacingXL} />
          <View style={styles.spacingXL} />
          <View style={styles.spacingXL} />

          <TouchableOpacity
            style={
              findTrainerData.challenge === 'muscle_gain'
                ? [
                    styles.selectedCard,
                    styles.boxShadow,
                    {
                      backgroundColor:
                        findTrainerData.gender === 'female'
                          ? colors.purple
                          : colors.primary,
                    },
                  ]
                : styles.card
            }
            onPress={() => this.addFindTrainerData('challenge', 'muscle_gain')}>
            <View style={[styles.inline, {paddingHorizontal: 15}]}>
              <Text
                style={
                  findTrainerData.challenge === 'muscle_gain'
                    ? [styles.heading, {color: colors.white}]
                    : styles.heading
                }>
                Muscle Gain
              </Text>
              <Image
                source={require('@images/musclegain.png')}
                style={styles.maleImage}
              />
            </View>
          </TouchableOpacity>

          <View style={styles.spacingXL} />
          <View style={styles.spacingXL} />
          <View style={styles.spacingXL} />

          <TouchableOpacity
            onPress={this.validation}
            style={[
              styles.primaryBtn,
              styles.boxShadow,
              {
                backgroundColor:
                  findTrainerData.gender === 'female'
                    ? colors.purple
                    : colors.primary,
              },
            ]}
            //   onPress={() => this.props.navigation.navigate('GenderSelection')}
          >
            <Text style={styles.btnText}>Next</Text>
          </TouchableOpacity>
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

export default connect(mapStateToProps, undefined, mergeProps)(ChooseChallenge);
