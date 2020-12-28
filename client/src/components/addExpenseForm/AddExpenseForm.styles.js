import { StyleSheet } from 'react-native';
import { colors } from "../../vars/colors";

export const formStyles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: '20px'
  },
  labelInputWrapper: {
    marginBottom: '5px',
    width: '100%'
  },
  wrapperShort: {
    width: '50%'
  },
  label: {
    marginBottom: '5px'
  },
  input: {
    border: `1px solid ${colors.gray}`,
    paddingVertical: '10px',
    paddingHorizontal: '5px'
  },
  picker: {
    paddingVertical: '8px',
  }
});
