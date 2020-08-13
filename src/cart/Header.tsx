import React, { ReactElement } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '../common/Text'

type HeaderProps = {
  totalItem: number
}

export const Header = ({ totalItem }: HeaderProps): ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bag</Text>
      <Text style={styles.totalItem}>Total {totalItem} items</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 30,
    color: '#000000',
    fontWeight: 'bold',
  },

  totalItem: {
    fontSize: 18,
  },
})
