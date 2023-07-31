import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {BackButton} from '@components';
import {connect} from 'react-redux';
import {colors} from '@config';
import ContentLoader from 'react-native-easy-content-loader';
class Packages extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {user} = this.props;
    const {trainerId} = this.props.route.params;
    this.props.navigation.addListener('focus', this.focus);

    let data = {
      token: user.token,
      id: trainerId,
    };

    this.props.getPackages(data);
  }

  _onRefresh = () => {
    const {user} = this.props;
    const {trainerId} = this.props.route.params;
    let data = {
      token: user.token,
      id: trainerId,
    };

    this.props.getPackages(data);
  };

  focus = () => {
    this.props.navigation
      .dangerouslyGetParent()
      ?.setOptions({tabBarVisible: false});
  };
  _renderItem = ({index, item}) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('SelectedPackage')}
        style={[
          styles.card,
          styles.inline,
          styles.boxShadow,
          {justifyContent: 'space-between'},
        ]}>
        <View>
          <Text style={styles.text}>{item.code}x a</Text>
          <Text style={styles.text}>Week</Text>
          <Text style={[styles.text, {fontWeight: 'bold', fontSize: 25}]}>
            £{item.price}.00
          </Text>
        </View>
        <Image style={styles.logo} source={require('@images/logo-white.png')} />
      </TouchableOpacity>
    );
  };

  _renderEmptyContainer = () => {
    if (!this.props.isFetching) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 18}}>No package found</Text>
        </View>
      );
    }
    return null;
  };

  render() {
    const {isFetching, packages} = this.props;
    // if (!isLoading) {
    //   console.log('paaaaaaa....', packages);
    // }
    return (
      <View style={styles.container}>
        <View style={styles.spacing} />
        <View>
          <BackButton navigation={this.props.navigation} />
        </View>
        <View style={styles.spacing} />
        <View style={styles.spacing} />

        <View>
          <Text style={styles.titleText}>Available Packages</Text>
          <Text style={styles.titleText}>from Trainer</Text>
        </View>
        <View style={styles.spacing} />

        {isFetching ? (
          <ContentLoader
            listSize={3}
            avatar
            aShape="square"
            aSize={110}
            active
            pRows={3}
            tWidth={150}
            tHeight={10}
            pHeight={[5, 5, 10]}
            pWidth={[150, 150, 200, 100]}
            reverse={true}
            containerStyles={{
              borderWidth: 1,
              borderColor: colors.lightGray,
              padding: 15,
              paddingTop: 30,
              marginBottom: 20,
              borderRadius: 10,
            }}
          />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={this._onRefresh} />
            }
            ListEmptyComponent={this._renderEmptyContainer}
            data={packages}
            //   ListFooterComponent={this._renderFooterComponent}
            renderItem={this._renderItem}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = ({User, Package}) => {
  return {
    user: User.user,
    packages: Package.packages,
    isFetching: Package.isFetching,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;
  const {actions} = require('@redux/PackageRedux');
  return {
    ...ownProps,
    ...stateProps,
    getPackages: data => {
      actions.getPackages(dispatch, data);
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(Packages);
