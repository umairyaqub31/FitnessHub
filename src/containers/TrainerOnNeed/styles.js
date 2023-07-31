import {StyleSheet, Dimensions} from 'react-native';
import {colors, fonts} from '@config';

const height = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrolledView: {
    flex: 1,
    // minWidth: windowWidth,
    // height: windowHeight,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    position: 'absolute',
    top: 260,
    elevation: 10,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonContainer: {
    backgroundColor: colors.black,
    padding: 6,
    borderRadius: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
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
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  spacing: {
    height: 15,
  },
  spacingXL: {
    height: 20,
  },
  textGray: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: 'rgba(0, 0, 0, 0.54)',
    // paddingVertical: 5,
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: colors.black,
  },
  listImage: {
    height: 120,
    width: 120,
    borderRadius: 20,
  },
  backImage: {
    height: 300,
    resizeMode: 'cover',
    width: windowWidth,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});

export default styles;
