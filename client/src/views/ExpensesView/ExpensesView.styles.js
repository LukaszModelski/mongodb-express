import { Platform, StyleSheet } from "react-native";
import { colors } from "../../vars/colors";

const floatingButton = {
  // On web the screen grows with its content, so "absolute" would sit at the
  // end of the list. "fixed" pins the button to the browser window instead.
  position: Platform.OS === "web" ? "fixed" : "absolute",
  zIndex: 10,
  bottom: 20,
  width: 45,
  height: 45,
  borderRadius: 22.5,
  // Same color as the default react-native <Button> ("New expense").
  backgroundColor: Platform.OS === "ios" ? "#007AFF" : "#2196F3",
  alignItems: "center",
  justifyContent: "center",
  elevation: 6,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
};

export const expensesViewStyles = StyleSheet.create({
  list: {
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 150, // keeps the last item clear of the floating buttons
  },
  // Two buttons stacked in the bottom right corner: search above, account below.
  searchButton: {
    ...floatingButton,
    right: 20,
    bottom: 75,
  },
  userButton: {
    ...floatingButton,
    right: 20,
  },
  sum: {
    color: colors.gray,
    fontWeight: "700",
    marginBottom: 20,
  },
});
