import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '@config';
import {fonts} from '@config';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  imageContainer: {
    // flex: 1,
    // backgroundColor: colors.white,
    padding: 15,
    paddingHorizontal: 25,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch',
  },
  titleText: {
    fontWeight: 'bold',
    fontFamily: fonts.Medium,
    fontSize: 22,
  },
  card: {
    backgroundColor: '#149A4A',
    padding: 15,
    marginTop: 15,
    borderRadius: 25,
    paddingBottom: 50,
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
    marginHorizontal: 20,
    borderRadius: 15,
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
  textBold: {
    fontSize: 18,
    fontFamily: fonts.Medium,
  },
  primaryText: {
    fontSize: 16,
    fontFamily: fonts.Medium,
    color: colors.primary,
  },
  spacing: {
    height: 13,
  },
  logo: {
    width: 180,
    height: 130,
    resizeMode: 'contain',
    marginRight: 10,
  },
});

export default styles;
