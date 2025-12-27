import { View, ActivityIndicator } from "react-native";
import { colors } from "../../vars/colors";
import { splashViewStyles } from "./SplashView.styles";

export const SplashView = () => {
  return (
    <View style={splashViewStyles.container}>
      <ActivityIndicator size="large" color={colors.blue} />
    </View>
  );
};
