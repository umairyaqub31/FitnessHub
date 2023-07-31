import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '@config';
import {fonts} from '@config';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrolledView: {
    flex: 1,
    // minWidth: windowWidth,
    // height: windowHeight,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    position: 'absolute',
    top: 260,
    elevation: 10,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    left: 0,
    right: 0,
    bottom: 0,
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
  backImage: {
    height: 300,
    resizeMode: 'cover',
    width: windowWidth,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  listImage: {
    height: 120,
    width: 120,
    borderRadius: 20,
  },

  titleText: {
    fontWeight: 'bold',
    fontFamily: fonts.Medium,
    fontSize: responsiveFontSize(3.8),
    color: colors.white,
  },

  text: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: colors.black,
  },
  spacing: {
    height: 15,
  },
  spacingXL: {
    height: 20,
  },
  textGray: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: 'rgba(0, 0, 0, 0.54)',
    // paddingVertical: 5,
  },
  textBold: {
    fontSize: 18,
    fontFamily: fonts.Medium,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    height: responsiveHeight(7.5), // 50% of window height
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    borderRadius: 40,
    marginHorizontal: 20,
  },
  primaryBtn2: {
    width: '45%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 30,
  },
  borderBtn: {
    width: '45%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 30,
  },
  btnText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: responsiveFontSize(2.5),
  },
  popUpHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10,
  },
  textPrimary: {
    fontSize: 16,
    fontFamily: fonts.Medium,
    color: colors.primary,
  },
  touchOpacity: {
    position: 'absolute',
    right: 20,
    top: 2,
  },
  verticleLine: {
    height: '60%',
    width: 1,
    backgroundColor: colors.gray,
    position: 'absolute',
    right: 50,
  },
  windowWidth: {
    width: windowWidth,
  },
  scrolledview2: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  primaryBtnText: {
    color: colors.white,
    fontFamily: fonts.Medium,
    fontSize: 14,
  },
  modalTitleText: {
    fontWeight: '500',
    fontSize: 18,
    color: colors.black,
  },
});

export default styles;
