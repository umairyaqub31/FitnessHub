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
    backgroundColor: colors.white,
    paddingHorizontal: 30,
    paddingTop: 30,
    position: 'absolute',
    top: 230,
    elevation: 10,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    left: 0,
    right: 0,
    bottom: 0,
  },
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  backImage: {
    height: 270,
    resizeMode: 'cover',
    width: windowWidth,
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  titleText: {
    fontWeight: 'bold',
    fontFamily: fonts.Medium,
    fontSize: responsiveFontSize(3.8),
    color: colors.white,
  },
  heading: {
    fontWeight: '600',
    fontSize: responsiveFontSize(2),
    color: colors.black,
  },

  spacing: {
    height: 15,
  },
  spacingXL: {height: 20},
  textGray: {
    fontSize: 12,
    color: colors.gray,
    fontWeight: '700',
    // paddingVertical: 5,
  },
  textBold: {
    fontSize: 20,
    fontWeight: '700',
    // fontFamily: fonts.Medium,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  card: {
    width: '100%',
    height: responsiveHeight(15),
    backgroundColor: colors.primary,
    borderRadius: 15,
    paddingLeft: 15,
    paddingRight: 30,
  },
  smallCard: {
    width: '47%',
    height: responsiveHeight(16),
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 15,
  },
  roundView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {marginTop: 15},
  opacityTitle: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 18,
    fontWeight: '600',
  },
  whiteTitle: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '700',
  },
});

export default styles;
