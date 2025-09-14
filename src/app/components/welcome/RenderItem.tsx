import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { OnboardingData } from '~/data/data'
import LottieView from 'lottie-react-native';
import { useFonts } from 'expo-font';
import Animated, { Extrapolate, Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';


type Props = {
    item: OnboardingData;
    index: number;
    x: SharedValue<number>;
};

const RenderItem = ({item, index, x}: Props) => {
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = useWindowDimensions();

  const lottieAnimationStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
        x.value,
        [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
        ],
        [200,0,-200],
        Extrapolate.CLAMP, 
    )
    return {
        transform: [{translateY: translateYAnimation}]
    }
  })

  const circleAnimation = useAnimatedStyle(() => {
    const scale = interpolate(
        x.value,
        [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
        ],
        [1,4,4],
        Extrapolate.CLAMP, 
    );
    return {
        transform: [{scale: scale}]
    }
  })

  const [fontsLoaded] = useFonts({
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    PoppinsLight: require('../../assets/fonts/Poppins-Light.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or a SplashScreen
  }

  return (
    <View style={[styles.itemContainer, {width: SCREEN_WIDTH}]}>
        <View style={styles.circleContainer}>
            <Animated.View style={[{
                width: SCREEN_WIDTH,
                height: SCREEN_WIDTH,
                backgroundColor: item.backgroundColor,
                borderRadius: SCREEN_WIDTH / 2,
            }, circleAnimation]} />
        </View>
        <Animated.View style={lottieAnimationStyle}>
            <LottieView 
                source={item.animation}
                style={{width: SCREEN_WIDTH * 0.9, height: SCREEN_WIDTH * 0.9}}
                autoPlay
                loop={index !== 2}
            />
        </Animated.View>
      <Text style={[styles.title, {fontFamily: 'PoppinsBold', fontSize: SCREEN_WIDTH * 0.07}, {color: item.titleColor}]}>{item.title}</Text>
      <Text style={[styles.subtitle, {fontFamily: 'PoppinsLight', fontSize: SCREEN_WIDTH * 0.037}, {color: item.subtitleColor}]}>{item.subtitle}</Text>
    </View>
  )
}

export default RenderItem

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 270,
        marginTop: 80 
    },
    title: {
        textAlign: 'center',
        marginHorizontal: 20,
    },
    subtitle: {
        textAlign: 'center',
        marginHorizontal: 20,
        marginTop: -50,
    },
    circleContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
})