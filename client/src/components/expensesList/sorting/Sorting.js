
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sortMonthExpensesByDate, sortMonthExpensesByPrice, sortMonthExpensesByCategory } from '../../../store/actions';
import { View, Text } from 'react-native';
import { sortingStyles } from "./Sorting.styles";

export const Sorting = ({ month }) => {
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState({
    date: true,
    price: false,
    category: false
  });

  const sortByDate = () => {
    setActiveItem({date: true, price: false, category: false});
    dispatch(sortMonthExpensesByDate(month));
  }
  
  const sortByPrice = () => {
    setActiveItem({price: true, date: false, category: false});
    dispatch(sortMonthExpensesByPrice(month));
  }

  const sortByCategory = () => {
    setActiveItem({category: true, price: false, date: false});
    dispatch(sortMonthExpensesByCategory(month));
  }

  return (
    <View style={sortingStyles.sortingTab}>
      <Text style={sortingStyles.item}>Sort by: </Text>
      <Text style={[sortingStyles.item, activeItem.date ? sortingStyles.active : null]} onPress={sortByDate}>Date</Text>
      <Text style={[sortingStyles.item, activeItem.price ? sortingStyles.active : null]} onPress={sortByPrice}>Price</Text>
      <Text style={[sortingStyles.item, activeItem.category ? sortingStyles.active : null]} onPress={sortByCategory}>Category</Text>
    </View>
  )
}
