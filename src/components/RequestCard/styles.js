import {StyleSheet} from 'react-native';
import {colors} from '@config';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 25,
    backgroundColor: colors.white,
    borderRadius: 15,
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
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  titleText: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: 'bold',
    marginLeft: 20,
  },
  textGray: {
    fontSize: responsiveFontSize(1.5),
    color: colors.gray,
  },
  buttonView: {
    marginLeft: 20,
    marginTop: 33,
    justifyContent: 'center',
  },
  confirmBtn: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: responsiveWidth(6),
    paddingVertical: responsiveHeight(0.7),
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  cancelBtn: {
    backgroundColor: colors.white,
    borderColor: colors.gray,
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: responsiveWidth(6),
    paddingVertical: responsiveHeight(0.7),
  },
  btnText: {
    fontSize: responsiveFontSize(1.3),
    fontWeight: '600',
    color: colors.white,
  },
  heading: {
    fontWeight: '500',
    fontSize: responsiveFontSize(1.8),
    marginBottom: 5,
  },
});

export default styles;
