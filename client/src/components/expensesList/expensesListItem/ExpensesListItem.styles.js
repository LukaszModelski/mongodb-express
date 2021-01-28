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
