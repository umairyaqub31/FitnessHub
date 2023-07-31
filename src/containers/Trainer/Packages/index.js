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
import Entypo from 'react-native-vector-icons/Entypo';
import {Button, Menu, Divider, Provider} from 'react-native-paper';

class Packages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selected: null,
    };
  }

  componentDidMount() {
    const {user} = this.props;
    this.props.navigation.addListener('focus', this.focus);

    let data = {
      token: user.token,
      id: user._id,
    };

    this.props.getPackages(data);
  }

  _onRefresh = () => {
    const {user} = this.props;
    let data = {
      token: user.token,
      id: user._id,
    };

    this.props.getPackages(data);
  };

  focus = () => {
    this.props.navigation
      .dangerouslyGetParent()
      ?.setOptions({tabBarVisible: false});
  };

  openMenu = index => this.setState({visible: true, selected: index});

  closeMenu = () => this.setState({visible: false});

  onClick = (type, item) => {
    const {user} = this.props;
    this.setState({visible: false});

    if (type === 'delete') {
      const data = {
        packageId: item._id,
      };
      this.props.deletePackage(data);
    } else if (type === 'edit') {
      this.props.navigation.navigate('CreatePackage', {
        type: 'edit',
        data: item,
      });
    }
  };

  _renderItem = ({index, item}) => {
    return (
      <View style={[styles.boxShadow, styles.card]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            position: 'absolute',
            top: 10,
            right: 20,
          }}>
          {/* <Entypo name="dots-three-horizontal" size={24} /> */}
          <Menu
            key={index}
            visible={index == this.state.selected ? this.state.visible : null}
            onDismiss={this.closeMenu}
            anchor={
              // <Button onPress={this.openMenu}>Show menu</Button>
              <TouchableOpacity onPress={() => this.openMenu(index)}>
                <Entypo name="dots-three-horizontal" size={30} />
              </TouchableOpacity>
            }>
            <Menu.Item
              onPress={() => this.onClick('edit', item)}
              title="Edit"
            />
            <Menu.Item
              onPress={() => this.onClick('delete', item)}
              title="Delete"
            />
          </Menu>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('SelectedPackage')}
          style={[
            styles.inline,
            {justifyContent: 'space-between', marginTop: 25},
          ]}>
          <View>
            <Text style={styles.text}>{item.multiplier} a</Text>
            <Text style={styles.text}>{item.timeMatter}</Text>
            <Text style={[styles.text, {fontWeight: 'bold', fontSize: 25}]}>
              £{item.price}.00
            </Text>
          </View>

          <Image
            style={styles.logo}
            source={require('@images/logo-white.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  _renderEmptyContainer = () => {
    if (!this.props.isLoading) {
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
    // if (!isFetching) {
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
          <Text style={styles.titleText}>Package details</Text>
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

        <TouchableOpacity
          style={[styles.primaryBtn, styles.boxShadow, {marginBottom: 30}]}
          onPress={() =>
            this.props.navigation.navigate('CreatePackage', {type: 'create'})
          }>
          <Text style={styles.btnText}>Add New</Text>
        </TouchableOpacity>
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
    deletePackage: data => {
      const res = actions.deletePackage(dispatch, data);
      return res;
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(Packages);
