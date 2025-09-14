import { StyleSheet, Text, TouchableWithoutFeedback, View, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import Animated, { AnimatedRef, interpolateColor, SharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { FlatList } from 'react-native-reanimated/lib/typescript/Animated';
import { OnboardingData } from '~/data/data';

type Props = {
    dataLength: number;
    flatlistIndex: SharedValue<number>;
    flatlistRef: AnimatedRef<FlatList<OnboardingData>>;
    x: SharedValue<number>;
}

const CustomButton = ({dataLength, flatlistIndex, flatlistRef, x}: Props) => {

  const {width: SCREEN_WIDTH} = useWindowDimensions();

  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
        width: flatlistIndex.value === dataLength - 1
            ? withSpring(140)
            : withSpring(60),
        height: 60, 
    }
  })

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
        x.value,
        [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
        ['#266FEF', '#000', '#D4E2FB'],
    )
    return {
        backgroundColor: backgroundColor
    }
  })
    
  return (
    <TouchableWithoutFeedback
    onPress={() => {
        if(flatlistIndex.value < dataLength - 1){
            flatlistRef.current?.scrollToIndex({index: flatlistIndex.value + 1})
        } else {
            console.log("NAVIGATE TO NEXT SCREEN")
        }
    }}
    >
    <Animated.View style={[styles.container, animatedColor, buttonAnimationStyle]}>
      <Image 
        source={require('../../assets/icons/normal/Arrow - Right.png')}
        style={[styles.arrow]}
      />
    </Animated.View>
    </TouchableWithoutFeedback>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#266FEF',
        padding: 10,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        width: 60,
        height: 60
    },
    arrow: {
        position: 'absolute',
        width: 30,
        height: 30,
        tintColor: 'white'
    }
})