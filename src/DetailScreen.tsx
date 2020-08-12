import React, { ReactElement, useState, useEffect } from 'react'
import { Animated, View, Text, StyleSheet, Dimensions, Easing } from 'react-native'
import { CARD_WIDTH } from './common/Card'
import { Feather } from '@expo/vector-icons'
import { IconButton } from './common/IconButton'
import { NavigationBar } from './detail/NavigationBar'
import { BackgroundCircle } from './detail/BackgroundCircle'

const { width, height } = Dimensions.get('window')

export const DetailScreen = (): ReactElement => {
  const [ready, setReady] = useState(false)
  const additionTranslateY = width / 1
  const headerTranslateY = new Animated.Value(100)
  const headerTranslateX = new Animated.Value(0)

  const headerTranformWidth = new Animated.Value(CARD_WIDTH)
  const headerBorderRadius = new Animated.Value(0)

  const contentTranslateY = new Animated.Value(height / 2)
  const contentOpacity = contentTranslateY.interpolate({
    inputRange: [-additionTranslateY, 0, height / 4, height / 2],
    outputRange: [1, 1, 0, 0],
  })
  const duration = 3000

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerTranslateY, {
        toValue: -additionTranslateY,
        duration,
        easing: Easing.linear,
      }),
      Animated.timing(headerTranformWidth, {
        toValue: width,
        duration,
        easing: Easing.linear,
      }),
      Animated.timing(headerBorderRadius, {
        toValue: width / 2,
        duration,
        easing: Easing.linear,
      }),
      Animated.timing(headerTranslateX, {
        toValue: 100,
        duration,
        easing: Easing.linear,
      }),

      // Animate for content
      Animated.timing(contentTranslateY, {
        toValue: -additionTranslateY / 2,
        duration,
        easing: Easing.linear,
      }),
    ]).start()
  }, [ready])
  return (
    <View>
      {/* Header Animation */}
      <NavigationBar
        opacity={headerTranslateY.interpolate({
          inputRange: [-additionTranslateY, 0],
          outputRange: [1, 0],
        })}
      />

      <BackgroundCircle
        transformWidth={headerTranformWidth}
        transformHeight={headerTranformWidth}
        transformBorderRadius={headerBorderRadius}
        translateY={headerTranslateY}
        translateX={headerTranslateX}
        scale={headerTranslateY.interpolate({
          inputRange: [-additionTranslateY, CARD_WIDTH],
          outputRange: [2, 1],
        })}
      />

      <Animated.View
        style={[
          styles.contentContainer,
          {
            transform: [{ translateY: contentTranslateY }],
            opacity: contentOpacity,
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    width,
    minHeight: 200,
    flex: 1,
    flexGrow: 1,
    backgroundColor: 'blue',
    marginTop: 10,
  },
})
