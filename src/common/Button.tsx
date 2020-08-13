import React, { ReactElement } from 'react'
import {
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TextStyle,
  Animated,
  Easing,
} from 'react-native'
import { Text } from '../common/Text'

type ButtonProps = {
  label?: string
  btnContainerStyle?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  onPress?: () => void
}

export const Button = ({
  label,
  btnContainerStyle,
  labelStyle,
  onPress,
}: ButtonProps): ReactElement => {
  const scale = new Animated.Value(1)

  const zoomIn = (): void => {
    Animated.timing(scale, {
      toValue: 0.9,
      duration: 300,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start()
  }

  const zoomOut = (): void => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 300,
      easing: Easing.elastic(3),
      useNativeDriver: true,
    }).start()
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress?.()}
      onPressIn={zoomIn}
      onPressOut={zoomOut}
    >
      <Animated.View
        style={[styles.btnContainerStyle, btnContainerStyle, { transform: [{ scale }] }]}
      >
        {label && <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>}
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btnContainerStyle: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#ea4c89',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },

  labelStyle: {
    fontSize: 13,
    color: 'white',
    fontWeight: 'bold',
  },
})
