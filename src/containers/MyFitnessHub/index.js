import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {BackButton, Progress, Report} from '@components';
import styles from './styles';
import {TabView, TabBar} from 'react-native-tab-view';
import {colors} from '@config';
import {connect} from 'react-redux';

class MyFitnessHub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        {key: 'first', title: 'Progress'},
        {key: 'second', title: 'Report'},
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

  renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return (
          <Progress
            progress={this.props.progress}
            user={this.props.user}
            addProgress={this.addProgress}
            submitReport={this.props.submitReport}
            clearMessage={this.props.clearMessage}
            message={this.props.message}
            status={this.props.status}
          />
        );
      case 'second':
        return <Report />;
      default:
        return null;
    }
  };
  setIndex = index => {
    this.setState({index});
  };
  _renderLabel = ({route}) => {
    console.log('rrr', route);
    return <Text style={{}}>{route.title}</Text>;
  };

  addProgress = (key, value) => {
    let data = Object.assign({}, this.props.progress);

    data[key] = value.trim();

    this.props.addProgress(data);
  };

  render() {
    const {index, routes} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.spacing} />
        <View style={{marginLeft: 15, marginTop: 15}}>
          <BackButton navigation={this.props.navigation} />
        </View>
        <View style={styles.spacing} />
        <View style={styles.spacing} />
        <TabView
          swipeEnabled={true}
          tabBarPosition="top"
          navigationState={{index, routes}}
          renderScene={this.renderScene}
          onIndexChange={this.setIndex}
          renderTabBar={props => (
            <TabBar
              {...props}
              //   renderLabel={this._renderLabel}
              navigation={this.props.navigation}
              style={{borderBottomWidth: 0.5, borderBottomColor: colors.gray}}
              tabStyle={{
                borderColor: colors.lightGray,
                backgroundColor: colors.black,
              }}
              indicatorStyle={{
                backgroundColor: colors.primary,
                // borderColor: colors.primary,
              }}
              indicatorContainerStyle={{
                backgroundColor: colors.primary,
              }}
              activeColor={colors.primary}
              inactiveColor={'#323232'}
              labelStyle={{fontSize: 14, fontWeight: 'bold'}}
            />
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = ({User, Trainee}) => {
  return {
    user: User.user,
    progress: Trainee.progress,
    message: Trainee.message,
    status: Trainee.status,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;
  const {actions} = require('@redux/TraineeRedux');
  return {
    ...ownProps,
    ...stateProps,

    addProgress: data => {
      dispatch(actions.addProgress(data));
    },
    submitReport: data => {
      const result = actions.submitReport(dispatch, data);
      return result;
    },
    clearMessage: () => {
      actions.clearMessage(dispatch);
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(MyFitnessHub);
