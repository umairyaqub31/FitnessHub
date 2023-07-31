import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '@config';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  DropdownMainView: {
    width: '100%',
    alignSelf: 'center',
  },
  DropdownTouch: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    // paddingTop: 17,
    // backgroundColor: colors.black,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: colors.white,
    paddingHorizontal: 10,
  },
  DropdownImage: {
    width: 12,
    height: 14,
    marginRight: 5,
  },
  DropdownOptionText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.primary,
  },
  DropdownOptionText1: {
    fontSize: 16,
    // fontWeight: '500',
    color: colors.primary,
    marginBottom: 10,
  },

  DropdownOptionView: {
    maxHeight: 180,
    backgroundColor: colors.black,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 50,
    position: 'absolute',
    zIndex: 111,
    width: '100%',
    elevation: 5,
  },
  DropdownHeading: {
    fontSize: responsiveFontSize(1.8),
    color: colors.black,
    marginBottom: 10,
  },
});

export default styles;
