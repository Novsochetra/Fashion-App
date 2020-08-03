import React, { ReactElement } from 'react'
import { View, Text, Dimensions, StyleSheet, Animated } from 'react-native'
import { PERSPECTIVE, ISlider } from '../HomeScreen'
import { IconButton } from './IconButton'

export const WINDOW_WIDTH = Dimensions.get('window').width
export const PADDING = 15
export const CARD_MARGIN = 15
export const CARD_WIDTH = (WINDOW_WIDTH - CARD_MARGIN * 2 - PADDING * 2) * 0.7
export const CARD_HEIGHT = CARD_WIDTH * 1.5

type CardProps = {
  item: ISlider
  rotateY: Animated.AnimatedInterpolation
  shoeImageRotateZ: Animated.AnimatedInterpolation
  shoeTranslateXSpeed: Animated.AnimatedInterpolation
  offsetX: Animated.Value
}

export const Card = ({
  item: { brandName, productName, price, backgroundColor, productURL },
  rotateY,
  offsetX,
  shoeImageRotateZ,
  shoeTranslateXSpeed,
}: CardProps): ReactElement => {
  return (
    <View>
      <Animated.View
        style={[
          styles.cardContainer,
          { backgroundColor, transform: [{ perspective: PERSPECTIVE }, { rotateY }] },
        ]}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.brandName}>{brandName}</Text>
          <IconButton iconName="heart" color="#ffffff" btnContainerStyle={styles.IconButtonStyle} />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.productName}>{productName}</Text>
          <Text style={styles.price}>{price}</Text>
        </View>

        <View style={styles.cardFooter}>
          <IconButton
            iconName="arrow-right"
            color="#ffffff"
            btnContainerStyle={styles.IconButtonStyle}
          />
        </View>
      </Animated.View>
      <Animated.Image
        source={productURL}
        style={[
          styles.productPhoto,
          {
            transform: [{ translateX: shoeTranslateXSpeed }, { rotateZ: shoeImageRotateZ }],
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: PADDING,
    backgroundColor: 'orange',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    // marginRight: CARD_MARGIN,
    marginHorizontal: CARD_MARGIN,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,

    elevation: 5,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  brandName: {
    fontSize: 15,
    color: '#ffffff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  productName: {
    marginVertical: 5,
    fontSize: 25,
    textTransform: 'uppercase',
    color: '#ffffff',
    fontWeight: '700',
  },

  price: {
    marginVertical: 5,
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },

  productPhoto: {
    width: CARD_WIDTH,
    height: 100,
    zIndex: 100,
    position: 'absolute',
    left: CARD_WIDTH * 0.15,
    top: CARD_HEIGHT / 3,
  },

  IconButtonStyle: {
    backgroundColor: 'transparent',
    marginRight: 0,
  },

  cardContent: {
    flex: 1,
  },

  cardFooter: {
    alignSelf: 'flex-end',
  },
})
