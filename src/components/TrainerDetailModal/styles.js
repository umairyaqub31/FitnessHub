import {StyleSheet, Dimensions} from 'react-native';
import {fonts} from '@config';
import {colors} from '@config';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  windowWidth: {
    width: windowWidth,
  },
  scrolledview: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  modalTitleLine: {
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  modalTitle: {
    width: 80,
    borderRadius: 40,
    height: 6,
    backgroundColor: colors.lightGray,
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
  touchOpacity: {
    position: 'absolute',
    right: 20,
    top: 2,
  },
  spacing: {
    height: 6,
  },
  spacingXL: {
    height: 20,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default styles;
