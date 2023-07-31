import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import styles from './styles';
import {BackButton} from '@components';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import {colors} from '@config';
import {connect} from 'react-redux';
class CurrentWeight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'kg',
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', this.focus);
    this.addFindTrainerData('currWeightUnit', 'kg');
  }

  focus = () => {
    this.props.navigation
      .dangerouslyGetParent()
      ?.setOptions({tabBarVisible: false});
  };

  setUnit = value => {
    this.addFindTrainerData('currWeightUnit', value);
  };

  addFindTrainerData = (key, value) => {
    let data = Object.assign({}, this.props.findTrainerData);

    data[key] = value.trim();

    this.props.addFindTrainerData(data);
  };

  validation = () => {
    let flag = true;
    let array = ['currentWeight'];
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
      this.props.navigation.navigate('GoalWeight');
    }
  };

  render() {
    const {findTrainerData} = this.props;

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
          <Text style={styles.titleText}>What’s Your Current</Text>
          <Text style={styles.titleText}>Weight?</Text>
        </View>
        <View style={styles.spacingXL} />
        {this.state.currentWeight ? (
          <Text style={{color: colors.danger}}>*Add your current weight</Text>
        ) : null}
        <View style={styles.spacingXL} />

        <View>
          <View style={[styles.inline, {alignSelf: 'center'}]}>
            <TouchableOpacity
              style={[
                styles.unitView,
                {
                  marginRight: 27,
                  backgroundColor:
                    findTrainerData.currWeightUnit === 'kg'
                      ? selectColor
                      : '#fff',
                },
              ]}
              onPress={() => this.setUnit('kg')}>
              <Text
                style={[
                  styles.textGray,
                  {
                    color:
                      findTrainerData.currWeightUnit === 'kg'
                        ? '#fff'
                        : colors.gray,
                  },
                ]}>
                kg
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setUnit('lb')}
              style={[
                styles.unitView,
                {
                  backgroundColor:
                    findTrainerData.currWeightUnit === 'lb'
                      ? selectColor
                      : '#fff',
                },
              ]}>
              <Text
                style={[
                  styles.textGray,
                  {
                    color:
                      findTrainerData.currWeightUnit === 'lb'
                        ? '#fff'
                        : colors.gray,
                  },
                ]}>
                lb
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.spacingXL} />
          <View style={styles.spacingXL} />

          <View style={[styles.inline, {alignSelf: 'center'}]}>
            <TextInput
              style={styles.input}
              onChangeText={text =>
                this.addFindTrainerData('currentWeight', text)
              }
              value={
                findTrainerData.currentWeight
                  ? findTrainerData.currentWeight
                  : ''
              }
              placeholderTextColor={colors.gray}
              //   placeholder="Full Name"
            />
            <Text
              style={[
                styles.textGray,
                {fontSize: 16, marginLeft: 7, marginTop: 10},
              ]}>
              {findTrainerData.currWeightUnit}
            </Text>
          </View>

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
            onPress={this.validation}>
            <Text style={styles.btnText}>Next</Text>
          </TouchableOpacity>
          <View style={styles.spacingXL} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({Trainee}) => {
  return {
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

export default connect(mapStateToProps, undefined, mergeProps)(CurrentWeight);
