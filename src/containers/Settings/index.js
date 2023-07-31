import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import styles from './styles';
import {BackButton} from '@components';
import {connect} from 'react-redux';
import {Avatar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '@config';
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [
        {
          id: 1,
          title: 'Notification',
          icon: require('@images/notification-bell.png'),
        },
        {id: 2, title: 'Help', icon: require('@images/social-care.png')},
        {id: 3, title: 'Bookmarks', icon: require('@images/bookmark.png')},
        {
          id: 4,
          title: 'Change Country',
          icon: require('@images/country.png'),
        },
        {
          id: 5,
          title: 'Edit Profile',
          icon: require('@images/userProfile.png'),
        },
        {
          id: 6,
          title: 'Enter Fitness Goal',
          icon: require('@images/fitnessGoal.png'),
        },
        {
          id: 7,
          title: 'Payment',
          icon: require('@images/paymentCard.png'),
        },
        {id: 8, title: 'FAQ', icon: require('@images/faq.png')},
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

  signOut = () => {
    console.log('loogg......');
    this.props.logout();
  };

  navigateToScreen = index => {
    if (index === 0) {
      this.props.navigation.navigate('Notifications');
    } else if (index === 2) {
      this.props.navigation.navigate('Bookmarks');
    } else {
      console.log('navigate');
    }
  };

  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[styles.listView, styles.inline]}
        onPress={() => this.navigateToScreen(index)}>
        {index === 2 ? (
          <Ionicons name="bookmark-outline" size={22} color={colors.primary} />
        ) : (
          <Image source={item.icon} style={styles.icon} />
        )}
        <Text style={styles.routeTitle}>{item.title}</Text>
        <Image source={require('@images/next.png')} style={styles.nextIcon} />
      </TouchableOpacity>
    );
  };
  render() {
    const {user} = this.props;
    console.log('user...', user);
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
          style={[styles.listView, styles.inline, {marginTop: 30}]}>
          <Avatar.Image size={50} source={require('@images/albert.png')} />
          <Text style={[styles.routeTitle, {fontSize: 18}]}>{user.name}</Text>
          <Image source={require('@images/next.png')} style={styles.nextIcon} />
        </TouchableOpacity>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.menu}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity style={styles.primaryBtn} onPress={this.signOut}>
          <Text style={styles.btnText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = ({User}) => {
  return {
    user: User.user,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;
  const {actions} = require('@redux/UserRedux');
  return {
    ...ownProps,
    ...stateProps,
    logout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, null, mergeProps)(Settings);
