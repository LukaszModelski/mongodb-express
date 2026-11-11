import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

export const UserIcon = ({ size = 24, color = "#fff" }) => (
  <Svg height={size} width={size} viewBox="0 0 24 24">
    <Circle
      cx="12"
      cy="8"
      r="4"
      fill="transparent"
      stroke={color}
      strokeWidth="2"
    />
    <Path
      d="M4 20c0-4 4-6 8-6s8 2 8 6"
      fill="transparent"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);
