import React, { ReactElement } from 'react'
import { Image, View, Dimensions, StyleSheet } from 'react-native'
import { Text } from '../common/Text'
import { ISlider } from '../HomeScreen'
import { IconButton } from './IconButton'

export const WINDOW_WIDTH = Dimensions.get('window').width
export const PADDING = 15
export const CARD_MARGIN = 15
export const CARD2_WIDTH = (WINDOW_WIDTH - CARD_MARGIN * 2 - PADDING * 2) * 0.7

type CardProps = {
  item: ISlider
}

export const Card2 = ({
  item: { brandName, productName, price, productURL },
}: CardProps): ReactElement => {
  return (
    <View style={[styles.cardContainer]}>
      <View style={styles.ribbon}>
        <Text style={styles.ribbonLabel}>New</Text>
      </View>
      <View style={styles.cardHeader}>
        <IconButton iconName="heart" color="#ffffff" btnContainerStyle={styles.IconButtonStyle} />
      </View>
      <View style={styles.cardContent}>
        <Image source={productURL} style={styles.productPhoto} />
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.productName}>
          {brandName} {productName}
        </Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: PADDING,
    backgroundColor: '#fff',
    width: CARD2_WIDTH,
    height: '100%',
    borderRadius: 20,
    marginHorizontal: CARD_MARGIN,
    // marginRight: CARD_MARGIN,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  productName: {
    marginVertical: 5,
    fontSize: 15,
    textTransform: 'uppercase',
    color: '#000000',
    fontWeight: '500',
  },

  price: {
    marginVertical: 5,
    color: '#000000',
    fontSize: 13,
    fontWeight: '500',
  },

  productPhoto: {
    width: CARD2_WIDTH,
    height: 100,
  },

  IconButtonStyle: {
    backgroundColor: 'transparent',
    marginRight: 0,
  },

  cardContent: {
    flex: 1,
  },

  cardFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  ribbon: {
    backgroundColor: '#df5e88',
    // backgroundColor: THEME_COLOR.red,
    width: 70,
    paddingVertical: 2,
    position: 'absolute',
    top: 35,
    left: -15,
    alignItems: 'center',
    transform: [
      {
        rotateZ: '-90deg',
      },
    ],
  },

  ribbonLabel: {
    color: '#fff',
  },
})
