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
class Age extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'kg',
    };
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
    let array = ['age'];
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
      console.log('done......');
      this.props.navigation.navigate('Height');
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
          <Text style={styles.titleText}>What’s Your Age?</Text>
        </View>
        <View style={styles.spacingXL} />
        {this.state.age ? (
          <Text style={{color: colors.danger}}>*Add your age</Text>
        ) : null}
        <View style={styles.spacingXL} />

        <View>
          <View style={styles.spacingXL} />
          <View style={styles.spacingXL} />

          <View style={{alignSelf: 'center'}}>
            <TextInput
              style={styles.input}
              onChangeText={text => this.addFindTrainerData('age', text)}
              value={findTrainerData.age ? findTrainerData.age : ''}
              placeholderTextColor={colors.gray}
              //   placeholder="Full Name"
            />
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

export default connect(mapStateToProps, undefined, mergeProps)(Age);
