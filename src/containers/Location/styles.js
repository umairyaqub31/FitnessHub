import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '@config';
import {fonts} from '@config';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    // flex: 1,
    height: windowHeight,
  },
  markerItemImg: {
    height: 37,
    width: 37,
    borderRadius: 20,
    position: 'absolute',
    top: 7,
    // left: 9.4,
    alignSelf: 'center',
    zIndex: 10,
  },
  markerItemBkg: {
    width: 52,
    height: 60,
  },
  customTextInput: {
    borderRadius: 30,
    backgroundColor: colors.white,
    color: colors.black,
    height: 60,
    width: '75%',
    paddingLeft: 20,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 50,
  },
  verticleLine: {
    height: '60%',
    width: 1,
    backgroundColor: colors.gray,
    position: 'absolute',
    right: 50,
  },
  customTextInputText: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: 'rgba(0, 0, 0, 0.54)',
    paddingVertical: 5,
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
  windowWidth: {
    width: windowWidth,
  },
  scrolledview: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  touchOpacity: {
    position: 'absolute',
    right: 20,
    top: 2,
  },
  spacingXL: {
    height: 20,
  },
  spacing: {
    height: 6,
  },

  titleText: {
    fontWeight: '500',
    fontSize: 18,
    color: colors.black,
  },
  center: {
    textAlign: 'center',
  },
  textgray: {
    fontSize: 16,
    color: colors.gray,
  },
  borderBtn: {
    width: '45%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 30,
  },
  primaryBtn: {
    width: '45%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 30,
  },
  primaryBtnText: {
    color: colors.white,
    fontFamily: fonts.Medium,
    fontSize: 14,
  },
  popUpHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10,
  },
  textPrimary: {
    fontSize: 16,
    fontFamily: fonts.Medium,
    color: colors.primary,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default styles;
