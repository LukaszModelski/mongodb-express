import { StyleSheet } from "react-native";
import { colors } from "../../vars/colors";

export const searchViewStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    paddingVertical: 11,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  hint: {
    color: colors.gray,
    marginBottom: 15,
  },
});
