import React, {
  useRef,
  createRef,
  MutableRefObject,
  ReactElement,
  useEffect,
  useState,
} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
} from 'react-native'
const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window')
const BOX_WIDTH = 100
const BOX_HEIGHT = 100
const MIDDLE_POS = (WINDOW_HEIGHT - BOX_WIDTH) / 2

const DATA = [...Array(5).keys()]

export const HomeScreen = (): ReactElement => {
  const [boxPosition, setBoxPosition] = useState<{ [key: number]: string }>({
    1: 'relative',
    2: 'relative',
    3: 'relative',
    4: 'relative',
    5: 'relative',
  })
  const boxes: {
    [key: number]: { width: Animated.Value; translateY: Animated.Value; height: Animated.Value }
  } = {}

  const onOpenBox = (index: number): void => {
    const currentBox = boxes[index]

    Animated.parallel([
      Animated.timing(currentBox.width, {
        toValue: WINDOW_WIDTH,
        duration: 200,
        easing: Easing.quad,
        useNativeDriver: false,
      }),

      Animated.timing(currentBox.height, {
        toValue: WINDOW_HEIGHT,
        duration: 200,
        easing: Easing.quad,
        useNativeDriver: false,
      }),

      Animated.timing(currentBox.translateY, {
        toValue: 0,
        duration: 200,
        easing: Easing.quad,
        useNativeDriver: false,
      }),
    ]).start(() => setBoxPosition((prev) => ({ ...prev, [index]: 'absolute' })))
  }

  const onCloseBox = (index: number): void => {
    const currentBox = boxes[index]
    // setBoxPosition((prev) => ({ ...prev, [index]: 'relative' }))
    Animated.parallel([
      Animated.timing(currentBox.width, {
        toValue: BOX_WIDTH,
        duration: 200,
        easing: Easing.quad,
        useNativeDriver: false,
      }),

      Animated.timing(currentBox.height, {
        toValue: BOX_HEIGHT,
        duration: 200,
        easing: Easing.quad,
        useNativeDriver: false,
      }),

      Animated.timing(currentBox.translateY, {
        toValue: 0,
        duration: 200,
        easing: Easing.quad,
        useNativeDriver: false,
      }),
    ]).start(() => setBoxPosition((prev) => ({ ...prev, [index]: 'relative' })))
  }

  return (
    <View style={styles.container}>
      {[...Array(5).keys()].map((v, i) => {
        boxes[i + 1] = {
          width: new Animated.Value(BOX_WIDTH),
          height: new Animated.Value(BOX_HEIGHT),
          translateY: new Animated.Value(0),
        }
        return (
          <TouchableOpacity key={`box-${i}`} onPress={() => onOpenBox(i + 1)}>
            <Animated.View
              style={[
                styles.boxContainer,
                {
                  width: boxes[i + 1].width,
                  height: boxes[i + 1].height,
                  transform: [{ translateY: boxes[i + 1].translateY }],
                  position: boxPosition[i + 1],
                },
              ]}
            >
              <Text>{i + 1}</Text>
              <TouchableOpacity onPress={() => onCloseBox(i + 1)}>
                <Text>Close</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  boxContainer: {
    justifyContent: 'center',
    backgroundColor: 'red',
    width: BOX_WIDTH,
    height: BOX_HEIGHT,
    marginBottom: 10,
  },
})
