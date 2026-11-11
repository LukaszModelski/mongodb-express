import { StyleSheet } from "react-native";
import { colors } from "../../vars/colors";

export const userViewStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  label: {
    color: colors.gray,
    marginBottom: 4,
  },
  email: {
    fontSize: 18,
    fontWeight: "700",
  },
});
