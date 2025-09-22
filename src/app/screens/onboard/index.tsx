import { StyleSheet, View, FlatList, ViewToken, useWindowDimensions } from 'react-native';
import data, { OnboardingData } from '../../data/data';

import { useCallback, useRef } from 'react';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import RenderItem from '../../components/Onboard/RenderItem';
import Pagination from '../../components/Onboard/Pagination';
import Button from '~/app/components/Onboard/Button';

const Onboard = () => {
  const scrollRef = useAnimatedRef<FlatList<OnboardingData>>();
  const x = useSharedValue(0);
  const scrollIndex = useSharedValue(0);
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  // Consistent spacing from all screen edges
  const responsiveSpacing = Math.max(SCREEN_WIDTH * 0.06, 24); // Same spacing for all edges
  const responsiveBottomSpacing = Math.max(SCREEN_HEIGHT * 0.03, 16);

  const keyExtractor = useCallback((item: any, index: number) => index.toString(), []);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const onViewableItemsChanges = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const firstVisibleItem = viewableItems[0];
      if (firstVisibleItem?.index !== null && firstVisibleItem?.index !== undefined) {
        scrollIndex.value = firstVisibleItem.index;
      }
    },
    [scrollIndex]
  );

  const viewabilityConfig = useRef({
    minimumViewTime: 300,
    viewAreaCoveragePercentThreshold: 10,
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        ref={scrollRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}
        keyExtractor={keyExtractor}
        renderItem={({ index, item }) => <RenderItem index={index} item={item} x={x} key={index} />}
        onScroll={onScroll}
        onViewableItemsChanged={onViewableItemsChanges}
        viewabilityConfig={viewabilityConfig.current}
      />
      <View style={[styles.bottomView, {
        bottom: responsiveBottomSpacing,
        left: responsiveSpacing,
        right: responsiveSpacing,
        paddingVertical: responsiveSpacing * 0.5,
      }]}>
        <Pagination
          data={data}
          x={x}
          dotColor="#266FEF"
          activeDotColor="#000F29"
        />
        <Button scrollRef={scrollRef} scrollIndex={scrollIndex} dataLength={data.length} x={x} />
      </View>
    </View>
  );
};

export default Onboard;

const styles = StyleSheet.create({
  bottomView: {
    position: 'absolute',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
