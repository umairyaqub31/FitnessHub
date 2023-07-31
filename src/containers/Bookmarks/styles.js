import {StyleSheet} from 'react-native';
import {colors} from '@config';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {fonts} from '@config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 15,
    paddingHorizontal: 30,
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
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  trainerTitle: {marginLeft: 20, fontWeight: '600', fontSize: 16},
  btn: {
    position: 'absolute',
    right: 10,
  },
  avatar: {
    width: 23,
    height: 23,
  },
});

export default styles;
