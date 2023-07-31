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
class ChooseTargetBody extends Component {
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
    let array = ['targetBody'];
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
      this.props.navigation.navigate('FitnessLevel');
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
          <Text style={styles.titleText}>Choose Your Target</Text>
          <Text style={styles.titleText}>Body Type</Text>
        </View>

        <View style={styles.spacingXL} />
        {this.state.targetBody ? (
          <Text style={{color: colors.danger}}>*Please select one</Text>
        ) : null}
        <View style={styles.spacingXL} />
        <View style={styles.spacingXL} />

        <View>
          <TouchableOpacity
            style={
              findTrainerData.targetBody === 'Cut'
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
            onPress={() => this.addFindTrainerData('targetBody', 'Cut')}>
            <View style={[styles.inline, {paddingHorizontal: 15}]}>
              <View>
                <Text
                  style={
                    findTrainerData.targetBody === 'Cut'
                      ? [styles.heading, {color: colors.white}]
                      : styles.heading
                  }>
                  Cut
                </Text>
                <Text
                  style={[
                    styles.heading,
                    {
                      color:
                        findTrainerData.targetBody === 'Cut'
                          ? colors.white
                          : colors.black,
                      fontSize: responsiveFontSize(1.5),
                    },
                  ]}>
                  Get Leander
                </Text>
              </View>

              <Image
                source={require('@images/cut.png')}
                style={styles.cutImage}
              />
            </View>
          </TouchableOpacity>

          <View style={styles.spacingXL} />
          <View style={styles.spacingXL} />
          <View style={styles.spacingXL} />

          <TouchableOpacity
            style={
              findTrainerData.targetBody === 'Muscle Gain'
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
            onPress={() =>
              this.addFindTrainerData('targetBody', 'Muscle Gain')
            }>
            <View style={[styles.inline, {paddingHorizontal: 15}]}>
              <View>
                <Text
                  style={
                    findTrainerData.targetBody === 'Muscle Gain'
                      ? [styles.heading, {color: colors.white}]
                      : styles.heading
                  }>
                  Muscle Gain
                </Text>
                <Text
                  style={[
                    styles.heading,
                    {
                      fontSize: responsiveFontSize(1.5),
                      color:
                        findTrainerData.targetBody === 'Muscle Gain'
                          ? colors.white
                          : colors.black,
                    },
                  ]}>
                  Get Bigger
                </Text>
              </View>
              <Image
                source={require('@images/bulk.png')}
                style={styles.bulkImage}
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

export default connect(
  mapStateToProps,
  undefined,
  mergeProps,
)(ChooseTargetBody);
