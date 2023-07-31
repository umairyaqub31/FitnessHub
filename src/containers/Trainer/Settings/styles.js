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
    paddingHorizontal: 25,
  },
  titleText: {
    fontWeight: 'bold',
    fontFamily: fonts.Medium,
    fontSize: responsiveFontSize(3),
  },
  heading: {
    fontWeight: '700',
    fontSize: responsiveFontSize(2),
  },
  card: {
    borderColor: colors.gray,
    borderWidth: 1,
    // height: 100,
    height: responsiveHeight(13),
    paddingHorizontal: 15,
    marginTop: 30,
    borderRadius: 15,
  },
  selectedCard: {
    backgroundColor: colors.primary,
    height: responsiveHeight(13),
    paddingHorizontal: 15,
    marginTop: 30,
    borderRadius: 15,
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
    fontSize: responsiveFontSize(1.7),
    fontFamily: fonts.Regular,
    color: colors.gray,
  },
  primaryText: {
    fontSize: 16,
    fontFamily: fonts.Medium,
    color: colors.primary,
  },
  spacing: {
    height: responsiveHeight(1.5),
  },
  spacingXL: {
    height: responsiveHeight(3),
  },
  logo: {
    // width: 30,
    // height: 30,
    height: responsiveHeight(9), // 50% of window height
    width: responsiveWidth(9),
    resizeMode: 'contain',
    marginRight: 10,
  },

  textBold: {
    fontSize: 18,
    fontFamily: fonts.Medium,
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
