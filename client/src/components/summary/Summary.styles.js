import { StyleSheet } from 'react-native';
import { colors } from '../../vars/colors'

export const summaryStyles = StyleSheet.create({
  item: {
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1
  },
  itemBold: {
    fontWeight: '700',
    borderBottomWidth: 0
  }
});
