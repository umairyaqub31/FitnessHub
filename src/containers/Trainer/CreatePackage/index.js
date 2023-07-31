import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BackButton} from '@components';
import {connect} from 'react-redux';
import {colors} from '@config';
import {DropDownInput} from '@components';
import {Packages} from '..';

class CreatePackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMultiplier: false,
      multiplierOptions: [
        {
          id: '1',
          title: '1x',
        },
        {
          id: '2',
          title: '2x',
        },
        {
          id: '3',
          title: '3x',
        },
        {
          id: '3',
          title: '4x',
        },
      ],

      showTime: false,
      timeOptions: [
        {
          id: '1',
          title: 'Week',
        },
        {
          id: '2',
          title: 'Month',
        },
        {
          id: '3',
          title: 'Year',
        },
      ],
      form: {
        multiplier: '1x',
        timeMatter: 'Week',
        price: null,
      },
      error: '',
    };
  }

  async componentDidMount() {
    const {type, data} = this.props.route.params;

    if (type === 'edit') {
      this.setState({
        form: {
          multiplier: data.multiplier,
          timeMatter: data.timeMatter,
          price: data.price,
          packageId: data._id,
        },
      });
    }
  }

  validation = async () => {
    const {user} = this.props;
    let flag = true;
    let array = ['multiplier', 'timeMatter', 'price'];
    let form = Object.assign({}, this.state.form);

    array.map((item, key) => {
      if (!Object.keys(form).some(index => index === item)) {
        this.setState({[item]: true});
        flag = false;
      }
    });
    Object.keys(form).map(item => {
      if (array.some(index => index === item)) {
        if (
          form[item] === null ||
          form[item] === 'null' ||
          form[item] === '' ||
          form[item].length === 0
        ) {
          this.setState({[item]: true});
          flag = false;
        } else {
          this.setState({[item]: false});
        }
      }
    });

    if (flag) {
      await this.handleOnChange('user', {
        _id: user._id,
        token: user.token,
      });
      this.addPackage();
    }
  };

  addPackage = async () => {
    const {form} = this.state;
    const response = await this.props.addPackage(form);

    if (response == true) {
      this.props.navigation.navigate('Packages');
    }
  };

  handleOnChange = (key, value) => {
    this.setState({
      showMultiplier: false,
      showTime: false,
    });
    const {form} = this.state;
    let newObj = Object.assign({}, form);
    newObj[key] = value;

    this.setState({
      form: newObj,
    });
  };

  render() {
    const {message} = this.props;
    const {type} = this.props.route.params;

    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.spacing} />
        <View>
          <BackButton navigation={this.props.navigation} />
        </View>
        <View style={styles.spacing} />
        <View style={styles.spacing} />

        <Text style={styles.titleText}>
          {type === 'edit' ? 'Update Package' : 'Create a package'}
        </Text>

        <View style={styles.spacingXL} />

        {message !== '' ? (
          <Text style={{color: colors.danger}}>* {message}</Text>
        ) : null}
        <View style={styles.spacing} />

        <DropDownInput
          list={this.state.multiplierOptions}
          HeadingTitle="Multiplier"
          title={this.state.form.multiplier}
          onPressPicker={() =>
            this.setState({
              showMultiplier: !this.state.showMultiplier,
            })
          }
          onSelect={item => this.handleOnChange('multiplier', item.title)}
          showPicker={this.state.showMultiplier}
        />

        <View style={styles.spacing} />
        <View style={styles.spacing} />

        <DropDownInput
          list={this.state.timeOptions}
          HeadingTitle="Time Matter"
          title={this.state.form.timeMatter}
          onPressPicker={() =>
            this.setState({
              showTime: !this.state.showTime,
            })
          }
          onSelect={item => this.handleOnChange('timeMatter', item.title)}
          showPicker={this.state.showTime}
        />

        <View style={styles.spacing} />
        <View style={styles.spacing} />

        <View>
          <Text style={styles.inputTitle}>Price</Text>
          <TextInput
            style={[
              styles.textinputrounded,
              ,
              this.state.price ? {borderColor: 'red', borderWidth: 1} : {},
            ]}
            onChangeText={text => this.handleOnChange('price', text)}
            value={this.state.form.price}
            placeholder="£150.00"
          />
        </View>

        <View style={styles.spacing} />
        <View style={styles.spacing} />
        <View style={styles.spacing} />

        <TouchableOpacity
          style={[styles.primaryBtn, styles.boxShadow, {marginBottom: 30}]}
          onPress={this.validation}>
          {this.props.isProcessing ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <Text style={styles.btnText}>Submit</Text>
          )}
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({User, Package}) => {
  return {
    // isLoading: User.isLoading,
    message: User.message,
    status: User.status,
    user: User.user,
    isProcessing: Package.isProcessing,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;
  const {actions} = require('@redux/PackageRedux');
  return {
    ...ownProps,
    ...stateProps,

    addPackage: data => {
      const res = actions.addPackage(dispatch, data);
      return res;
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(CreatePackage);
