import React, { ReactElement } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Animated, StyleSheet, Dimensions } from 'react-native'
import { IconButton } from '../common/IconButton'

const { width } = Dimensions.get('window')

type NavigationBarProps = {
  opacity: Animated.AnimatedInterpolation
}

export const NavigationBar = ({ opacity }: NavigationBarProps): ReactElement => {
  const navigation = useNavigation()
  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <IconButton iconName="arrow-left" onPress={() => navigation.goBack()} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    width,
    height: 70,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
})
