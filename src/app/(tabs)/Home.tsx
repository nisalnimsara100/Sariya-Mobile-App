import {
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  Animated,
  FlatList,
} from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { useRef, useState } from 'react';

import Bluebox from 'src/app/assets/bluePlaceholder.svg';
import Redbox from 'src/app/assets/Communication Hub.svg';
import Orangebox from 'src/app/assets/Alerts & Notifications.svg';

import DownAnimation from '../../../src/app/assets/lotties/Arrows.json';

const screenWidth = Dimensions.get('window').width;
const boxWidth = Math.min(screenWidth * 0.9, 307);
const boxHeight = 225;

const FeatureBox = ({
  svg: SvgComponent,
  icon,
}: {
  svg: any;
  icon: any;
}) => (
  <View style={{ width: screenWidth, alignItems: 'center' }}>
    <View
      style={{
        width: boxWidth,
        height: boxHeight,
        borderRadius: 24,
        overflow: 'hidden',
      }}
    >
      <SvgComponent
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: boxWidth,
          height: boxHeight,
          zIndex: 0,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 25,
          left: boxWidth / 2 - 28,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 4,
        }}
      >
        <Image
          source={icon}
          style={{ width: 32, height: 32, resizeMode: 'contain' }}
        />
      </View>
    </View>
  </View>
);

const IndexScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const features = [
    {
      svg: Bluebox,
      icon: require('../../../src/app/assets/drop.png'),
    },
    {
      svg: Redbox,
      icon: require('../../../src/app/assets/massage.png'),
    },
    {
      svg: Orangebox,
      icon: require('../../../src/app/assets/bell.png'),
    },
  ];

  const handleScrollEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / screenWidth);
    setActiveIndex(index);
  };

  return (
    <SafeAreaView className="flex-1 bg-white justify-between items-center py-4">
      {/* Logo */}
      <Image
        source={require('../../../src/app/assets/icon.png')}
        style={{ width: boxWidth, height: 200 }}
        resizeMode="contain"
      />

      {/* Feature Scroll */}
      <View style={{ height: boxHeight + 20 }}>
        <Animated.FlatList
          data={features}
          horizontal
          pagingEnabled
          snapToInterval={screenWidth}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, idx) => `feature-${idx}`}
          onMomentumScrollEnd={handleScrollEnd}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <FeatureBox svg={item.svg} icon={item.icon} />
          )}
        />
      </View>

      {/* Connected Stretching Dots */}
      <View className="flex-row justify-center items-center mt-0">
        {features.map((_, i) => {
          const isActive = i === activeIndex;
          return (
            <Animated.View
              key={`dot-${i}`}
              style={{
                width: isActive ? 32 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#266FEF',
                marginHorizontal: 4,
                opacity: isActive ? 1 : 0.4,
              }}
            />
          );
        })}
      </View>

      {/* Setup Section */}
      <View className="items-center px-8 w-full mt-2">
        <Text className="text-center text-base font-poppinsRegulary text-gray-950 mb-2">
          Add and verify the driver’s mobile number to activate full app
          features. Use the button below to complete setup.
        </Text>

        <LottieView
          source={DownAnimation}
          autoPlay
          loop
          style={{ width: 50, height: 50, marginBottom: -15 }}
        />

        <Link href="screens/setup" asChild>
          <Pressable className="bg-blue-500 p-4 rounded-xl w-full max-w-[307px] mt-3">
            <Text className="text-white text-center text-lg font-poppinsMedium">
              Complete The Setup
            </Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default IndexScreen;
