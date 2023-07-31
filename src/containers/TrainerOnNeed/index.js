import React, {Component} from 'react';
import {
  Text,
  View,
  Platform,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  FlatList,
  RefreshControl,
  Image,
} from 'react-native';
import {BackButton} from '@components';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import {colors} from '@config';
import {connect} from 'react-redux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
class TrainerOnNeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trainers: [1, 2, 3],
    };
  }
  _renderItem = ({index, item}) => {
    return (
      <TouchableOpacity
        style={[styles.inline, {marginBottom: 15}]}
        // onPress={() => this.openTrainerModal(item)}
      >
        <Image
          style={styles.listImage}
          source={require('@images/handsome-man.png')}
        />
        <View
          style={{
            marginLeft: 13,
            flex: 1,
            flexDirection: 'column',
          }}>
          <Text style={[styles.text, {fontWeight: 'bold', marginBottom: 5}]}>
            {item.name}
          </Text>

          <Text numberOfLines={2} style={[styles.textGray, {fontSize: 14}]}>
            {item.specialization}
          </Text>
          <View style={styles.inline}>
            <FontAwesome
              name="star"
              size={14}
              color={colors.primary}
              style={{marginTop: 10}}
            />
            <FontAwesome
              name="star"
              size={14}
              color={colors.primary}
              style={{marginTop: 10}}
            />
            <FontAwesome
              name="star"
              size={14}
              color={colors.primary}
              style={{marginTop: 10}}
            />
            <FontAwesome
              name="star"
              size={14}
              color={colors.primary}
              style={{marginTop: 10}}
            />
            <FontAwesome
              name="star"
              size={14}
              color={colors.gray}
              style={{marginTop: 10}}
            />
            <Text style={[styles.text, {marginTop: 5, marginLeft: 10}]}>
              {item.rating}
            </Text>
          </View>
          <View style={styles.inline}>
            <SimpleLineIcons
              name="location-pin"
              size={20}
              color={colors.gray}
              style={{marginTop: 10}}
            />
            <Text style={[styles.textGray, {marginTop: 10, marginLeft: 6}]}>
              2.5 Miles
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const {trainersOnNeed} = this.props;
    const iconSize = 22;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.gray} />
        <ImageBackground
          source={require('@images/female-bodybuilder-training.png')}
          resizeMode="cover"
          style={styles.backImage}>
          {Platform.OS === 'ios' ? (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Home');
              }}
              style={[styles.boxShadow, , styles.buttonContainer]}>
              <Entypo
                name="chevron-left"
                size={iconSize}
                color={colors.primary}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.boxShadow, , styles.buttonContainer]}
              onPress={() => {
                this.props.navigation.navigate('Home');
              }}>
              <AntDesign
                name="arrowleft"
                size={iconSize}
                color={colors.primary}
              />
            </TouchableOpacity>
          )}
        </ImageBackground>
        <View style={styles.scrolledView}>
          <Text style={[styles.text, {fontWeight: 'bold'}]}>
            Trainer base on your Needs
          </Text>
          <View style={styles.spacing} />

          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={this._onRefresh} />
            }
            //   ListEmptyComponent={this._renderEmptyContainer}
            data={trainersOnNeed}
            //   ListFooterComponent={this._renderFooterComponent}
            renderItem={this._renderItem}
          />
        </View>

        <Text>TrainerOnNeed</Text>
      </View>
    );
  }
}

const mapStateToProps = ({Trainee, User}) => {
  return {
    findTrainerData: Trainee.findTrainerData,
    trainersOnNeed: Trainee.trainersOnNeed,
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

export default connect(mapStateToProps, undefined, mergeProps)(TrainerOnNeed);
