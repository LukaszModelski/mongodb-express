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
    flexShrink: 1,
    flexDirection: 'row',
    paddingRight: 10,
  },
  amount: {
    flexShrink: 0,
    width: 60,
    borderRightWidth: 3,
    borderRightColor: colors.blue,
  },
  description: {
    flexShrink: 1,
    paddingLeft: 10,
  },
  data: {
    flexShrink: 0,
    color: colors.gray
  },
  textBlue: {
    color: colors.blue,
    fontWeight: '700'
  },
  editPanel: {
    position: 'absolute',
    top: 0,
    textAlign: 'right',
    backgroundColor: '#fff',
    width: 70,
    backgroundColor: 'red',
    borderRadius: 3,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  editPanelOpen: {
    right: 0
  },
  editPanelClose: {
    right: -100
  },
  editPanelText: {
    color: '#fff',
    textAlign: 'center'
  }
});
