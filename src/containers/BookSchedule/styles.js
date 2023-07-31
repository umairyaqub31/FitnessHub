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
    fontWeight: '600',
    fontSize: 18,
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
    color: colors.black,
  },
  textGray: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray,
  },
  primaryText: {
    fontSize: 16,
    fontFamily: fonts.Medium,
    color: colors.primary,
  },
  spacing: {
    height: 13,
  },
  listImage: {
    height: 101,
    width: 100,
    borderRadius: 20,
  },
  pill: {
    flexDirection: 'column',
    margin: 7,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 38,
    backgroundColor: '#E5FAEE',
    borderRadius: 6,
  },
});

export default styles;
