import LottieView from 'lottie-react-native';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { OnboardingData } from '../../data/data';
type RenderItemProps = {
    index: number;
    x: SharedValue<number>;
    item: OnboardingData;
}

const RenderItem = ({ index, x, item }: RenderItemProps) => {

    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
    
    // Responsive sizing based on screen dimensions
    const circleSize = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.8;
    const lottieSize = Math.min(SCREEN_WIDTH * 0.7, SCREEN_HEIGHT * 0.4);
    const circleRadius = circleSize / 2;
    
    // Responsive spacing
    const responsiveMarginBottom = SCREEN_HEIGHT * 0.15;
    const responsiveLottieMarginTop = SCREEN_HEIGHT * 0.12;
    const responsiveLottieMarginBottom = -SCREEN_HEIGHT * 0.1;

    const animationRange = [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH
    ]

    const lottieAnimation = useAnimatedStyle(() => ({
      transform: [
        {
          translateY: interpolate(
            x.value,
            animationRange,
            [200, 0, -200],
            Extrapolation.CLAMP
          ),
        },
      ],
    }));

    const circleAnimation = useAnimatedStyle(() => ({
      transform: [
        {
          scale: interpolate(
            x.value,
            animationRange,
            [1, 4, 4],
            Extrapolation.CLAMP
          ),
        },
      ],
    }));

    const titleAnimation = useAnimatedStyle(() => ({
      transform: [
        {
          translateX: interpolate(
            x.value,
            animationRange,
            [100, 0, -100],
            Extrapolation.CLAMP
          ),
        },
      ],
      opacity: interpolate(
        x.value,
        animationRange,
        [0, 1, 0],
        Extrapolation.CLAMP
      ),
    }));

    const subtitleAnimation = useAnimatedStyle(() => ({
      transform: [
        {
          translateX: interpolate(
            x.value,
            animationRange,
            [100, 0, -100],
            Extrapolation.CLAMP
          ),
        },
      ],
      opacity: interpolate(
        x.value,
        animationRange,
        [0, 1, 0],
        Extrapolation.CLAMP
      ),
    }));

  return (
    <View style={[styles.itemContainer, { 
      width: SCREEN_WIDTH,
      marginBottom: responsiveMarginBottom,
    }]}>
      <View style={[styles.circleContainer]}>
        <Animated.View style={[
          styles.circle,
          circleAnimation,
          { 
            backgroundColor: item.backgroundColor,
            width: circleSize,
            height: circleSize,
            borderRadius: circleRadius, 
            }]}>

        </Animated.View>
      </View>

      <Animated.View style={[lottieAnimation]}>
            <LottieView 
              source={item.animation as any}
              autoPlay
              loop
              resizeMode='contain'
              style={[
                styles.lottie,
                { 
                  width: lottieSize, 
                  height: lottieSize,
                  marginTop: responsiveLottieMarginTop,
                  marginBottom: responsiveLottieMarginBottom,
                },
              ]}
            />
      </Animated.View>

      <View style={[styles.textContainer, { paddingHorizontal: SCREEN_WIDTH * 0.05 }]}>
        <Animated.Text style={[styles.title, titleAnimation, { 
          color: item.titleColor,
          fontSize: Math.min(SCREEN_WIDTH * 0.08, 36),
          lineHeight: Math.min(SCREEN_WIDTH * 0.1, 44),
        }]}> 
          {item.title}
        </Animated.Text>
        {item.subtitle && (
          <Animated.Text style={[styles.subtitle, subtitleAnimation, { 
            color: item.subtitleColor,
            fontSize: Math.min(SCREEN_WIDTH * 0.04, 18),
            lineHeight: Math.min(SCREEN_WIDTH * 0.055, 24),
          }]}>
            {item.subtitle}
          </Animated.Text>
        )}
      </View>
    </View>
  )
}

export default RenderItem

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    circleContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    circle: {
        position: 'absolute',
    },
    lottie: {
        alignSelf: 'center',
    },
    textContainer: {
      alignItems: 'center',
    },
    title: {
      textAlign: 'center',
      fontFamily: 'PoppinsBold',
      marginBottom: 10,
    },
    subtitle: {
      textAlign: 'center',
      fontFamily: 'PoppinsLight',
      marginTop: 15,
    }
})