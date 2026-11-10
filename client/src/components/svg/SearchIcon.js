import React from "react";
import Svg, { Circle, Line } from "react-native-svg";

export const SearchIcon = ({ size = 24, color = "#fff" }) => (
  <Svg height={size} width={size} viewBox="0 0 24 24">
    <Circle
      cx="10"
      cy="10"
      r="6"
      fill="transparent"
      stroke={color}
      strokeWidth="2"
    />
    <Line
      x1="14.5"
      y1="14.5"
      x2="20"
      y2="20"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);
