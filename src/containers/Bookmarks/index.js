import React, {Component} from 'react';
import {Text, View, FlatList, RefreshControl} from 'react-native';
import styles from './styles';
import {BackButton} from '@components';
import {connect} from 'react-redux';
import {colors} from '@config';
import {Avatar} from 'react-native-paper';
import {Bookmark} from '@components';

class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const {user} = this.props;
    let data = {
      user,
    };
    this.props.getBookmarks(data);
  }
  _onRefresh = async () => {
    const {user} = this.props;
    let data = {
      user,
    };
    await this.props.getBookmarks(data);
  };
  _renderItem = ({item, index}) => {
    const {bookmarks} = this.props;

    return (
      <View style={[styles.inline, {marginBottom: 20}]}>
        <Avatar.Image size={50} source={require('@images/albert.png')} />
        <Text style={styles.trainerTitle}>{item.trainerProfile[0].name}</Text>
        {/* <Text style={styles.btn}>Button</Text> */}
        <View style={styles.btn}>
          <Bookmark
            trainerId={item.trainerId}
            trainer={item.trainerProfile}
            bookmarks={bookmarks}
          />
        </View>
      </View>
    );
  };
  _listEmptyComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '7%',
        }}>
        <Text>No bookmarks found.</Text>
      </View>
    );
  };
  render() {
    const {bookmarks} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.spacing} />
        <View>
          <BackButton navigation={this.props.navigation} />
        </View>
        <View style={styles.spacing} />
        <View style={styles.spacing} />

        <View>
          <Text style={styles.titleText}>Bookmarks</Text>
        </View>
        <View style={styles.spacing} />

        <FlatList
          showsVerticalScrollIndicator={false}
          data={bookmarks}
          renderItem={this._renderItem}
          ListEmptyComponent={this._listEmptyComponent}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              tintColor={colors.primary}
              refreshing={false}
              onRefresh={this._onRefresh}
            />
          }
        />
      </View>
    );
  }
}

const mapStateToProps = ({User, Trainee}) => {
  return {
    user: User.user,
    bookmarks: Trainee.bookmarks,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;
  const {actions} = require('@redux/TraineeRedux');
  //   const {actions: traineeAction} = require('@redux/TraineeRedux');

  return {
    ...ownProps,
    ...stateProps,
    getBookmarks: data => {
      actions.getBookmarks(dispatch, data);
    },
  };
};

export default connect(mapStateToProps, null, mergeProps)(Bookmarks);
