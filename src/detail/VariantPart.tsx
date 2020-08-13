import React, { ReactElement } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from '../common/Text'

const VARIANT_SIZE = [
  { id: 0, label: 'Try it' },
  { id: 1, label: '7.5' },
  { id: 2, label: '8' },
  { id: 3, label: '9.5' },
]

type VariantPartProps = {
  activeIndex: number
  handleChangeVariantShoeSize: (index: number) => void
}

export const VariantPart = ({
  activeIndex,
  handleChangeVariantShoeSize,
}: VariantPartProps): ReactElement => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text>Size</Text>
        <Text>UK USA</Text>
      </View>

      <View style={styles.contentContainer}>
        {VARIANT_SIZE.map((v) => (
          <ButtonShoeSize
            key={`shoeSize ${v.id}`}
            label={v.label}
            active={activeIndex === v.id}
            onPress={() => handleChangeVariantShoeSize(v.id)}
          />
        ))}
      </View>
    </View>
  )
}

type ButtonShoeSizeProps = {
  label: string
  active?: boolean
  onPress?: () => void
}

const ButtonShoeSize = ({ label, active, onPress }: ButtonShoeSizeProps): ReactElement => {
  const activeBtnBackground = { backgroundColor: active ? 'black' : 'white' }
  const textActiveColor = { color: active ? 'white' : 'gray' }
  return (
    <TouchableOpacity style={[styles.btnShoeSize, activeBtnBackground]} onPress={() => onPress?.()}>
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
