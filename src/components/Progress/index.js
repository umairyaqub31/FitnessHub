import React, {Component, useState, Fragment, useEffect} from 'react';
import {
  Platform,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {DropDown} from '@components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from 'react-native-calendars';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';

import styles from './styles';
import {colors} from '@config';

const Progress = props => {
  const [goalOptions, setGoalOptions] = useState([
    {
      id: '1',
      title: 'Weight Loss',
    },
    {
      id: '2',
      title: 'Muscle Gain',
    },
  ]);
  const [targetAreaOptions, setTargetAreaOptions] = useState([
    {
      id: '1',
      title: 'Back',
    },
    {
      id: '2',
      title: 'Sholder',
    },
  ]);
  const [exerciseOptions, setExerciseOptions] = useState([
    {
      id: '1',
      title: 'Deadlift (Barbell)',
    },
    {
      id: '2',
      title: 'Butterfly',
    },
  ]);
  const [showGoal, setShowGoal] = useState(false);
  const [showTargetArea, setShowTargetArea] = useState(false);
  const [showExercise, setShowExercise] = useState(false);

  const [goalValue, setGoalValue] = useState('Weight Loss');
  const [current, setCurrent] = useState('0');
  const [target, setTarget] = useState('0');
  const [next, setNext] = useState(false);
  const [selectedDates, setSelectedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [state, setState] = useState({});
  const {progress, user, message, status} = props;

  useEffect(() => {
    let currentDate = moment().format('YYYY-MM-DD');
    props.addProgress('date', currentDate);
  }, []);

  const handleOnChangeGoal = title => {
    // setGoalValue(title);
    props.addProgress('goal', title);
    setShowGoal(false);
  };

  const handleOnChangeTargetArea = title => {
    props.addProgress('targetArea', title);
    setShowTargetArea(false);
  };
  const handleOnChangeExercise = title => {
    props.addProgress('exercise', title);
    setShowExercise(false);
  };

  const onDayPress = async day => {
    props.addProgress('date', day.dateString);
  };
  const goPrev = () => {
    setNext(false);
  };

  const validation = type => {
    let flag = true;
    // let array = ['sets', 'weightLoad', 'repetition', 'caloriesBurnt'];
    let array = [];
    if (type === 'next') {
      array = ['currentWeight', 'targetWeight'];
    } else if (type === 'submit') {
      array = ['sets', 'weightLoad', 'repetition', 'caloriesBurnt'];
    }
    let form = Object.assign({}, progress);

    let obj = {};

    array.map((item, key) => {
      if (!Object.keys(form).some(index => index === item)) {
        obj[item] = true;

        setState(obj);
        flag = false;
        console.log('here');
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
          obj[item] = true;

          setState(obj);

          flag = false;
        } else {
          obj[item] = false;

          setState(obj);
        }
      }
    });

    if (type === 'next') {
      if (flag) {
        setNext(true);
      }
    } else if (type === 'submit') {
      if (flag) {
        console.log('Done.....');
        submitProgress();
        // this.props.navigation.navigate('GoalWeight');
      }
    }
  };
  const clear = () => {
    props.clearMessage();
  };
  const submitProgress = async () => {
    const data = {
      user,
      progress,
    };

    const res = await props.submitReport(data);
    if (res == true) {
      Alert.alert('', message, [{text: 'OK', onPress: () => clear()}]);
    } else {
      console.log(res);
    }
  };

  if (!next) {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <Text style={styles.titleText}>Setup Training</Text>

        <View style={styles.card}>
          <Text style={styles.primaryText}>Goal</Text>
          <DropDown
            list={goalOptions}
            title={progress.goal}
            onPressPicker={() => setShowGoal(!showGoal)}
            onSelect={item => handleOnChangeGoal(item.title)}
            showPicker={showGoal}
          />

          <Text style={styles.primaryText}>Current</Text>
          <View
            style={[
              styles.inputView,
              styles.inline,
              state.currentWeight ? {borderColor: 'red', borderWidth: 1} : {},
            ]}>
            <TextInput
              style={{color: colors.primary}}
              placeholder="0"
              placeholderTextColor={colors.primary}
              onChangeText={text => props.addProgress('currentWeight', text)}
              value={progress.currentWeight ? progress.currentWeight : ''}
            />
            <Text style={styles.primaryText}>Kg</Text>
          </View>

          <Text style={styles.primaryText}>Set Target</Text>
          <View
            style={[
              styles.inputView,
              styles.inline,
              state.targetWeight ? {borderColor: 'red', borderWidth: 1} : {},
            ]}>
            <TextInput
              style={{color: colors.primary}}
              placeholder="0"
              placeholderTextColor={colors.primary}
              onChangeText={text => props.addProgress('targetWeight', text)}
              value={progress.targetWeight ? progress.targetWeight : ''}
            />
            <Text style={styles.primaryText}>Kg</Text>
          </View>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => validation('next')}>
            <Text style={styles.primaryBtnText}>Next</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  } else {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={[styles.inline, {marginBottom: 10}]}
          onPress={goPrev}>
          <Ionicons name="chevron-back" color={colors.primary} size={22} />
          <Text style={[styles.whiteText, {fontSize: 16, marginVertical: 0}]}>
            prev
          </Text>
        </TouchableOpacity>
        <View style={styles.inline}>
          <Image
            source={require('@images/calendar.png')}
            style={{width: 18, height: 18, marginRight: 8}}
          />
          <Text style={[styles.whiteText, {fontSize: 20}]}>
            Select Date & Time
          </Text>
        </View>

        <Fragment>
          <Calendar
            // Initially visible month. Default = Date()
            current={new Date()}
            markedDates={{
              [progress.date]: {
                selected: true,
                // marked: true,
                selectedColor: colors.primary,
              },
            }}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            // minDate={new Date()}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            // maxDate={'2012-05-30'}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={day => onDayPress(day)}
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
              calendarBackground: '#222222',
              textSectionTitleColor: colors.gray,
              // textSectionTitleDisabledColor: '#d9e1e8',
              selectedDayTextColor: colors.white,
              todayTextColor: 'red',
              dayTextColor: colors.primary,
              textDisabledColor: '#d9e1e8',
              // dotColor: '#00adf5',
              // selectedDotColor: 'red',
              arrowColor: colors.primary,
              // disabledArrowColor: '#d9e1e8',
              monthTextColor: colors.primary,
              indicatorColor: 'red',
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
        <View style={styles.card}>
          <Text style={styles.whiteText}>Target Area</Text>
          <DropDown
            list={targetAreaOptions}
            title={progress.targetArea}
            onPressPicker={() => setShowTargetArea(!showTargetArea)}
            onSelect={item => handleOnChangeTargetArea(item.title)}
            showPicker={showTargetArea}
          />

          <Text style={styles.whiteText}>Exercise</Text>
          <DropDown
            list={exerciseOptions}
            title={progress.exercise}
            onPressPicker={() => setShowExercise(!showExercise)}
            onSelect={item => handleOnChangeExercise(item.title)}
            showPicker={showExercise}
          />

          <Text style={styles.whiteText}>Sets</Text>
          <View
            style={[
              styles.inputView,
              styles.inline,
              state.sets ? {borderColor: 'red', borderWidth: 1} : {},
            ]}>
            <TextInput
              style={{color: colors.primary, width: '100%'}}
              onChangeText={text => props.addProgress('sets', text)}
              value={progress.sets ? progress.sets : ''}
            />
          </View>

          <Text style={styles.whiteText}>Weight (Load)</Text>
          <View
            style={[
              styles.inputView,
              styles.inline,
              state.weightLoad ? {borderColor: 'red', borderWidth: 1} : {},
            ]}>
            <TextInput
              style={{color: colors.primary, width: '100%'}}
              onChangeText={text => props.addProgress('weightLoad', text)}
              value={progress.weightLoad ? progress.weightLoad : ''}
            />
          </View>

          <Text style={styles.whiteText}>Repetition</Text>
          <View
            style={[
              styles.inputView,
              styles.inline,
              state.repetition ? {borderColor: 'red', borderWidth: 1} : {},
            ]}>
            <TextInput
              style={{color: colors.primary, width: '100%'}}
              onChangeText={text => props.addProgress('repetition', text)}
              value={progress.repetition ? progress.repetition : ''}
            />
          </View>

          <Text style={styles.whiteText}>Calories Burnt (Optional)</Text>
          <View
            style={[
              styles.inputView,
              styles.inline,
              state.caloriesBurnt ? {borderColor: 'red', borderWidth: 1} : {},
            ]}>
            <TextInput
              style={{color: colors.primary, width: '100%'}}
              onChangeText={text => props.addProgress('caloriesBurnt', text)}
              value={progress.caloriesBurnt ? progress.caloriesBurnt : ''}
            />
          </View>

          <Text style={styles.whiteText}>Time</Text>
          <View style={[styles.inputView, styles.inline]}>
            <TextInput
              style={{color: colors.primary}}
              placeholder="0"
              placeholderTextColor={colors.primary}
              onChangeText={text => props.addProgress('time', text)}
              value={progress.time ? progress.time : ''}
            />
            <Text style={styles.primaryText}>Minutes</Text>
          </View>

          <Text style={styles.whiteText}>Distance</Text>
          <View style={[styles.inputView, styles.inline]}>
            <TextInput
              style={{color: colors.primary}}
              placeholder="0"
              placeholderTextColor={colors.primary}
              onChangeText={text => props.addProgress('distance', text)}
              value={progress.distance ? progress.distance : ''}
            />
            <Text style={styles.primaryText}>Km</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.inline, {marginLeft: 10, marginBottom: 14}]}>
          <AntDesign name="plus" size={30} color={colors.white} />
          <Text
            style={{
              marginLeft: 10,
              fontSize: 18,
              fontWeight: '500',
              color: colors.primary,
            }}>
            Add Exercise
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => validation('submit')}>
          <Text style={styles.primaryBtnText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
};

export default Progress;
