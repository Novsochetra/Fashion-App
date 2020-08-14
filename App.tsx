import React, { ReactElement } from 'react'
import { View } from 'react-native'
import { AppLoading } from 'expo'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useFonts } from 'expo-font'
import { Feather as FeatherIcon } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HomeScreen } from './src/HomeScreen'
import { DetailScreen } from './src/DetailScreen'
import { CartScreen } from './src/CartScreen'
import { Text } from './src/common/Text'

console.disableYellowBox = true

const Stack = createStackNavigator()

const HomeStack = (): ReactElement => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardOverlayEnabled: true,
      cardStyleInterpolator: ({ current: { progress } }) => ({
        cardStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 0.5, 0.9, 1],
            outputRange: [0, 0.25, 0.7, 1],
          }),
        },
        overlayStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
            extrapolate: 'clamp',
          }),
        },
      }),
    }}
    mode="modal"
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Detail" component={DetailScreen} />
  </Stack.Navigator>
)

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
  const [fontsLoaded] = useFonts({
    JosefinSans: require('./assets/font/JosefinSans-Regular.ttf'),
  })
  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <BottomTab.Navigator tabBarOptions={{ showLabel: false }}>
            <BottomTab.Screen
              name="Home"
              component={HomeStack}
              options={{
                tabBarIcon: getTabBarIcon('home'),
              }}
            />
            <BottomTab.Screen
              name="WishList"
              component={() => (
                <View>
                  <Text>Wishlist Screen</Text>
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
              component={CartScreen}
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
      </SafeAreaView>
    )
  }
}

export default App
