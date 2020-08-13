import React, { ReactElement } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '../common/Text'

export const Description = (): ReactElement => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Air-Max-270</Text>
        <Text style={styles.price}>$150.00</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.content}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore aliquid aperiam nesciunt.
          Aspernatur necessitatibus magni temporibus nihil eius. Architecto, qui pariatur? Ipsa
          omnis non consequatur itaque! Et maxime voluptatibus velit.
        </Text>
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.moreDetail}>MORE DETAIL</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  contentContainer: {},

  content: {
    fontSize: 13,
    lineHeight: 20,
    color: 'gray',
  },

  footerContainer: {
    marginVertical: 10,
  },

  moreDetail: {
    fontSize: 13,
    color: 'black',
    textDecorationLine: 'underline',
  },
})
