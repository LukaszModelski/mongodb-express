import React from 'react';
import { View, Text } from 'react-native';
import { expensesArrayToObj } from '../../js/utils'
import { summaryStyles } from './Summary.styles'

export const Summary = ({expenses}) => {

  const renderSummaryItems = () => {
    const expensesObj = expensesArrayToObj(expenses)
    const total = Object.values(expensesObj).reduce((prev, curr) =>  prev + curr, 0)
    return Object.entries(expensesObj)
      .sort((a, b) => b[1] - a[1])
      .map(e => <Text key={e[0]} style={summaryStyles.item}>{e[0]}: {e[1]}zł</Text>)
      .concat(<Text key={'total'} style={[summaryStyles.item, summaryStyles.itemBold]}>Total: {total}zł</Text>)
  }
 
  return (
    <View>
      <Text style={summaryStyles.item}>Summary:</Text>
      { renderSummaryItems() }
    </View>
  )
}
