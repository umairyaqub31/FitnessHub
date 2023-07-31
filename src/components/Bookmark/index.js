import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import styles from './styles';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '@config';
import {useHeaderHeight} from '@react-navigation/stack';

class Bookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOnPress = () => {
    const {trainerId, user, trainer} = this.props;

    const data = {
      user,
      trainerId,
      trainer,
    };

    this.props.submitBookmark(data);
  };

  render() {
    const {user, bookmarks, trainerId} = this.props;
    const index = bookmarks.findIndex(t => t.trainerId === trainerId);
    return (
      <TouchableOpacity style={styles.container} onPress={this.handleOnPress}>
        {index > -1 ? (
          <Ionicons name="bookmark" size={24} color={colors.primary} />
        ) : (
          <Ionicons name="bookmark-outline" size={24} color={colors.primary} />
        )}
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = ({User, Trainee}) => {
  return {
    user: User.user,
    // bookmarks: Trainee.bookmarks,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;
  const {actions} = require('@redux/TraineeRedux');
  //   const {actions: traineeAction} = require('@redux/TraineeRedux');

  return {
    ...ownProps,
    ...stateProps,
    // submitBookmark: data => {
    //   const res = actions.submitBookmark(dispatch, data);
    //   return res;
    // },
    submitBookmark: data => {
      actions.submitBookmark(dispatch, data);
    },
    getBookmarks: data => {
      actions.getBookmarks(dispatch, data);
    },
  };
};

export default connect(mapStateToProps, null, mergeProps)(Bookmark);
