import React, { ReactElement } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export const VariantPart = (): ReactElement => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text>Size</Text>
        <Text>UK USA</Text>
      </View>

      <View style={styles.contentContainer}>
        <ButtonShoeSize label="Try it" active />
        <ButtonShoeSize label="7.5" />
        <ButtonShoeSize label="Try it" />
        <ButtonShoeSize label="Try it" />
      </View>
    </View>
  )
}

type ButtonShoeSizeProps = {
  label: string
  active?: boolean
}

const ButtonShoeSize = ({ label, active }: ButtonShoeSizeProps): ReactElement => {
  const activeBtnBackground = { backgroundColor: active ? 'black' : 'white' }
  const textActiveColor = { color: active ? 'white' : 'gray' }
  return (
    <TouchableOpacity style={[styles.btnShoeSize, activeBtnBackground]}>
      <Text style={[styles.btnLabel, textActiveColor]}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {},

  titleContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },

  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  btnShoeSize: {
    width: '23%',
    borderColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },

  btnLabel: {
    color: 'gray',
  },
})
