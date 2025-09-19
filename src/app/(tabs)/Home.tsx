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
import { useRef } from 'react';

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

  return (
    <SafeAreaView className="flex-1 bg-white justify-between items-center py-4">
      
      <Image
        source={require('../../../src/app/assets/icon.png')}
        style={{ width: boxWidth, height: 200 }}
        resizeMode="contain"
      />

      
      <View style={{ height: boxHeight + 3 }}>
        <Animated.FlatList
          data={features}
          horizontal
          pagingEnabled
          snapToInterval={screenWidth}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, idx) => `feature-${idx}`}
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

      
      <View className="flex-row justify-center items-center mt-3 mb-4">
        {features.map((_, i) => {
          const inputRange = [
            (i - 1) * screenWidth,
            i * screenWidth,
            (i + 1) * screenWidth,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 25, 8],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={`dot-${i}`}
              style={{
                width: dotWidth,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#266FEF',
                marginHorizontal: 2,
                opacity,
              }}
            />
          );
        })}
      </View>

      
      <View className="items-center px-8 w-full">
        <Text className="text-center text-base font-poppinsRegulary text-gray-950 mb-0 leading-relaxed">
          Add and verify the driver’s mobile number to{'\n'}
          activate full app features.{'\n'}
          Use the button below to complete setup.
        </Text>

        <View className="mb-0">
          <LottieView
            source={DownAnimation}
            autoPlay
            loop
            style={{ width: 60, height: 60, marginBottom: 0 }}
          />
        </View>

        <Link href="screens/setup" asChild>
          <Pressable className="bg-blue-500 p-4 rounded-xl w-full max-w-[307px]">
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
