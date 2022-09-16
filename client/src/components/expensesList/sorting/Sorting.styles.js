import { StyleSheet } from 'react-native';
import { colors } from '../../../vars/colors'

export const sortingStyles = StyleSheet.create({
  sortingTab: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10
  },
  item: {
    marginRight: 10
  },
  active: {
    fontWeight: '700',
  },
});
