import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  StatusBar,
  RefreshControl,
} from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '@config';
import {connect} from 'react-redux';
import {Avatar} from 'react-native-paper';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ContentLoader from 'react-native-easy-content-loader';
const {width, height} = Dimensions.get('window');
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Modalize} from 'react-native-modalize';
import {Host, Portal} from 'react-native-portalize';
import {Bookmark, Review} from '@components';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,

      selectedTrainer: {},
    };
    this.tModalRef = React.createRef();
  }

  componentDidMount() {
    const {user} = this.props;
    this.props.navigation.addListener('focus', this.focus);

    this.props.getTrainers(user.token);

    let data = {
      user,
    };
    this.props.getBookmarks(data);
  }

  openTrainerModal = data => {
    this.tModalRef.current?.open();
    this.setState({
      selectedTrainer: data,
    });
  };

  _onRefresh = () => {
    const {user} = this.props;

    this.props.getTrainers(user.token);
  };

  goToPackages = async () => {
    const {selectedTrainer} = this.state;
    await this.tModalRef.current?.close();
    this.props.navigation.navigate('Packages', {
      trainerId: selectedTrainer._id,
    });
  };

  goToAvailability = async () => {
    const {selectedTrainer} = this.state;

    await this.tModalRef.current?.close();

    this.props.navigation.navigate('BookSchedule', {
      selectedTrainer: selectedTrainer,
    });
  };

  focus = () => {
    this.props.navigation
      .dangerouslyGetParent()
      ?.setOptions({tabBarVisible: true});
  };
  _renderItem = ({index, item}) => {
    return (
      <TouchableOpacity
        style={[styles.inline, {marginBottom: 15}]}
        onPress={() => this.openTrainerModal(item)}>
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

  handleReview = async () => {
    const {selectedTrainer} = this.state;
    await this.tModalRef.current?.close();

    this.props.navigation.navigate('WriteReview', {
      selectedTrainer: selectedTrainer,
    });
  };
  render() {
    const {isFetching, trainers} = this.props;
    const {selectedTrainer} = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <ImageBackground
          source={require('@images/female-bodybuilder.png')}
          resizeMode="cover"
          style={styles.backImage}>
          <View style={[styles.inline, {justifyContent: 'space-between'}]}>
            <Text style={styles.titleText}>Welcom Back!</Text>
            <View style={styles.inline}>
              <TouchableOpacity
                style={[
                  styles.boxShadow,
                  {
                    backgroundColor: colors.white,
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color={colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{marginLeft: 13}}>
                <Avatar.Image
                  size={40}
                  source={require('@images/profilepic.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.spacing} />
          <View style={styles.spacing} />
          <View style={styles.spacing} />

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Motivation')}
            style={[styles.primaryBtn, styles.boxShadow, {marginTop: 6}]}>
            <Text style={styles.btnText}>Find Trainer</Text>
          </TouchableOpacity>
        </ImageBackground>

        <View style={styles.scrolledView}>
          <Text style={[styles.text, {fontWeight: 'bold'}]}>
            Nearest Trainer
          </Text>
          <View style={styles.spacing} />

          {isFetching ? (
            <ContentLoader
              listSize={5}
              avatar
              aShape="square"
              aSize={110}
              active
              pRows={4}
              tWidth={150}
              tHeight={10}
              pHeight={[5, 5, 10]}
              pWidth={[250, 150, 200, 100]}
            />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={this._onRefresh}
                />
              }
              //   ListEmptyComponent={this._renderEmptyContainer}
              data={trainers}
              //   ListFooterComponent={this._renderFooterComponent}
              renderItem={this._renderItem}
            />
          )}
        </View>
        <Portal>
          <Modalize ref={this.tModalRef} adjustToContentHeight={true}>
            <View style={styles.popUpHead}>
              <TouchableOpacity
                style={styles.touchOpacity}
                onPress={() => this.tModalRef.current?.close()}>
                <Entypo name="cross" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
            <View>
              <View style={styles.spacingXL} />
              <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                showsVerticalScrollIndicator={false}
                style={styles.scrolledview2}>
                <Image
                  source={require('@images/handsome-man-detail.png')}
                  style={{width: '100%', height: 250, borderRadius: 20}}
                />
                <View style={styles.spacingXL} />
                <View style={styles.inline}>
                  <View style={{width: '80%'}}>
                    <Text style={styles.modalTitleText}>
                      {selectedTrainer.name}
                    </Text>
                    <View style={styles.spacing} />
                    <Text numberOfLines={2} style={styles.textGray}>
                      1708 Innovation Dr, Kelowna, BC V1V 2Y4, United Kingdom
                    </Text>
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      right: 10,
                      marginTop: 5,
                    }}>
                    <Bookmark
                      trainerId={selectedTrainer._id}
                      trainer={selectedTrainer}
                      bookmarks={this.props.bookmarks}
                    />
                  </View>
                </View>

                <View style={styles.spacingXL} />
                <View style={styles.spacing} />

                <View style={styles.inline}>
                  <View style={{width: '80%'}}>
                    <Text style={styles.modalTitleText}>
                      Trainer Specialities
                    </Text>
                    <View style={styles.spacing} />
                    <Text numberOfLines={2} style={styles.textGray}>
                      {selectedTrainer.specialization}
                    </Text>
                  </View>
                  <View style={{position: 'absolute', right: 10}}>
                    <Review onPress={this.handleReview} />
                  </View>
                </View>

                <View style={styles.spacingXL} />
                <View style={styles.spacing} />

                <View style={styles.inline}>
                  <View style={{width: '80%'}}>
                    <Text style={styles.modalTitleText}>Qualifications</Text>
                    <View style={styles.spacing} />
                    <Text numberOfLines={2} style={styles.textGray}>
                      Level 2 Diploma in Health, Fitness, and Exercise
                      Instruction
                    </Text>
                  </View>
                </View>

                <View style={styles.spacingXL} />
                <View style={styles.spacing} />

                <View style={{width: '80%'}}>
                  <Text style={styles.modalTitleText}>Price</Text>
                  <View style={styles.spacing} />
                  <View style={styles.inline}>
                    <Text style={styles.modalTitleText}>£20</Text>
                    <Text style={[styles.textGray, {fontSize: 12}]}>
                      /Perhour
                    </Text>
                  </View>
                </View>

                <View style={styles.spacingXL} />
                <View style={styles.spacing} />

                <View
                  style={[
                    styles.inline,
                    {
                      justifyContent: 'space-between',
                      paddingHorizontal: 20,
                    },
                  ]}>
                  <TouchableOpacity
                    style={styles.primaryBtn2}
                    onPress={this.goToAvailability}>
                    <Text style={styles.primaryBtnText}>Availability</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.borderBtn}
                    onPress={this.goToPackages}>
                    <Text
                      style={[styles.primaryBtnText, {color: colors.primary}]}>
                      View Package
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </Modalize>
        </Portal>
      </View>
    );
  }
}

const mapStateToProps = ({User, Trainee}) => {
  return {
    user: User.user,
    trainers: Trainee.trainers,
    isFetching: Trainee.isFetching,
    bookmarks: Trainee.bookmarks,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;
  const {actions} = require('@redux/TraineeRedux');
  return {
    ...ownProps,
    ...stateProps,
    getTrainers: data => {
      actions.getTrainers(dispatch, data);
    },
    getBookmarks: data => {
      actions.getBookmarks(dispatch, data);
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(Home);
