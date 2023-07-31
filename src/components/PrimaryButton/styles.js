import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors} from '@config';

const styles = StyleSheet.create({
  primaryBtn: {
    backgroundColor: colors.primary,
    height: responsiveHeight(8),
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    alignSelf: 'center',
  },
  btnText: {
    color: colors.white,
    fontWeight: '500',
    fontSize: responsiveFontSize(2.5),
  },
});

export default styles;
