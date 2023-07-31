import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '@config';
import {fonts} from '@config';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    padding: 15,
    paddingHorizontal: 25,
  },
  titleText: {
    fontWeight: 'bold',
    fontFamily: fonts.Medium,
    fontSize: responsiveFontSize(3),
  },
  spacing: {
    height: responsiveHeight(1.5),
  },
  spacingXL: {
    height: responsiveHeight(3),
  },
  heading: {
    fontWeight: '700',
    fontSize: 18,
  },
  card: {
    backgroundColor: colors.primary,
    // height: 190,
    height: responsiveHeight(20),
    borderRadius: 15,
    overflow: 'hidden',
  },
  vector: {
    // height: 210,
    height: responsiveScreenHeight(20),
    // width: 135,
    width: responsiveScreenWidth(33),
    position: 'absolute',
    top: 10,
    left: -50,
  },
  logo: {
    height: responsiveHeight(10), // 50% of window height
    width: responsiveWidth(45),
  },
  femaleImage: {
    height: responsiveScreenHeight(28),
    width: responsiveScreenWidth(50),
    position: 'absolute',
    bottom: responsiveHeight(32),
    right: 10,
    elevation: 3,
  },
  maleImage: {
    height: responsiveHeight(30),
    width: responsiveScreenWidth(33),
    // height: 270,
    // width: 160,
    position: 'absolute',
    top: responsiveHeight(22),
    right: 20,
    elevation: 3,
  },
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
  text: {
    fontSize: 25,
    fontFamily: fonts.Regular,
    color: colors.black,
  },
  textGray: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: colors.gray,
  },
  primaryText: {
    fontSize: 16,
    fontFamily: fonts.Medium,
    color: colors.primary,
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    height: responsiveHeight(8), // 50% of window height
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    borderRadius: 20,
  },
  btnText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: responsiveFontSize(2.5),
  },
});

export default styles;
