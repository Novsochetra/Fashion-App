import { StatusBar } from 'expo-status-bar'
import React, { ReactElement, ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen } from './src/HomeScreen'
import { IconButton } from './src/common/IconButton'
import { Feather as FeatherIcon } from '@expo/vector-icons'

console.disableYellowBox = true

const AppStack = createStackNavigator()

type BottomTabParams = {
  Home: undefined
  WishList: undefined
  Location: undefined
  Cart: undefined
  Profile: undefined
}

const BottomTab = createBottomTabNavigator<BottomTabParams>()

const getTabBarIcon = (name: string) => ({ color, size = 25 }: { color: string; size: number }) => (
  <FeatherIcon name={name} color={color} size={size} />
)

const App = (): ReactElement => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator tabBarOptions={{ showLabel: false }}>
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: getTabBarIcon('home'),
          }}
        />
        <BottomTab.Screen
          name="WishList"
          component={() => (
            <View>
              <Text>Fack u</Text>
            </View>
          )}
          options={{
            tabBarIcon: getTabBarIcon('heart'),
          }}
        />
        <BottomTab.Screen
          name="Location"
          component={HomeScreen}
          options={{
            tabBarIcon: getTabBarIcon('map-pin'),
          }}
        />
        <BottomTab.Screen
          name="Cart"
          component={HomeScreen}
          options={{
            tabBarIcon: getTabBarIcon('shopping-cart'),
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={HomeScreen}
          options={{
            tabBarIcon: getTabBarIcon('user'),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
