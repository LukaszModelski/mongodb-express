import React from 'react';
import Svg, { Circle } from 'react-native-svg';
import { TouchableOpacity } from 'react-native';

export const PieChartIcon = ({ size, style, onPress }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Svg height={size} width={size} viewBox="0 0 100 100" >
      <Circle cx="50" cy="50" r="50" fill="green" />
      {/*  7850 = 3.14 + 50 * 50 */}
      <Circle cx="50" cy="50" r="25" fill="transparent" stroke="blue" strokeWidth="50" strokeDasharray="100 7850"/>
      <Circle cx="50" cy="50" r="25" fill="transparent" stroke="red" strokeWidth="50" strokeDasharray="50 7850"/>
    </Svg>
  </TouchableOpacity>
);
