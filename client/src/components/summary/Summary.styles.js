import { StyleSheet } from 'react-native';
import { colors } from '../../vars/colors'

export const summaryStyles = StyleSheet.create({
  item: {
    display: 'block',
    paddingTop: 5,
    paddingBottom: 5,
    borderTopColor: colors.lightGray,
    borderTopWidth: 1
  },
  itemBold: {
    fontWeight: 700
  }
});
