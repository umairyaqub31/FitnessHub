import {StyleSheet} from 'react-native';
import {colors, fonts} from '@config';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingLeft: 40,
    paddingRight: 80,
    paddingTop: 40,
  },
  titleText: {
    fontWeight: 'bold',
    fontFamily: fonts.Medium,
    fontSize: responsiveFontSize(3),
    marginTop: 25,
    marginBottom: 40,
  },
  inline: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  primaryText: {
    color: colors.primary,
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 35,
  },
  dateText: {
    color: colors.black,
    fontWeight: '600',
    fontSize: 12,
  },
});
export default styles;
