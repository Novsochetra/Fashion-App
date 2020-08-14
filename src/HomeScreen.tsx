import { StatusBar } from 'expo-status-bar'
import React, { ReactElement, useMemo, useState } from 'react'
import {
  Animated,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native'
import { NavigationState, SceneRendererProps, TabBar, TabView } from 'react-native-tab-view'
import { SAMPLE_SLIDEER_DATA } from './API'
import { CARD_MARGIN, PADDING } from './common/Card'
import { Card2, CARD2_WIDTH } from './common/Card2'
import { Header } from './common/Header'
import { IconButton } from './common/IconButton'
import { TabItem } from './common/TabItem'
import { Text } from './common/Text'

type HomeScreenProps = {}

export type ISlider = {
  id: number
  brandName: string
  productName: string
  price: string
  productURL: any
  backgroundColor: string
}

export const PERSPECTIVE = 1000

Animated.createAnimatedComponent(FlatList)

export const HomeScreen = (_: HomeScreenProps): ReactElement => {
  const [navigationState, setNavigationState] = useState<NavigationState<any>>({
    index: 0,
    routes: [
      { key: 'nike', title: 'Nike' },
      { key: 'addidas', title: 'Addidas' },
      { key: 'jordan', title: 'Jordan' },
      { key: 'puma', title: 'Puma' },
      { key: 'pedro', title: 'Pedro' },
    ],
  })

  const fullCardWidth2 = CARD2_WIDTH + CARD_MARGIN * 1.5
  const snapToOffsets2 = useMemo(() => [...Array(5).keys()].map((_v, i) => i * fullCardWidth2), [])

  const renderItem2 = ({ item, index }: { item: ISlider; index: number }): ReactElement => {
    return <Card2 key={`card-${index}`} item={item} />
  }

  const renderScene = (): ReactElement => {
    return <TabItem />
  }

  const renderTabBar = (
    props: SceneRendererProps & { navigationState: NavigationState<any> }
  ): ReactElement => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles.tabIndicatorStyle}
      style={styles.tabBarStyle}
      indicatorContainerStyle={styles.tabbarIndicatorContainerStyle}
      labelStyle={styles.tabBarLabelStyle}
      tabStyle={styles.tabStyle}
    />
  )

  const handleIndexChange = (index: number): void => {
    setNavigationState((prevState) => ({ ...prevState, index }))
  }

  return (
    <View style={styles.safeAreaView}>
      <StatusBar backgroundColor="#ffffff" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Header />

        <TabView
          navigationState={navigationState}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={handleIndexChange}
        />

        <View style={styles.footer}>
          <TouchableNativeFeedback>
            <View style={styles.sectionWrapper}>
              <Text style={styles.sectionFooterTitle}>More</Text>
              <IconButton iconName="arrow-right" btnContainerStyle={styles.btnContainerStyle} />
            </View>
          </TouchableNativeFeedback>
          <FlatList
            data={SAMPLE_SLIDEER_DATA}
            contentContainerStyle={{ paddingVertical: PADDING }}
            renderItem={renderItem2}
            keyExtractor={(_item, index: number) => `item-${index}`}
            showsHorizontalScrollIndicator={false}
            snapToOffsets={snapToOffsets2}
            horizontal
            decelerationRate="fast"
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  tabIndicatorStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },

  tabBarStyle: {
    backgroundColor: 'transparent',
  },

  tabbarIndicatorContainerStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },

  tabBarLabelStyle: {
    color: 'gray',
    textTransform: 'capitalize',
    fontWeight: '700',
    fontSize: 18,
  },

  tabStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },

  container: {
    flex: 1,
  },

  footer: {
    marginTop: 15,
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

  btnContainerStyle: {
    backgroundColor: '#fff',
  },
})
