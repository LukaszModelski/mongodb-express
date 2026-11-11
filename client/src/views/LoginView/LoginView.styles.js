import { StyleSheet } from "react-native";
import { colors } from "../../vars/colors";

export const loginViewStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    paddingVertical: 11,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  createAccountHint: {
    color: colors.gray,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
});
