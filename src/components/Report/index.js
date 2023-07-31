import React, { Component, useState } from 'react';
import { Platform, TouchableOpacity, Text, Button, View, Image, Dimensions } from 'react-native';
import { colors } from '@config';
import styles from './styles'
import { Avatar } from "react-native-elements";
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph,
//   StackedBarChart
// } from 'react-native-chart-kit'

// import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
import { BarChart } from "react-native-chart-kit";


const width = Dimensions.get('window').width;
const Report = props => {

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  // const barData = {
  //   labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  //   datasets: [
  //     {
  //       data: [20, 45, 28, 80, 99, 43],
  //     },
  //   ],
  // };

  const data = [{ value: 500 }, { value: 800 }, { value: 900 }, { value: 700 }]

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={styles.container}>
      <ScrollView>

        <Avatar
          rounded
          size="xlarge"
          source={require('@images/albert.png')}
          containerStyle={styles.avatarContainer}
        />

        <Text style={[styles.titleText, { marginTop: 15 }]}>Duration and goal</Text>

        <View style={styles.durationGoalCss}>

          <View style={styles.durationGoalInner}>

            <Image
              style={styles.reprtIconsCss}
              source={require('@images/time.png')} />

            <View style={styles.dgTxt}>
              <Text style={styles.durationDayTxt}>Duration</Text>
              <Text style={styles.durationDay}>14 Days</Text>
            </View>
          </View>

          <View style={styles.durationGoalInner}>
            <Image
              style={styles.reprtIconsCss}
              source={require('@images/tick.png')} />

            <View style={styles.dgTxt} >
              <Text style={styles.durationDayTxt}>Goal</Text>
              <Text style={styles.durationDay}>Weight Loss</Text>
            </View>
          </View>

        </View>



        <Text style={[styles.titleText, { marginTop: 15 }]}>Personal Record</Text>

        <View style={[styles.durationGoalCss, { flexDirection: 'column' }]}>

          <View style={{ flexDirection: 'row' }}>

            <View style={[styles.durationGoalInner, { flexDirection: 'column' }]}>
              <Text style={styles.durationDay}>Current</Text>
              <Text style={[styles.durationDay, { fontSize: 13 }]}>80kg</Text>
            </View>

            <View style={[styles.durationGoalInner, { flexDirection: 'column' }]}>
              <Text style={styles.durationDay}>Target</Text>
              <Text style={[styles.durationDay, { fontSize: 13 }]}>65 Kg</Text>
            </View>

          </View>


          <Image
            style={styles.graphIconPic}
            resizeMode='stretch'
            source={require('@images/chart.png')} />


        </View>


        <Text style={[styles.titleText, { marginTop: 15 }]}>Previous Record</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={[styles.durationGoalCss, { width: '45%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }]}>

            <Text style={styles.durationDay}>Days Trained</Text>
            <Text style={styles.preRecordTxt}>Last</Text>
            <Text style={styles.preRecordTxt}>Month</Text>

            <Text style={[styles.durationDay, { fontWeight: 'bold', fontSize: 22, marginTop: 22 }]}>20</Text>

          </View>

          <View style={[styles.durationGoalCss, { width: '45%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }]}>

            <Text style={styles.durationDay}>Days Missed</Text>
            <Text style={styles.preRecordTxt}>Last</Text>
            <Text style={styles.preRecordTxt}>Month</Text>

            <Text style={[styles.durationDay, { fontWeight: 'bold', fontSize: 22, marginTop: 22 }]}>20</Text>

          </View>

        </View>

        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Text style={styles.titleText}>Calories Burned</Text>
          <Image
            style={styles.burnIconsCss}
            resizeMode='stretch'
            source={require('@images/burn.png')} />

        </View>

        <View style={[styles.durationGoalCss, { justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }]}>

          <Text style={styles.durationDay}>Average</Text>
          <Text style={styles.preRecordTxt}>calories</Text>

          <Text style={[styles.durationDay, { fontWeight: 'bold', fontSize: 22, marginTop: 22 }]}>1,392</Text>

        </View>


        <View style={[styles.durationGoalCss, { justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }]}>

          <Text style={styles.durationDay}>Monthly Goal</Text>
          <Text style={[styles.preRecordTxt, { marginBottom: 20 }]}>Target Days</Text>

          <BarChart
            data={{
              labels: ['1', '2', '3', '7', '8', '11'],
              datasets: [{ data: [200, 400, 600, 800, 900, 1050] }],
            }}
            width={(width * 79) / 100}
            height={250}
            yAxisLabel={''}
            chartConfig={{
              // backgroundColor: '#fff',
              backgroundGradientFrom: '#222222',
              backgroundGradientTo: '#222222',
              decimalPlaces: 2,
              color: (opacity = 400) => '#00CC52',
              style: {
                borderRadius: 12, 
                padding: 10, 
              },
            }}
            
          />

          {/* <BarChart
            data={data}
            width={(width * 70) / 100}
            stepValue={50}
            // stepHeight={20}
            barWidth={15}
            cappedBars={true}
            capColor="#00CC52"
            capThickness={20}
            capRadius={20}
            yAxisAtTop={true}
            roundedTop={true}
            isAnimated
            color="#fff"
          /> */}


        </View>

        <View style={[styles.durationGoalCss, { marginVertical: 0, backgroundColor: "#00000000", justifyContent: 'space-between', alignItems: 'center' }]}>
          <Text style={[styles.titleText, { marginTop: 15 }]}>History</Text>
          <View style={[styles.durationGoalCss, { marginVertical: 0, borderRadius: 40, paddingVertical: 15, width: 120, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }]}>
            <Image
              style={styles.burnIconsCss}
              resizeMode='stretch'
              source={require('@images/filterVR.png')} />

            <Text style={styles.preRecordTxt}>Filter</Text>
          </View>
        </View>


        <View style={[styles.durationGoalCss, { paddingLeft: 20, marginVertical: 2, flexDirection: 'column' }]}>
          <Text style={[styles.durationDay, { marginBottom: 10 }]}>Starting date</Text>

          <TouchableOpacity onPress={showDatepicker}>
            <View style={{ alignItems: 'center', paddingHorizontal: 20, flexDirection: 'row', width: '94%', height: 70, borderRadius: 20, borderColor: '#fff', borderWidth: 1, backgroundColor: colors.black }}>
              <Text style={styles.durationDay}>06/21/2021</Text>
              <Image
                style={styles.calendarIconsCss}
                resizeMode='stretch'
                source={require('@images/Calendar1.png')} />
            </View>
          </TouchableOpacity>

          <Text style={[styles.durationDay, { marginBottom: 10, marginTop: 20 }]}>End date</Text>

          <TouchableOpacity onPress={showDatepicker}>
            <View style={{ alignItems: 'center', paddingHorizontal: 20, flexDirection: 'row', width: '94%', height: 70, borderRadius: 20, borderColor: '#fff', borderWidth: 1, backgroundColor: colors.black }}>
              <Text style={styles.durationDay}>06/21/2021</Text>
              <Image
                style={styles.calendarIconsCss}
                resizeMode='stretch'
                source={require('@images/Calendar1.png')} />
            </View>
          </TouchableOpacity>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}


        </View>

        <View style={[styles.durationGoalCss, { paddingLeft: 20, paddingVertical: 10, flexDirection: 'column' }]}>

          <Text style={{ color: colors.reportBoxTxt, fontSize: 12, marginLeft: 'auto', marginRight: 15 }}>15:00-16:00     6-24-2021</Text>

          <Text style={[styles.durationDay, { marginBottom: 15 }]}>Shoulder Press</Text>
          <Text style={[styles.durationDay, { marginBottom: 15 }]}>3 Sets</Text>
          <Text style={[styles.durationDay, { marginBottom: 15 }]}>1 Repetition</Text>

        </View>

      </ScrollView>

    </View >
  )
};

export default Report;
