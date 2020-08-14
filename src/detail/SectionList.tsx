import React, { ReactElement } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'

export const SectionList = (): ReactElement => {
  return (
    <View style={styles.container}>
      <ShoeItem />
      <ShoeItem />
      <ShoeItem />
      <ShoeItem />
    </View>
  )
}

const ShoeItem = (): ReactElement => {
  return (
    <TouchableOpacity style={styles.itemContainer} activeOpacity={0.9}>
      <Image source={require('../assets/shoe1.png')} style={styles.image} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  itemContainer: {
    width: '24%',
    height: 60,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '70%',
    height: 30,
  },
})
