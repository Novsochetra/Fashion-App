import React, { useMemo, ReactElement } from 'react'
import { View, Text, Animated, FlatList, Dimensions, StyleSheet } from 'react-native'
import { SAMPLE_SLIDEER_DATA } from '../API'
import { Card, CARD_WIDTH, CARD_MARGIN, PADDING } from './Card'
import { ISlider } from '../HomeScreen'
const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window')

export const TabItem = (): ReactElement => {
  const offsetX = new Animated.Value(0)
  const velocityX = new Animated.Value(0)
  const fullCardWidth = CARD_WIDTH + CARD_MARGIN * 2

  const snapToOffsets = useMemo(() => [...Array(5).keys()].map((_, i) => i * fullCardWidth), [])

  const onScrollEvent = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            x: offsetX,
          },
          velocity: {
            x: velocityX,
          },
        },
      },
    ],
    { useNativeDriver: true }
  )

  const renderItem = ({ item, index }: { item: ISlider; index: number }): ReactElement => {
    const isLeft = (index + 1) * fullCardWidth - fullCardWidth
    const isMiddle = isLeft + fullCardWidth / 2
    const isDisappeaing = isMiddle - (isMiddle - isLeft) / 2
    const isRight = isLeft + fullCardWidth

    const rotateY = offsetX.interpolate({
      inputRange: [isLeft, isRight],
      outputRange: [0, 0.8],
    })

    const shoeImageRotateZ = offsetX.interpolate({
      inputRange: [isLeft, isRight],
      outputRange: ['-25deg', '40deg'],
    })

    const shoeTranslateXSpeed = offsetX.interpolate({
      inputRange: [isLeft, isDisappeaing, isRight],
      outputRange: [0, -fullCardWidth / 2, -fullCardWidth],
      extrapolateLeft: 'clamp',
    })

    return (
      <Card
        key={`card-${index}`}
        item={item}
        rotateY={rotateY}
        offsetX={offsetX}
        shoeImageRotateZ={shoeImageRotateZ}
        shoeTranslateXSpeed={shoeTranslateXSpeed}
      />
    )
  }

  return (
    <View style={styles.contentWrapper}>
      <Animated.FlatList
        data={SAMPLE_SLIDEER_DATA}
        renderItem={renderItem}
        keyExtractor={(_: any, index: number) => `item-${index}`}
        contentContainerStyle={styles.contentContainerStyle}
        showsHorizontalScrollIndicator={false}
        snapToOffsets={snapToOffsets}
        pagingEnabled
        horizontal
        decelerationRate="fast"
        onScroll={onScrollEvent}
        scrollEventThrottle={16}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: PADDING,
    paddingHorizontal: 5,
  },

  contentWrapper: {
    width: WINDOW_WIDTH,
  },
})
