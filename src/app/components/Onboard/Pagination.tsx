import { View, StyleSheet, useWindowDimensions } from 'react-native';
import React, { FC } from 'react';
import { OnboardingData } from '../../data/data';
import { SharedValue } from 'react-native-reanimated';
import Dot from './Dot';

type PaginationProps = {
  data: OnboardingData[];
  x: SharedValue<number>;
  dotColor: string;
  activeDotColor: string;
  dotSize?: number;
  activeDotSize?: number;
  containerStyle?: object;
};

const Pagination: FC<PaginationProps> = ({
  data,
  x,
  dotColor = '#D9D9D9',
  activeDotColor = '#266FEF',
  dotSize = 10,
  activeDotSize = 20,
  containerStyle,
}) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  
  // Responsive dot sizing
  const responsiveDotSize = Math.max(SCREEN_WIDTH * 0.025, 8);
  const responsiveActiveDotSize = Math.max(SCREEN_WIDTH * 0.05, 16);

  return (
    <View style={[styles.paginationContainer, containerStyle, {
      height: responsiveActiveDotSize + 20,
    }]}>
      {data.map((_, index) => {
        return (
          <Dot
            index={index}
            x={x}
            key={index}
            activeColor={activeDotColor}
            inactiveColor={dotColor}
            activeSize={responsiveActiveDotSize}
            inactiveSize={responsiveDotSize}
          />
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
