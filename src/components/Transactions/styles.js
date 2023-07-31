import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '@config';
import {fonts} from '@config';

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.lightGray,
    marginHorizontal: 2,
    justifyContent: 'space-between',
  },

  inline: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: colors.white,
  },
  textGray: {
    fontSize: 14,
    fontFamily: fonts.Regular,
    color: colors.gray,
  },
  textBold: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default styles;
