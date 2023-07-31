import {StyleSheet} from 'react-native';
import {fonts} from '@config';
import {colors} from '@config';
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 40,
    backgroundColor: colors.white,
    // flex: 1,
  },
  listImage: {
    height: 120,
    width: 120,
    borderRadius: 20,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
  },
  textGray: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: 'rgba(0, 0, 0, 0.54)',
    // paddingVertical: 5,
  },
  TextInput: {
    flex: 1,
    minHeight: 150,
    textAlignVertical: 'top',
    padding: 10,
  },
  TextInputContainer: {
    backgroundColor: colors.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingRight: 5,
  },
  imagePickerView: {
    minHeight: 172,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 27,
  },
  pickerImage: {
    width: 92,
    height: 66,
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
    marginBottom: 100,
  },
  textBold: {
    fontSize: 18,
    fontFamily: fonts.Medium,
  },
});

export default styles;
