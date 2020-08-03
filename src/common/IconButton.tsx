import React, {ReactElement} from 'react'
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native'
import {Feather as FeatherIcon} from '@expo/vector-icons'

type IconButtonProps = {
  iconName: string
  color?: string
  btnContainerStyle?: StyleProp<ViewStyle>
}

export const IconButton = ({
  iconName,
  color = '#000000',
  btnContainerStyle,
}: IconButtonProps): ReactElement => {
  return (
    <View style={[styles.iconButtonContainer, btnContainerStyle]}>
      <FeatherIcon name={iconName} size={20} color={color} />
    </View>
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
