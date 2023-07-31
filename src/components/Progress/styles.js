import {StyleSheet, Dimensions} from 'react-native';
import {colors, fonts} from '@config';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  titleText: {
    fontWeight: '600',
    fontSize: 16,
    color: colors.white,
  },
  card: {
    backgroundColor: '#222222',
    marginVertical: 20,
    paddingHorizontal: 14,
    paddingBottom: 19,
    borderRadius: 15,
  },
  inputView: {
    borderWidth: 1,
    borderColor: colors.white,
    height: 60,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  primaryText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
    marginVertical: 14,
  },
  whiteText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
    marginVertical: 14,
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
  primaryBtn: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 15,
    marginTop: 17,
    marginBottom: 50,
  },
  primaryBtnText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default styles;
