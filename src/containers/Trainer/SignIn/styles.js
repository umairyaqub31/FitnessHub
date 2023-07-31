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
  image: {
    height: responsiveHeight(10), // 50% of window height
    width: responsiveWidth(45),
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
  roundBtn: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    borderColor: colors.gray,
    borderWidth: 1,
    height: responsiveHeight(7), // 50% of window height
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    borderRadius: 35,
  },
  btnImage: {
    marginRight: 13,
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
  titleText: {
    fontWeight: 'bold',
    fontFamily: fonts.Medium,
    fontSize: responsiveFontSize(3),
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
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
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
