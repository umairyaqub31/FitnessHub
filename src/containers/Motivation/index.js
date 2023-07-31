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
class Motivation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuData: [
        {
          title: 'Feeling Confident',
          description: 'I want to be more confident in myself',
          icon: require('@images/like1.png'),
        },
        {
          title: 'Losing Weigh',
          description: 'I want to be fit, healthy, be respected',
          icon: require('@images/diet1.png'),
        },
        {
          title: 'Being Active / Healthy',
          description: 'I want to feel energetic, fit and healthy',
          icon: require('@images/speed1.png'),
        },
        {
          title: 'Getting Stronger',
          description: 'I want to be and look stronger',
          icon: require('@images/muscle2.png'),
        },
        {
          title: 'Getting Fitter',
          description: 'I want to be respected, appreciated, and loved',
          icon: require('@images/muscle3.png'),
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
    let array = ['motivation'];
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
      this.props.navigation.navigate('GenderSelection');
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
          <Text style={styles.titleText}>What Motivates You</Text>
          <Text style={styles.titleText}>The Most?</Text>
        </View>
        <View style={styles.spacing} />

        {this.state.motivation ? (
          <Text style={{color: colors.danger}}>*Please select one</Text>
        ) : null}

        <ScrollView showsVerticalScrollIndicator={false}>
          {this.state.menuData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                findTrainerData.motivation === item.title
                  ? styles.selectedCard
                  : styles.card,
                findTrainerData.motivation === item.title
                  ? styles.boxShadow
                  : null,
                styles.inline,
                {justifyContent: 'space-between'},
              ]}
              onPress={() => this.addFindTrainerData('motivation', item.title)}>
              <View style={{width: '80%'}}>
                <Text
                  style={[
                    findTrainerData.motivation === item.title
                      ? [styles.heading, {color: colors.white}]
                      : styles.heading,
                  ]}>
                  {item.title}
                </Text>
                <View style={styles.spacing} />

                <Text
                  numberOfLines={2}
                  style={[
                    findTrainerData.motivation === item.title
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
            style={[styles.primaryBtn, styles.boxShadow]}
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

export default connect(mapStateToProps, undefined, mergeProps)(Motivation);
