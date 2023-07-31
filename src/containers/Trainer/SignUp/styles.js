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
    padding: 30,
    backgroundColor: colors.white,
  },
  titleText: {
    fontWeight: 'bold',
    fontFamily: fonts.Medium,
    fontSize: responsiveFontSize(3),
  },
  image: {
    width: responsiveWidth(7.5),
    height: responsiveHeight(3.5),
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
  inputTitle: {
    fontSize: responsiveFontSize(1.8),
    color: colors.black,
  },
  textBold: {
    fontSize: responsiveFontSize(1.9),
    fontFamily: fonts.Medium,
  },
  text: {
    fontSize: responsiveFontSize(1.8),
    color: colors.black,
  },
  textinputrounded: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    paddingHorizontal: 13,
    backgroundColor: colors.lightGray,
    height: responsiveHeight(6), // 50% of window height
    marginTop: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    color: colors.black,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
