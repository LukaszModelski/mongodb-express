import { StyleSheet } from 'react-native';
import { colors } from "../../../vars/colors";

export const listItemStyles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  descriptionContainer: {
    flexDirection: 'row',
  },
  amount: {
    width: 50,
    borderRightWidth: 3,
    borderRightColor: colors.blue
  },
  description: {
    paddingLeft: 10,
  },
  data: {
    color: colors.gray
  },
  textBlue: {
    color: colors.blue,
    fontWeight: '700'
  },
  editPanel: {
    position: 'absolute',
    right: 0,
    top: 0
  }
});
