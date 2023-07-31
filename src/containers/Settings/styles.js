import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '@config';
import {fonts} from '@config';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 15,
    paddingHorizontal: 40,
  },
  titleText: {
    fontWeight: 'bold',
    fontFamily: fonts.Medium,
    fontSize: responsiveFontSize(3),
  },
  listView: {
    marginBottom: 50,
  },
  routeTitle: {marginLeft: 30, fontWeight: '600', fontSize: 16},
  nextIcon: {
    width: 7,
    height: 12,
    position: 'absolute',
    right: 10,
  },
  icon: {
    width: 23,
    height: 23,
  },
  // heading: {
  //   fontWeight: '700',
  //   fontSize: responsiveFontSize(2),
  // },

  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
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
  // text: {
  //   fontSize: 25,
  //   fontFamily: fonts.Regular,
  //   color: colors.black,
  // },
  // textGray: {
  //   fontSize: responsiveFontSize(1.7),
  //   fontFamily: fonts.Regular,
  //   color: colors.gray,
  // },
  // primaryText: {
  //   fontSize: 16,
  //   fontFamily: fonts.Medium,
  //   color: colors.primary,
  // },
  spacing: {
    height: responsiveHeight(1.5),
  },
  spacingXL: {
    height: responsiveHeight(3),
  },

  // textBold: {
  //   fontSize: 18,
  //   fontFamily: fonts.Medium,
  // },

  primaryBtn: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    height: responsiveHeight(8), // 50% of window height
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    borderRadius: 20,
    marginBottom: 10,
  },
  btnText: {
    color: colors.primary,
    fontWeight: '500',
    fontSize: responsiveFontSize(2.5),
  },
});

export default styles;
