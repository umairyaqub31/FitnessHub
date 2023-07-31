import React, {Component, Fragment} from 'react';
import {Text, View, Image, ScrollView, FlatList} from 'react-native';
import {BackButton, PrimaryButton} from '@components';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from 'react-native-calendars';

import {colors} from '@config';
import {TouchableOpacity} from 'react-native-gesture-handler';

class BookSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDates: [],
      slots: [
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
      ],
    };
  }

  onDayPress = async day => {
    console.log('day', day.dateString);
    const {selectedDates} = this.state;

    let selected = day.dateString;
    let newDates = selectedDates;
    // if (selectedDates[selected]) {
    //   delete selectedDates[selected]
    // } else {

    newDates[selected] = {
      selected: true,
      //   marked: true,
      selectedColor: colors.primary,
    };

    // }

    this.setState({
      selectedDates: {...newDates},
    });
    setdates({...newDates});
  };

  _renderItem = ({index, item}) => {
    return (
      <TouchableOpacity style={styles.pill}>
        <Text style={{fontSize: 12, fontWeight: 'bold'}}>{item}</Text>
      </TouchableOpacity>
    );
  };

  handleAppointment = () => {
    console.log('Pressed');
  };
  render() {
    const {selectedTrainer} = this.props.route.params;
    const {selectedDates} = this.state;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.spacing} />
        <View>
          <BackButton navigation={this.props.navigation} />
        </View>
        <View style={styles.spacing} />
        <View style={styles.spacing} />

        <View
          style={[styles.inline]}
          //   onPress={() => this.openTrainerModal(selectedTrainer)}
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
            <Text style={[styles.titleText]}>{selectedTrainer.name}</Text>

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
              <Text style={[styles.text, {marginLeft: 10}]}>
                {selectedTrainer.rating}
              </Text>
            </View>
            <View style={styles.inline}>
              <SimpleLineIcons
                name="location-pin"
                size={15}
                color={colors.gray}
              />
              <Text style={[styles.textGray, {marginLeft: 6}]}>2.5 Miles</Text>
            </View>
          </View>
        </View>

        <View style={styles.spacing} />
        <View style={styles.spacing} />

        <Text style={[styles.titleText, {fontSize: 20, marginTop: 4}]}>
          Select Date
        </Text>

        <View style={styles.spacing} />
        <View style={styles.spacing} />

        <Fragment>
          <Calendar
            // Initially visible month. Default = Date()
            current={new Date()}
            markedDates={this.state.selectedDates}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            // minDate={new Date()}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            // maxDate={'2012-05-30'}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={day => this.onDayPress(day)}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={day => {
              console.log('selected day', day);
            }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'yyyy MMMM'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={month => {
              console.log('month changed', month);
            }}
            firstDay={1}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={subtractMonth => subtractMonth()}
            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
            style={{
              //   borderWidth: 1,
              borderRadius: 20,
              //   borderColor: 'gray',
              //   width: 303,
              height: 320,
            }}
            theme={{
              //   backgroundColor: 'red',
              calendarBackground: '#E5FAEE',
              textSectionTitleColor: colors.gray,
              textSectionTitleDisabledColor: '#d9e1e8',
              selectedDayBackgroundColor: 'blue',
              selectedDayTextColor: colors.white,
              todayTextColor: 'blue',
              dayTextColor: 'black',
              textDisabledColor: '#d9e1e8',
              dotColor: '#00adf5',
              selectedDotColor: 'red',
              arrowColor: colors.black,
              disabledArrowColor: '#d9e1e8',
              monthTextColor: colors.black,
              indicatorColor: 'blue',
              textDayFontFamily: 'monospace',
              textMonthFontFamily: 'monospace',
              textDayHeaderFontFamily: 'monospace',
              textDayFontWeight: 'bold',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 12,
              textMonthFontSize: 12,
              textDayHeaderFontSize: 12,
            }}
            // Enable the option to swipe between months. Default = false
            enableSwipeMonths={true}
          />
        </Fragment>

        <View style={styles.spacing} />
        <View style={styles.spacing} />

        <Text style={[styles.titleText, {fontSize: 20, marginTop: 4}]}>
          Select Time
        </Text>

        <View style={styles.spacing} />

        <View style={{marginBottom: 40}}>
          <FlatList
            data={this.state.slots}
            renderItem={this._renderItem}
            //Setting the number of column
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={{marginBottom: 50}}>
          <PrimaryButton
            title={'Appointment'}
            handlePress={this.handleAppointment}
          />
        </View>
      </ScrollView>
    );
  }
}

export default BookSchedule;
