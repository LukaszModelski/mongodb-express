import { StyleSheet } from 'react-native';
import { colors } from '../../../vars/colors'

export const accordionStyles = StyleSheet.create({
  accrodionHead: {
    fontSize: '16px',
    fontWeight: 700,
    marginBottom: '10px',
    borderBottomColor: colors.lightGray,
    borderBottomWidth: '1px'
  },
  accordionOpen: {
    display: 'block'
  },
  accordionClose: {
    display: 'none'
  }
});
