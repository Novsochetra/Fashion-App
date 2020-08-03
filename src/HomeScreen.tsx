import React, { ReactElement, useMemo } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Animated,
  Dimensions,
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native'
import { Header } from './common/Header'
import { Card, CARD_WIDTH, CARD_MARGIN, PADDING } from './common/Card'
import { IconButton } from './common/IconButton'
import { Card2, CARD2_WIDTH } from './common/Card2'
import { SAMPLE_SLIDEER_DATA } from './API'

type HomeScreenProps = {}

export type ISlider = {
  id: number
  brandName: string
  productName: string
  price: string
  productURL: any
  backgroundColor: string
}

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window')
export const PERSPECTIVE = 1000

Animated.createAnimatedComponent(FlatList)

export const HomeScreen = (_: HomeScreenProps): ReactElement => {
  const offsetX = new Animated.Value(0)
  const velocityX = new Animated.Value(0)
  const fullCardWidth = CARD_WIDTH + CARD_MARGIN * 2

  const fullCardWidth2 = CARD2_WIDTH + CARD_MARGIN * 1.5

  const snapToOffsets = useMemo(() => [...Array(5).keys()].map((_, i) => i * fullCardWidth), [])
  const snapToOffsets2 = useMemo(() => [...Array(5).keys()].map((_, i) => i * fullCardWidth2), [])

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
      outputRange: [0, -fullCardWidth / 2, 0],
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

  const renderItem2 = ({ item, index }: { item: ISlider; index: number }): ReactElement => {
    return <Card2 key={`card-${index}`} item={item} />
  }

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

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Header />

        <View style={styles.contentWrapper}>
          <Animated.FlatList
            data={SAMPLE_SLIDEER_DATA}
            renderItem={renderItem}
            keyExtractor={(_, index: number) => `item-${index}`}
            contentContainerStyle={{ paddingVertical: PADDING, paddingHorizontal: 5 }}
            showsHorizontalScrollIndicator={false}
            snapToOffsets={snapToOffsets}
            pagingEnabled
            horizontal
            decelerationRate="fast"
            onScroll={onScrollEvent}
            scrollEventThrottle={16}
          />
        </View>

        <View style={styles.footer}>
          <TouchableNativeFeedback>
            <View style={styles.sectionWrapper}>
              <Text style={styles.sectionFooterTitle}>More</Text>
              <IconButton iconName="arrow-right" btnContainerStyle={{ backgroundColor: '#fff' }} />
            </View>
          </TouchableNativeFeedback>
          <FlatList
            data={SAMPLE_SLIDEER_DATA}
            contentContainerStyle={{ paddingVertical: PADDING }}
            renderItem={renderItem2}
            keyExtractor={(_, index: number) => `item-${index}`}
            showsHorizontalScrollIndicator={false}
            snapToOffsets={snapToOffsets2}
            horizontal
            decelerationRate="fast"
          />
          <View
            style={{
              width: WINDOW_WIDTH,
              height: 100,
              backgroundColor: '#',
              position: 'absolute',
              zIndex: -1,
              bottom: 0,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  contentWrapper: {
    // paddingVertical: 15,
  },

  footer: {
    marginTop: 15,
    flexGrow: 1,
  },

  sectionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },

  sectionFooterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})
