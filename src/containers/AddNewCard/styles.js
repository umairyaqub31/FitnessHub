import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '@config';
import {fonts} from '@config';

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
    fontSize: 22,
  },
  image: {
    height: 17,
    width: 55,
    position: 'absolute',
    right: 15,
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
  roundBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },

  text: {
    fontSize: 14,
    color: colors.black,
    fontWeight: '500',
    marginBottom: 6,
  },
  textGray: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: colors.gray,
  },
  textBold: {
    fontSize: 18,
    fontFamily: fonts.Medium,
  },

  spacing: {
    height: 15,
  },
  spacingXL: {
    height: 20,
  },
  customTextInput: {
    borderRadius: 6,
    backgroundColor: colors.lightGray,
    color: colors.black,
    height: 60,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  customTextInputText: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: 'rgba(0, 0, 0, 0.54)',
    paddingVertical: 5,
  },
});

export default styles;
