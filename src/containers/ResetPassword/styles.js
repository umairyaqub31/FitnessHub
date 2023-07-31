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
    padding: 15,
    paddingHorizontal: 20,
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
  text: {
    fontSize: 14,
    fontFamily: fonts.Regular,
    color: colors.black,
  },
  textGray: {
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.Regular,
    color: colors.gray,
  },
  primaryText: {
    fontSize: 16,
    fontFamily: fonts.Medium,
    color: colors.primary,
  },
  registrationtext: {
    fontSize: 24,
    fontFamily: fonts.Medium,
    textAlign: 'center',
    color: colors.black,
  },
  spacing: {
    height: responsiveHeight(2),
  },
  spacingXL: {
    height: responsiveHeight(3),
  },
  logo: {
    width: width,
    height: 100,
    resizeMode: 'contain',
  },
  widgetsText: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  widgetsForm: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  textinputrounded: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    height: 60,
    overflow: 'hidden',
    marginTop: 10,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
  },

  hyperlinkStyle: {
    textDecorationLine: 'underline',
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
  divider: {
    height: 1.5,
    backgroundColor: colors.lightGray,
    flex: 1,
  },
  horizontalDivider: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listInline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  underlineStyleBase: {
    width: 30,
    height: responsiveHeight(8),
    borderWidth: 0,
    borderBottomWidth: 3.5,
    color: colors.black,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(3),
  },
  underlineStyleHighLighted: {
    borderColor: colors.primary,
  },
});

export default styles;
