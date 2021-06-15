import { Platform } from "react-native";

export const isNative = () => {
  Platform.select({
    native: () => true,
    default: () => false
  })();
}
