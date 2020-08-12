import React, { ReactElement, useMemo, useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Animated,
  Dimensions,
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native'
import {
  SceneMap,
  SceneRendererProps,
  TabBar,
  TabView,
  NavigationState,
} from 'react-native-tab-view'
import { Header } from './common/Header'
import { Card, CARD_WIDTH, CARD_MARGIN, PADDING } from './common/Card'
import { IconButton } from './common/IconButton'
import { Card2, CARD2_WIDTH } from './common/Card2'
import { SAMPLE_SLIDEER_DATA } from './API'
import { TabItem } from './common/TabItem'

type HomeScreenProps = {}

export type ISlider = {
  id: number
  brandName: string
  productName: string
  price: string
  productURL: any
  backgroundColor: string
}

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window')
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
  const snapToOffsets2 = useMemo(() => [...Array(5).keys()].map((_, i) => i * fullCardWidth2), [])

  const renderItem2 = ({ item, index }: { item: ISlider; index: number }): ReactElement => {
    return <Card2 key={`card-${index}`} item={item} />
  }

  const renderScene = (): ReactElement => {
    return <TabItem />
  }

  const renderTabBar = (props: SceneRendererProps & { navigationState: State }): ReactElement => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
      style={{ backgroundColor: 'transparent' }}
      indicatorContainerStyle={{
        backgroundColor: 'rgba(255, 255, 255, 0)',
      }}
      labelStyle={{ color: 'gray', textTransform: 'capitalize', fontWeight: '700', fontSize: 18 }}
      tabStyle={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
    />
  )

  const handleIndexChange = (index: number): void => {
    setNavigationState((prevState) => ({ ...prevState, index }))
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
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
              <IconButton iconName="arrow-right" btnContainerStyle={{ backgroundColor: '#fff' }} />
            </View>
          </TouchableNativeFeedback>
          <FlatList
            data={SAMPLE_SLIDEER_DATA}
            contentContainerStyle={{ paddingVertical: PADDING }}
            renderItem={renderItem2}
            keyExtractor={(_, index: number) => `item-${index}`}
            showsHorizontalScrollIndicator={false}
            snapToOffsets={snapToOffsets2}
            horizontal
            decelerationRate="fast"
          />
          <View
            style={{
              width: WINDOW_WIDTH,
              height: 100,
              backgroundColor: '#',
              position: 'absolute',
              zIndex: -1,
              bottom: 0,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  container: {
    flex: 1,
  },

  footer: {
    marginTop: 15,
    // flex: 1,
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
})
