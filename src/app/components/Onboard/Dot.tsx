import { StyleSheet, useWindowDimensions } from 'react-native';
import React, { FC } from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

type DotProps = {
  index: number;
  x: SharedValue<number>;
  activeColor: string;
  inactiveColor: string;
  activeSize: number;
  inactiveSize: number;
  dotStyle?: object;
  activeDotStyle?: object;
};

const Dot: FC<DotProps> = ({
  index,
  x,
  activeColor = '#266FEF',
  inactiveColor = '#D9D9D9',
  activeSize = 20,
  inactiveSize = 10,
  dotStyle = {},
  activeDotStyle = {},
}) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  // Responsive spacing
  const responsiveSpacing = Math.max(SCREEN_WIDTH * 0.015, 6);

  const animationRange = [
    (index - 1) * SCREEN_WIDTH,
    index * SCREEN_WIDTH,
    (index + 1) * SCREEN_WIDTH,
  ];

  const animatedStyle = useAnimatedStyle(() => {
    const size = interpolate(
      x.value,
      animationRange,
      [inactiveSize, activeSize, inactiveSize],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      x.value,
      animationRange,
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      x.value,
      animationRange,
      [0.8, 1.2, 0.8],
      Extrapolation.CLAMP
    );

    return {
      width: size,
      height: size,
      opacity: opacity,
      marginHorizontal: responsiveSpacing,
      transform: [{ scale: withSpring(scale, {damping: 15})}]
    };
  });

  const animatedColor = useAnimatedStyle(() => {
    // Global color interpolation - all dots change color based on current page
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ['#266FEF', '#000F29', '#266FEF'] // Page 1: Blue, Page 2: Dark, Page 3: Blue
    );
    
    // For the active dot, use the page-based color
    // For inactive dots, use a dimmed version of the page color
    const isActive = interpolate(
      x.value,
      animationRange,
      [0, 1, 0],
      Extrapolation.CLAMP
    );
    
    const finalColor = interpolateColor(
      isActive,
      [0, 1],
      [backgroundColor + '80', backgroundColor] // 80 = 50% opacity for inactive
    );
    
    return {
      backgroundColor: finalColor,
    };
  });

  return (
    <Animated.View style={[styles.dot, animatedColor, animatedStyle, dotStyle, activeDotStyle]} />
  );
};

export default Dot;

const styles = StyleSheet.create({
  dot: {
    borderRadius: 50,
  },
});
