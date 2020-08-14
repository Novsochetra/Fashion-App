import React, { ReactElement, useState, useEffect, useMemo } from 'react'
import { Animated, View, StyleSheet, Dimensions, Easing } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { CARD_WIDTH } from './common/Card'
import { NavigationBar } from './detail/NavigationBar'
import { BackgroundCircle } from './detail/BackgroundCircle'
import { SectionList } from './detail/SectionList'
import { Description } from './detail/Description'
import { VariantPart } from './detail/VariantPart'
import { Button } from './common/Button'

const { width, height } = Dimensions.get('window')

export const DetailScreen = (): ReactElement => {
  const { bottom } = useSafeAreaInsets()
  const [ready, _setReady] = useState(false)
  const additionTranslateY = width / 1
  const headerTranslateY = useMemo(() => new Animated.Value(100), [])
  const headerTranslateX = useMemo(() => new Animated.Value(0), [])
  const [activeShoeSize, setActiveShoeSize] = useState(0)

  const headerTranformWidth = new Animated.Value(CARD_WIDTH)
  const headerBorderRadius = new Animated.Value(0)

  const contentTranslateY = new Animated.Value(height / 2)
  const contentOpacity = contentTranslateY.interpolate({
    inputRange: [-additionTranslateY, 0, height / 4, height / 2],
    outputRange: [1, 1, 0, 0],
  })
  const duration = 500

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
        easing: Easing.elastic(2),
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

  const handleChangeVariantShoeSize = (i: number): void => setActiveShoeSize(i)

  return (
    <SafeAreaView style={[styles.safeArea, { paddingBottom: bottom }]}>
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
      >
        <SectionList />

        <View style={styles.divider} />

        <Description />

        <VariantPart
          activeIndex={activeShoeSize}
          handleChangeVariantShoeSize={handleChangeVariantShoeSize}
        />

        <View style={styles.footerWrapper}>
          <Button label={`ADD TO BAG`} />
        </View>
      </Animated.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  contentContainer: {
    width,
    height: '100%',
    marginTop: 10,
    padding: 15,
    flexDirection: 'column',
  },

  divider: {
    height: 1,
    backgroundColor: 'brown',
  },

  footerWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingBottom: 15,
  },
})
