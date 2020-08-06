import React, { useRef, LegacyRef, MutableRefObject } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export const HomeScreen = () => {
  let boxRef: { [key: number]: MutableRefObject<TouchableOpacity> } = {}
  const openBox = () => {}
  const closeBox = () => {}

  const createBoxRef = (i): void => {
    boxRef[i] = useRef()
  }

  return (
    <View style={styles.container}>
      {[...Array(5).keys()].map((v, i) => {
        return <TouchableOpacity style={styles.boxContainer} />
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  boxContainer: {
    backgroundColor: 'red',
    margin: 10,
    width: 100,
    height: 100,
  },
})
