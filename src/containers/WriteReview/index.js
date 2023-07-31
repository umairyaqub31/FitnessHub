import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {BackButton, SubmitStars} from '@components';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {colors} from '@config';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';

class WriteReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultRating: 2,
      review: '',
      flag: false,
    };
  }
  handlePickImage = async () => {
    const result = await launchImageLibrary();
    console.log('imageResult....', result);
  };
  handlePost = async () => {
    const {review, defaultRating} = this.state;
    const {user, message, status} = this.props;
    const {selectedTrainer} = this.props.route.params;

    let data = {
      user,
      trainerId: selectedTrainer._id,
      rating: defaultRating,
      reviewMessage: review,
      // imageUrl: url,
    };

    if (review == null || review === '') {
      this.setState({flag: true});
    } else {
      console.log('Post...');
      const res = await this.props.submitReview(data);
      if (res == true) {
        Alert.alert('', message, [{text: 'OK', onPress: () => this.clear()}]);
      } else {
        console.log(res);
      }

      this.setState({flag: false});
    }
  };
  setRating = item => {
    this.setState({
      defaultRating: item,
    });
  };
  clear = () => {
    this.props.clearMessage();
  };
  render() {
    const {selectedTrainer} = this.props.route.params;
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View>
          <BackButton navigation={this.props.navigation} />
        </View>

        <View
          style={[styles.inline, {marginVertical: 30}]}
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
              {selectedTrainer.name}
            </Text>

            <Text numberOfLines={2} style={[styles.textGray, {fontSize: 14}]}>
              {selectedTrainer.specialization}
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
                4
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
        </View>

        <View style={[styles.inline, {marginBottom: 25}]}>
          <SubmitStars
            defaultRating={this.state.defaultRating}
            setDefaultRating={this.setRating}
          />
        </View>
        <Text style={[styles.text, {marginBottom: 10}]}>Review</Text>
        <View
          style={[
            styles.TextInputContainer,
            {marginBottom: 15},
            this.state.flag ? {borderWidth: 1, borderColor: 'red'} : null,
          ]}>
          <TextInput
            multiline
            numberOfLines={5}
            style={styles.TextInput}
            placeholder="Post your comment"
            value={this.state.review}
            onChangeText={text => this.setState({review: text})}
          />
        </View>
        <View style={styles.imagePickerView}>
          <TouchableOpacity onPress={this.handlePickImage}>
            <Image
              style={styles.pickerImage}
              source={require('@images/uploadImage.png')}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={this.handlePost}
          style={[styles.roundBtn, styles.boxShadow, {marginTop: 6}]}>
          {this.props.isProcessing ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <Text style={[styles.textBold, {color: colors.white}]}>Post</Text>
          )}
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({User, Trainee}) => {
  return {
    user: User.user,
    isProcessing: Trainee.isProcessing,
    message: Trainee.message,
    status: Trainee.Status,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;
  const {actions} = require('@redux/TraineeRedux');
  return {
    ...ownProps,
    ...stateProps,

    submitReview: data => {
      const result = actions.submitReview(dispatch, data);
      return result;
    },
    clearMessage: () => {
      actions.clearMessage(dispatch);
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(WriteReview);
