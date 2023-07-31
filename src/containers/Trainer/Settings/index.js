import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {BackButton} from '@components';
import {connect} from 'react-redux';
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  signOut = () => {
    console.log('loogg......');
    this.props.logout();
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.spacing} />
        <View>
          <BackButton navigation={this.props.navigation} />
        </View>
        <View style={styles.spacing} />
        <View style={styles.spacing} />

        <View>
          <Text style={styles.titleText}>Settings</Text>
        </View>
        <View style={styles.spacing} />
        <TouchableOpacity
          style={[styles.primaryBtn, styles.boxShadow]}
          onPress={this.signOut}>
          <Text style={styles.btnText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;
  const {actions} = require('@redux/UserRedux');
  return {
    ...ownProps,
    ...stateProps,
    login: data => {
      actions.login(dispatch, data);
    },
    logout: () => dispatch(actions.logout()),
  };
};

export default connect(null, null, mergeProps)(Settings);
