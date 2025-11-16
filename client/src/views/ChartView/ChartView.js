import React from "react";
import { useSelector } from "react-redux";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Summary } from "../../components/summary/Summary";
import { viewStyles } from "../../styles/view.styles";
import { utilStyles } from "../../styles/utils.styles";
import { categoryColors } from "../../vars/colors";
import { expensesArrayToObj } from "../../js/utils";

export const ChartView = ({ route, navigation }) => {
  const date = route.params.date;
  const expenses = useSelector((state) => state.expenses[date]);

  const adaptDataForChart = (expenses) => {
    const expensesObj = expensesArrayToObj(expenses);
    const adapted = Object.entries(expensesObj).map((e) => ({
      name: e[0],
      amount: e[1],
      legendFontSize: 15,
      color: categoryColors[e[0]],
      legendFontColor: "#000",
    }));
    return adapted;
  };

  return (
    <View style={viewStyles.container}>
      <ScrollView>
        <Text style={utilStyles.heading}>{date}</Text>
        <PieChart
          data={adaptDataForChart(expenses)}
          accessor={"amount"}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          width={Dimensions.get("window").width - 10}
          height={220}
          backgroundColor={"transparent"}
        />
        <Summary expenses={expenses} />
      </ScrollView>
    </View>
  );
};
