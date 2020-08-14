import React, { ReactElement } from 'react'
import { StyleSheet, StyleProp, ViewStyle, TouchableOpacity } from 'react-native'
import { Feather as FeatherIcon } from '@expo/vector-icons'

type IconButtonProps = {
  iconName: string
  color?: string
  btnContainerStyle?: StyleProp<ViewStyle>
  onPress?: () => void
}

export const IconButton = ({
  iconName,
  color = '#000000',
  btnContainerStyle,
  onPress,
}: IconButtonProps): ReactElement => {
  return (
    <TouchableOpacity
      onPress={() => onPress?.()}
      style={[styles.iconButtonContainer, btnContainerStyle]}
    >
      <FeatherIcon name={iconName} size={20} color={color} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  iconButtonContainer: {
    backgroundColor: 'lightgray',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
})
