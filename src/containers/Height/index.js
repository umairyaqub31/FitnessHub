import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {BackButton} from '@components';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import {colors} from '@config';
import {connect} from 'react-redux';
class Height extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'kg',
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', this.focus);
    this.addFindTrainerData('heightUnit', 'cm');
  }

  focus = () => {
    this.props.navigation
      .dangerouslyGetParent()
      ?.setOptions({tabBarVisible: false});
  };

  setUnit = value => {
    this.addFindTrainerData('heightUnit', value);
  };

  addFindTrainerData = (key, value) => {
    let data = Object.assign({}, this.props.findTrainerData);

    data[key] = value.trim();

    this.props.addFindTrainerData(data);
  };

  searchTrainer = async () => {
    const {findTrainerData, user} = this.props;

    const data = {
      user,
      challenge: findTrainerData.challenge,
    };

    const response = await this.props.findTrainer(data);
    if (response) {
      console.log('res....', response);
      this.props.navigation.navigate('TrainerOnNeed');
    }
  };

  render() {
    const {findTrainerData} = this.props;
    console.log('ttt.....', findTrainerData);

    let selectColor =
      findTrainerData.gender === 'female' ? colors.purple : colors.primary;

    return (
      <View style={styles.container}>
        <View style={styles.spacing} />
        <View>
          <BackButton navigation={this.props.navigation} />
        </View>
        <View style={styles.spacing} />
        <View style={styles.spacing} />

        <View>
          <Text style={styles.titleText}>What’s Your Height?</Text>
        </View>
        <View style={styles.spacingXL} />
        {/* {this.state.goalWeight ? (
          <Text style={{color: colors.danger}}>*Add your goal weight</Text>
        ) : null} */}
        <View style={styles.spacingXL} />

        <View>
          <View style={[styles.inline, {alignSelf: 'center'}]}>
            <TouchableOpacity
              style={[
                styles.unitView,
                {
                  marginRight: 27,
                  backgroundColor:
                    findTrainerData.heightUnit === 'cm' ? selectColor : '#fff',
                },
              ]}
              onPress={() => this.setUnit('cm')}>
              <Text
                style={[
                  styles.textGray,
                  {
                    color:
                      findTrainerData.heightUnit === 'cm'
                        ? '#fff'
                        : colors.gray,
                  },
                ]}>
                cm
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setUnit('ft')}
              style={[
                styles.unitView,
                {
                  backgroundColor:
                    findTrainerData.heightUnit === 'ft' ? selectColor : '#fff',
                },
              ]}>
              <Text
                style={[
                  styles.textGray,
                  {
                    color:
                      findTrainerData.heightUnit === 'ft'
                        ? '#fff'
                        : colors.gray,
                  },
                ]}>
                ft
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.spacingXL} />
          <View style={styles.spacingXL} />

          {findTrainerData.heightUnit == 'cm' ? (
            <View style={[styles.inline, {alignSelf: 'center'}]}>
              <TextInput
                style={styles.input}
                onChangeText={text => this.addFindTrainerData('cmHeight', text)}
                value={findTrainerData.cmHeight ? findTrainerData.cmHeight : ''}
                placeholderTextColor={colors.gray}
                //   placeholder="Full Name"
              />
              <Text
                style={[
                  styles.textGray,
                  {fontSize: 16, marginLeft: 7, marginTop: 10},
                ]}>
                {findTrainerData.heightUnit}
              </Text>
            </View>
          ) : (
            <View style={[styles.inline, {alignSelf: 'center'}]}>
              <TextInput
                style={styles.input}
                onChangeText={text => this.addFindTrainerData('ftHeight', text)}
                value={findTrainerData.ftHeight ? findTrainerData.ftHeight : ''}
                placeholderTextColor={colors.gray}
                //   placeholder="Full Name"
              />
              <Text
                style={[
                  styles.textGray,
                  {fontSize: 16, marginLeft: 7, marginTop: 10},
                ]}>
                {findTrainerData.heightUnit}
              </Text>

              <TextInput
                style={[styles.input, {marginLeft: 20}]}
                onChangeText={text => this.addFindTrainerData('inHeight', text)}
                value={findTrainerData.inHeight ? findTrainerData.inHeight : ''}
                placeholderTextColor={colors.gray}
                //   placeholder="Full Name"
              />
              <Text
                style={[
                  styles.textGray,
                  {fontSize: 16, marginLeft: 7, marginTop: 10},
                ]}>
                in
              </Text>
            </View>
          )}

          <View style={styles.spacingXL} />
          <View style={styles.spacingXL} />
          <TouchableOpacity
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
            onPress={this.searchTrainer}>
            {this.props.isProcessing ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text style={styles.btnText}>Next</Text>
            )}
          </TouchableOpacity>
          <View style={styles.spacingXL} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({Trainee, User}) => {
  return {
    findTrainerData: Trainee.findTrainerData,
    isProcessing: Trainee.isProcessing,
    user: User.user,
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

    findTrainer: data => {
      const result = actions.findTrainer(dispatch, data);
      return result;
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(Height);
