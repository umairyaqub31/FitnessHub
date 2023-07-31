import {StyleSheet} from 'react-native';
import {colors} from '@config';
import {fonts} from '@config';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  titleText: {
    fontWeight: 'bold',
    fontFamily: fonts.Medium,
    fontSize: responsiveFontSize(3),
  },
  inputTitle: {
    fontSize: responsiveFontSize(1.8),
    color: colors.black,
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    height: responsiveHeight(8), // 50% of window height
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    borderRadius: 15,
  },
  btnText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: responsiveFontSize(2.5),
  },
  spacing: {
    height: responsiveHeight(2),
  },
  spacingXL: {
    height: responsiveHeight(3),
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
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: colors.black,
  },
  textGray: {
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.Regular,
    color: colors.gray,
  },
  textBold: {
    fontSize: 16,
    fontFamily: fonts.Medium,
  },
  textinputrounded: {
    borderRadius: 6,
    paddingHorizontal: 13,
    backgroundColor: colors.lightGray,
    height: responsiveHeight(6), // 50% of window height
    marginTop: 10,
    color: colors.black,
  },
});

export default styles;
