import React, { ReactElement, useState, useRef, useMemo } from 'react'
import {
  UIManager,
  FlatList,
  View,
  StyleSheet,
  ImageSourcePropType,
  LayoutAnimation,
  Animated,
  Easing,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ProductRowItem } from './cart/ProductRowItem'
import { Button } from './common/Button'
import { Header } from './cart/Header'

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

export type ProductItem = {
  id: number
  productName: string
  price: string
  productPhoto: ImageSourcePropType
}

const DATA: ProductItem[] = [
  {
    id: 0,
    productName: 'Air Jordan Slaney Jsp',
    price: '$150.00',
    productPhoto: require('./assets/shoe1.png'),
  },
]
export const CartScreen = (): ReactElement => {
  const [products, setProducts] = useState(DATA)
  const flatlistRef = useRef<FlatList>(null)

  const renderItem = ({ item, index }: { item: ProductItem; index: number }): ReactElement => {
    return (
      <ProductRowItem
        index={index}
        key={`cart-${item.id}`}
        product={item}
        handleRemoveProduct={handleRemoveProduct}
      />
    )
  }

  const _addProductAnimation = (): void => {
    LayoutAnimation.configureNext({
      duration: 1000,
      create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.3,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.7,
      },
    })
  }

  const handleAddProduct = (): void => {
    const id = Math.floor(Math.random() * 100 + 1)
    const newProdct: ProductItem = {
      id,
      price: '$150.00',
      productName: `New Product ${id}`,
      productPhoto: require('./assets/shoe1.png'),
    }

    if (flatlistRef?.current) flatlistRef.current.scrollToOffset({ animated: true, offset: 0 })

    _addProductAnimation()

    setProducts((prev) => [newProdct, ...prev])
  }

  const _removeProductAnimation = (): void => {
    LayoutAnimation.configureNext({
      duration: 1000,
      delete: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.8,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.8,
      },
    })
  }

  const handleRemoveProduct = (index?: number): void => {
    if (flatlistRef?.current) flatlistRef.current.scrollToOffset({ animated: true, offset: 0 })

    if (index !== undefined) {
      setProducts((prev) => {
        prev.splice(index, 1)
        return [...prev]
      })
      _removeProductAnimation()
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header totalItem={products.length} />
      <FlatList
        data={products}
        ref={flatlistRef}
        keyExtractor={(item: ProductItem) => item.id.toString()}
        renderItem={renderItem}
      />
      <View style={styles.footerWrapper}>
        <Button label="ADD" onPress={handleAddProduct} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  footerWrapper: {
    paddingHorizontal: 15,
  },
})
