import { Pressable, StyleSheet, View, useWindowDimensions, FlatList } from 'react-native';
import React, { FC } from 'react';
import Animated, {
  AnimatedRef,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { OnboardingData } from '../../data/data';

type ButtonProps = {
  dataLength: number;
  scrollIndex: SharedValue<number>;
  scrollRef: AnimatedRef<FlatList<OnboardingData>>;
  x: SharedValue<number>;
  onFinish?: () => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button: FC<ButtonProps> = ({ dataLength, scrollIndex, scrollRef, x, onFinish }) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const buttonScale = useSharedValue(1);
  
  // Responsive button sizing
  const responsiveButtonHeight = Math.max(SCREEN_WIDTH * 0.15, 50);
  const responsiveExpandedWidth = Math.max(SCREEN_WIDTH * 0.35, 120);
  const responsiveCollapsedWidth = responsiveButtonHeight;
  const responsiveIconSize = Math.max(SCREEN_WIDTH * 0.07, 24);
  const responsiveFontSize = Math.max(SCREEN_WIDTH * 0.04, 14);

  const animatedStyle = useAnimatedStyle(() => {
    const isLastIndex = scrollIndex.value === dataLength - 1;
    return {
      width: isLastIndex ? withSpring(responsiveExpandedWidth) : withSpring(responsiveCollapsedWidth),
      height: responsiveButtonHeight,
      transform: [{ scale: buttonScale.value }],
      backgroundColor: interpolateColor(
        x.value,
        [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
        ['#266FEF', '#000F29', '#266FEF']
      ),
    };
  });

  const textStyle = useAnimatedStyle(() => {
    const isLastIndex = scrollIndex.value === dataLength - 1;
    return {
      opacity: isLastIndex ? withSpring(1) : withSpring(0),
      transform: [{ translateX: isLastIndex ? withTiming(0) : withTiming(-100) }],
      fontSize: responsiveFontSize,
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    const isLastIndex = scrollIndex.value === dataLength - 1;
    return {
      width: responsiveIconSize,
      height: responsiveIconSize,
      transform: [{ translateX: isLastIndex ? withTiming(100) : withTiming(0) }],
    };
  });

  const handlePress = () => {
    const isLastIndex = scrollIndex.value === dataLength - 1;

    if (!isLastIndex) {
      scrollRef.current?.scrollToIndex({ index: scrollIndex.value + 1, animated: true });
    } else {
      console.log("Onboarding finished");
      if (onFinish) {
        onFinish();
      }
    }
  };

  const onPress = () => {
    // Immediate feedback with scale animation
    buttonScale.value = withSpring(0.9, { duration: 100 });
    
    // Reset scale quickly and execute action immediately
    setTimeout(() => {
      buttonScale.value = withSpring(1, { duration: 150 });
      handlePress();
    }, 100);
  };

  return (
    <View style={[styles.container]}>
      <AnimatedPressable onPress={onPress}>
        <Animated.View style={[styles.button, animatedStyle]}>
          <Animated.Image
            source={require('../../assets/rightArrow.png')}
            style={[styles.icon, iconStyle]}
          />
          <Animated.Text style={[styles.text, textStyle]}>Get Started</Animated.Text>
        </Animated.View>
      </AnimatedPressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    color: '#fff',
    position: 'absolute',
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    tintColor: '#fff',
  },
});
