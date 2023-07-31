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
  card: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 13,
    paddingRight: 18,
    borderRadius: 10,
    marginRight: 13,
  },
  dashedView: {
    borderColor: colors.gray,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
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
    color: colors.white,
  },
  textGray: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: colors.gray,
  },

  spacing: {
    height: 13,
  },
});

export default styles;
