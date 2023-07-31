import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {BackButton, RequestCard} from '@components';
import styles from './styles';
class ClientRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
          <Text style={styles.titleText}>Client Request</Text>
        </View>
        <View style={styles.spacing} />

        <RequestCard />
      </View>
    );
  }
}

export default ClientRequest;
