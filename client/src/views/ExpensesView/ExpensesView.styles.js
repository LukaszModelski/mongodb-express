import { Platform, StyleSheet } from "react-native";
import { colors } from "../../vars/colors";

export const expensesViewStyles = StyleSheet.create({
  list: {
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 90, // keeps the last item clear of the search button
  },
  searchButton: {
    // On web the screen grows with its content, so "absolute" would sit at the
    // end of the list. "fixed" pins the button to the browser window instead.
    position: Platform.OS === "web" ? "fixed" : "absolute",
    zIndex: 10,
    right: 20,
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
  },
  sum: {
    color: colors.gray,
    fontWeight: "700",
    marginBottom: 20,
  },
});
