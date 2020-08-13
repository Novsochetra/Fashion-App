import React, { ReactElement } from 'react'
import { Animated, StyleSheet, Image, Dimensions, View } from 'react-native'
import { useRoute } from '@react-navigation/native'

type BackgroundCircleProps = {
  transformWidth: Animated.Value
  transformHeight: Animated.Value
  transformBorderRadius: Animated.Value
  translateX: Animated.Value
  translateY: Animated.Value
  scale: Animated.AnimatedInterpolation
}

const windowWidth = Dimensions.get('window').width

export const BackgroundCircle = ({
  transformWidth,
  transformHeight,
  transformBorderRadius,
  translateX,
  translateY,
  scale,
}: BackgroundCircleProps): ReactElement => {
  const { params }: any = useRoute()
  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: params.backgroundColor,
          width: transformWidth,
          height: transformHeight,
          borderRadius: transformBorderRadius,
          transform: [{ translateY }, { translateX }, { scale }],
        },
      ]}
    >
      <Image source={require('../assets/shoe1.png')} style={styles.image} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'orange',
    height: 200,
  },

  image: {
    height: windowWidth / 5.5,
    width: windowWidth / 2.5,
    position: 'absolute',
    bottom: 100 / 4,
    left: 100 / 1.5,
    transform: [{ rotateZ: '-25deg' }],
  },
})
