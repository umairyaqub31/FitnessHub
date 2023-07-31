import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import styles from './styles';
import {BackButton} from '@components';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import {colors} from '@config';
import {connect} from 'react-redux';
class FitnessLevel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuData: [
        {
          title: 'Beginner',
          description: 'I am new to fitness',
          icon: require('@images/beginner.png'),
        },
        {
          title: 'Intermediate',
          description: 'I work out 2-3 times a week',
          icon: require('@images/inter.png'),
        },
        {
          title: 'Advancedy',
          description: 'I exercise regularly',
          icon: require('@images/advance.png'),
        },
      ],
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
    let array = ['fitnessLevel'];
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
      this.props.navigation.navigate('CurrentWeight');
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
          <Text style={styles.titleText}>What’s Your Fitness</Text>
          <Text style={styles.titleText}>Level?</Text>
        </View>
        <View style={styles.spacing} />
        {this.state.fitnessLevel ? (
          <Text style={{color: colors.danger}}>*Please select one</Text>
        ) : null}

        <ScrollView showsVerticalScrollIndicator={false}>
          {this.state.menuData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                findTrainerData.fitnessLevel === item.title
                  ? [
                      styles.selectedCard,
                      {
                        backgroundColor:
                          findTrainerData.gender === 'female'
                            ? colors.purple
                            : colors.primary,
                      },
                    ]
                  : styles.card,
                findTrainerData.fitnessLevel === item.title
                  ? styles.boxShadow
                  : null,
                styles.inline,
                {justifyContent: 'space-between'},
              ]}
              onPress={() =>
                this.addFindTrainerData('fitnessLevel', item.title)
              }>
              <View style={{width: '80%'}}>
                <Text
                  style={[
                    findTrainerData.fitnessLevel === item.title
                      ? [styles.heading, {color: colors.white}]
                      : styles.heading,
                  ]}>
                  {item.title}
                </Text>
                <View style={styles.spacing} />

                <Text
                  numberOfLines={2}
                  style={[
                    findTrainerData.fitnessLevel === item.title
                      ? [styles.textGray, {color: colors.white}]
                      : styles.textGray,
                  ]}>
                  {item.description}
                </Text>
              </View>
              <Image style={styles.logo} source={item.icon} />
            </TouchableOpacity>
          ))}

          <View style={styles.spacing} />
          <View style={styles.spacing} />

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
        </ScrollView>
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

export default connect(mapStateToProps, undefined, mergeProps)(FitnessLevel);
