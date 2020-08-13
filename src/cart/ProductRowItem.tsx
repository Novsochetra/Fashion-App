import React, { ReactElement, useState, useMemo } from 'react'
import { Animated, Easing, Image, View, StyleSheet } from 'react-native'
import { ProductItem } from '../CartScreen'
import { IconButton } from '../common/IconButton'
import { Text } from '../common/Text'

type ProductRowItemProps = {
  index: number
  product: ProductItem
  handleRemoveProduct: (index: number) => void
}

export const ProductRowItem = ({
  index,
  product,
  handleRemoveProduct,
}: ProductRowItemProps): ReactElement => {
  const [amountItem, setAmountItem] = useState(1)
  const amountItemtranslateY = useMemo(() => new Animated.Value(0), [])
  const amountItemOpacity = useMemo(() => new Animated.Value(1), [])

  const _handleRemoveItem = (): void => {
    const newValue = amountItem - 1

    if (newValue < 1) {
      handleRemoveProduct(index)
      return
    }

    _animateScrollDown(() => setAmountItem(newValue))
  }

  const _animateScrollUp = (callback: () => void): void => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(amountItemtranslateY, {
          toValue: -10,
          duration: 100,
          easing: Easing.linear,
        }),
        Animated.timing(amountItemOpacity, {
          toValue: 0,
          duration: 100,
          easing: Easing.linear,
        }),
      ]),
      Animated.timing(amountItemtranslateY, {
        toValue: 10,
        duration: 100,
        easing: Easing.linear,
      }),
      Animated.parallel([
        Animated.timing(amountItemtranslateY, {
          toValue: 0,
          duration: 100,
          easing: Easing.linear,
        }),
        Animated.timing(amountItemOpacity, {
          toValue: 1,
          duration: 100,
          easing: Easing.linear,
        }),
      ]),
    ]).start(() => callback())
  }

  const _animateScrollDown = (callback: () => void): void => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(amountItemtranslateY, {
          toValue: 10,
          duration: 100,
          easing: Easing.linear,
        }),
        Animated.timing(amountItemOpacity, {
          toValue: 0,
          duration: 100,
          easing: Easing.linear,
        }),
      ]),
      Animated.timing(amountItemtranslateY, {
        toValue: -10,
        duration: 100,
        easing: Easing.linear,
      }),
      Animated.parallel([
        Animated.timing(amountItemtranslateY, {
          toValue: 0,
          duration: 100,
          easing: Easing.linear,
        }),
        Animated.timing(amountItemOpacity, {
          toValue: 1,
          duration: 100,
          easing: Easing.linear,
        }),
      ]),
    ]).start(() => callback())
  }

  const _handleAddItem = (): void => {
    const newValue = amountItem + 1
    _animateScrollUp(() => setAmountItem(newValue))
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftWrapper}>
        <View style={styles.backgroundBox}>
          <Image source={product.productPhoto} style={styles.productPhoto} resizeMode="contain" />
        </View>
      </View>
      <View style={styles.rightWrapper}>
        <Text style={styles.productName}>{product.productName}</Text>
        <Text style={styles.productPrice}>{product.price}</Text>

        <View style={styles.btnGroup}>
          <IconButton
            iconName="minus"
            btnContainerStyle={styles.btnContainerStyle}
            color="gray"
            onPress={() => _handleRemoveItem()}
          />
          <Animated.Text
            style={[
              styles.quantity,
              { opacity: amountItemOpacity, transform: [{ translateY: amountItemtranslateY }] },
            ]}
          >
            {' '}
            {amountItem}{' '}
          </Animated.Text>
          <IconButton
            iconName="plus"
            btnContainerStyle={styles.btnContainerStyle}
            color="gray"
            onPress={() => _handleAddItem()}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'center',
  },

  leftWrapper: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  rightWrapper: {
    flex: 2,
    paddingVertical: 30,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },

  backgroundBox: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#B5BDCD',
    alignItems: 'center',
    justifyContent: 'center',
  },

  productPhoto: {
    width: '120%',
    height: '100%',
    transform: [{ translateY: -10 }, { rotateZ: '-30deg' }, { translateX: 10 }],
  },

  productName: {
    textTransform: 'uppercase',
  },

  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  btnContainerStyle: {
    borderRadius: 5,
  },

  quantity: {
    fontSize: 15,
    fontWeight: '700',
    color: '#8e8e8e',
  },
})
