import { StyleSheet } from 'react-native';
import { colors } from "../../vars/colors";

export const listStyles = StyleSheet.create({
  list: {
    marginBottom: '10px'
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '10px',
  },
  descriptionContainer: {
    flexDirection: 'row',
  },
  amount: {
    width: '50px',
    borderRightWidth: '3px',
    borderRightColor: colors.blue,
    borderStyle: 'solid',
  },
  description: {
    paddingLeft: '10px',
  },
  data: {
    color: colors.gray
  },
  textBlue: {
    color: colors.blue,
    fontWeight: '700'
  },
  sum: {
    color: colors.gray,
    fontWeight: '700',
    marginBottom: '20px'
  }
});
