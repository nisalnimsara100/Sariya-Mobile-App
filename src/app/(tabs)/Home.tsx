import React, { useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  Animated,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

import Bluebox from 'src/app/assets/bluePlaceholder.svg';
import Redbox from 'src/app/assets/Communication Hub.svg';
import Orangebox from 'src/app/assets/Alerts & Notifications.svg';
import DownAnimation from '../../../src/app/assets/lotties/Arrows.json';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const scale = (size: number): number => (screenWidth / 375) * size;
const verticalScale = (size: number): number => (screenHeight / 812) * size;
const moderateScale = (size: number, factor: number = 0.5): number =>
  size + (scale(size) - size) * factor;

const responsiveFontSize = (size: number): number => {
  const newSize = size * (screenWidth / 375);
  return Math.max(newSize, size * 0.85);
};

const boxWidth = Math.min(screenWidth * 0.9, moderateScale(400));
const boxHeight = verticalScale(245);
const horizontalPadding = scale(0);

const FeatureBox = ({ svg: SvgComponent, icon }: { svg: any; icon: any }) => (
  <View style={{ width: screenWidth, alignItems: 'center', paddingHorizontal: horizontalPadding }}>
    <View style={{ width: boxWidth, height: boxHeight, borderRadius: moderateScale(40), overflow: 'hidden' }}>
      <SvgComponent
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        style={StyleSheet.absoluteFillObject}
      />
      <View
        style={{
          position: 'absolute',
          top: verticalScale(30),
          left: boxWidth / 2 - moderateScale(30),
          width: moderateScale(55),
          height: moderateScale(55),
          borderRadius: moderateScale(30),
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 4,
        }}
      >
        <Image
          source={icon}
          style={{
            width: moderateScale(35),
            height: moderateScale(35),
            resizeMode: 'contain',
          }}
        />
      </View>
    </View>
  </View>
);

const IndexScreen = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const features = [
    { svg: Bluebox, icon: require('../../../src/app/assets/drop.png') },
    { svg: Redbox, icon: require('../../../src/app/assets/massage.png') },
    { svg: Orangebox, icon: require('../../../src/app/assets/bell.png') },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: verticalScale(20) }}>
          <Image
            source={require('../../../src/app/assets/icon.png')}
            style={{ width: boxWidth, height: verticalScale(240) }}
            resizeMode="contain"
          />
        </View>

        <View style={{ height: boxHeight + verticalScale(30) }}>
          <Animated.FlatList
            data={features}
            horizontal
            pagingEnabled
            snapToInterval={screenWidth - horizontalPadding * 2}
            snapToAlignment="center"
            decelerationRate="normal" // slowed down scroll speed
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, idx) => `feature-${idx}`}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
            renderItem={({ item }) => <FeatureBox svg={item.svg} icon={item.icon} />}
          />
        </View>

        <View style={styles.dotsContainer}>
          {features.map((_, i) => {
            const inputRange = [
              (i - 1.5) * screenWidth,
              i * screenWidth,
              (i + 1.5) * screenWidth,
            ];

           const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [moderateScale(8), moderateScale(25), moderateScale(8)],
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
                  height: verticalScale(8),
                  borderRadius: moderateScale(4),
                  backgroundColor: '#266FEF',
                  marginHorizontal: scale(2),
                  opacity,
                }}
              />
            );
          })}
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.infoText}>
            Add and verify the driver’s mobile number to{'\n'}
            activate full app features.{'\n'}
            Use the button below to complete setup.
          </Text>

          <LottieView
            source={DownAnimation}
            autoPlay
            loop
            style={{
              width: moderateScale(70),
              height: moderateScale(70),
              marginBottom: verticalScale(0),
            }}
          />

          <Link href="screens/setup" asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Complete The Setup</Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    minHeight: screenHeight,
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(-70),
    marginBottom: verticalScale(18),
  },
  bottomContainer: {
    alignItems: 'center',
    paddingHorizontal: scale(20),
    width: '100%',
    marginBottom: verticalScale(20),
  },
  infoText: {
    textAlign: 'center',
    fontSize: responsiveFontSize(17),
    lineHeight: responsiveFontSize(20),
    fontFamily: 'Poppins-Regular',
    color: '#000000',
    marginBottom: verticalScale(10),
    fontWeight: '400',
    marginTop: verticalScale(-50),
  },
  button: {
    backgroundColor: '#266FEF',
    paddingVertical: verticalScale(15),
    borderRadius: moderateScale(12),
    width: '100%',
    maxWidth: moderateScale(380),
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: responsiveFontSize(18),
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
});

export default IndexScreen;
