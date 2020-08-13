import React, { ReactElement } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Animated, StyleSheet, Dimensions } from 'react-native'
import { IconButton } from '../common/IconButton'

const { width } = Dimensions.get('window')

type NavigationBarProps = {
  opacity: Animated.AnimatedInterpolation
}

export const NavigationBar = ({ opacity }: NavigationBarProps): ReactElement => {
  const navigation = useNavigation()
  const { params }: any = useRoute()
  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <IconButton
        iconName="arrow-left"
        color="#ffffff"
        btnContainerStyle={[
          styles.iconButton,
          { backgroundColor: params.backgroundColor ?? 'orange' },
        ]}
        onPress={() => {
          console.log('GO BACK')
          navigation.goBack()
        }}
      />
      <IconButton
        iconName="heart"
        color="#ffffff"
        btnContainerStyle={[
          styles.btnHeart,
          { backgroundColor: params.backgroundColor ?? 'orange' },
        ]}
        onPress={() => {
          console.log('GO BACK')
          navigation.goBack()
        }}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    width,
    height: 50,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
  },

  iconButton: {
    backgroundColor: 'transparent',
    width: 40,
    height: 40,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  btnHeart: {
    backgroundColor: 'orange',
    width: 40,
    height: 40,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
})
