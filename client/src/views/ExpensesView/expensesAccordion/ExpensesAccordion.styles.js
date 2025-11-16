import { StyleSheet } from 'react-native';
import { colors } from '../../../vars/colors'

export const accordionStyles = StyleSheet.create({
  accordion: {
    marginBottom: 10,
  },
  accrodionHead: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1
  },
  sum: {
    position: 'absolute',
    right: 30,
    top: 0
  },
  pieChartIcon: {
    position: 'absolute',
    right: 0,
    top: 0
  },
  accordionOpen: {
    display: 'flex'
  },
  accordionClose: {
    display: 'none'
  }
});
