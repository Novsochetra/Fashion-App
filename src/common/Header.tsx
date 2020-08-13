import React, { ReactElement } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '../common/Text'
import { IconButton } from './IconButton'

type HeaderProps = {}

export const Header = (_: HeaderProps): ReactElement => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftHeaderWrapper}>
        <Text style={styles.title}>Discover</Text>
      </View>

      <View style={styles.rightHeaderWrapper}>
        <IconButton iconName="search" />
        <IconButton iconName="bell" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  leftHeaderWrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },

  rightHeaderWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})
