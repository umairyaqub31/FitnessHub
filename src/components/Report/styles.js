import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '@config';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.lightGray,
    padding: 6,
    borderRadius: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  avatarContainer: {
    alignSelf: 'center',
    borderColor: colors.primary,
    borderWidth: 6,
    
  },
  titleText: {
    fontWeight: '600',
    fontSize: 16,
    color: colors.white,
  },
  container: {
    flex: 1,
    padding: 30,
  },
  durationGoalCss: {
    width: '100%',
    // height: 120,
    backgroundColor: '#222222',
    borderRadius: 15,
    marginVertical: 20,
    // paddingHorizontal: 14,
    paddingVertical: 35,
    flexDirection: 'row',
  },
  durationGoalInner: {
    width: '50%',
    // borderWidth: 1,
    // borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  reprtIconsCss: {
    height: 25,
    width: 25,
    marginTop: 14,
  },
  durationDay: {
    color: colors.primary,
    fontSize: 17
  },
  dgTxt: {
    marginLeft: 15
  },
  durationDayTxt: {
    color: colors.reportBoxTxt
  },
  preRecordTxt: {
    color: colors.reportBoxTxt, 
    fontSize: 15
  },
  burnIconsCss: {
    height: 25,
    width: 20,
    marginLeft: 20,
  },
  calendarIconsCss: {
    height: 25,
    width: 25,
    marginLeft: 'auto',
  },
  graphIconPic: {
    height: (width * 21) / 100,
    width: (width * 61) / 100,
    alignSelf: 'center',
  }
});

export default styles;
