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
    backgroundColor: colors.white,
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
    fontWeight: '500',
    fontSize: responsiveFontSize(2),
  },
  card: {
    borderWidth: 1,
    borderColor: colors.gray,
    height: responsiveHeight(12),
    borderRadius: 15,
    justifyContent: 'center',
  },
  selectedCard: {
    height: responsiveHeight(12),
    borderRadius: 15,
    justifyContent: 'center',
  },

  femaleImage: {
    height: responsiveHeight(17),
    width: responsiveWidth(23),
    marginBottom: responsiveHeight(5),
    marginRight: 15,
  },
  maleImage: {
    height: responsiveHeight(17),
    width: responsiveWidth(17),
    marginBottom: responsiveHeight(5),
    marginRight: 15,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
