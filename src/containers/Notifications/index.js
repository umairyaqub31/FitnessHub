import React, {Component} from 'react';
import {Text, View, FlatList, Image} from 'react-native';
import styles from './styles';
import {BackButton} from '@components';
class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [
        {
          date: '2/09/2021',
          message: 'Lorem Ipsum is simply dummy text of the from.......',
        },
        {
          date: '2/09/2021',
          message: 'Lorem Ipsum is simply dummy text of the from.......',
        },
        {
          date: '2/09/2021',
          message: 'Lorem Ipsum is simply dummy text of the from.......',
        },
        {
          date: '2/09/2021',
          message: 'Lorem Ipsum is simply dummy text of the from.......',
        },
        {
          date: '2/09/2021',
          message: 'Lorem Ipsum is simply dummy text of the from.......',
        },
      ],
    };
  }

  _renderItem = ({item, index}) => {
    return (
      <View style={{marginBottom: 24}}>
        <View style={styles.inline}>
          <Image
            source={require('@images/dot.png')}
            style={{width: 15, height: 15, marginRight: 20}}
          />
          <Text style={styles.dateText}>{item.date}</Text>
        </View>

        <Text style={styles.primaryText}>{item.message}</Text>
      </View>
    );
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <BackButton navigation={navigation} />
        <Text style={styles.titleText}>Notifications</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          data={this.state.notifications}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

export default Notifications;
