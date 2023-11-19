import { StyleSheet } from "react-native";
import { colors } from "../../vars/colors";

export const formStyles = StyleSheet.create({
  flex: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  labelInputWrapper: {
    marginBottom: 5,
    width: "100%",
  },
  wrapperShort: {
    width: "50%",
  },
  label: {
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    paddingVertical: 12,
    paddingHorizontal: 5,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: colors.gray,
  },
  picker: {
    borderWidth: 0,
    paddingVertical: 9,
  },
  datePicker: {
    flexDirection: "row",
    marginTop: 10,
  },
  callendarIcon: {
    marginRight: 10,
  },
});
