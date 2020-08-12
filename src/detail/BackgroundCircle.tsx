import React, { ReactElement } from 'react'
import { Animated, StyleSheet } from 'react-native'

type BackgroundCircleProps = {
  transformWidth: Animated.Value
  transformHeight: Animated.Value
  transformBorderRadius: Animated.Value
  translateX: Animated.Value
  translateY: Animated.Value
  scale: Animated.AnimatedInterpolation
}

export const BackgroundCircle = ({
  transformWidth,
  transformHeight,
  transformBorderRadius,
  translateX,
  translateY,
  scale,
}: BackgroundCircleProps): ReactElement => {
  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: transformWidth,
          height: transformHeight,
          borderRadius: transformBorderRadius,
          transform: [{ translateY }, { translateX }, { scale }],
        },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'orange',
    height: 200,
  },
})
