import {
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
} from 'react-native';
import { Link } from 'expo-router';
import Swiper from 'react-native-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

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
}) => {
  return (
    <View style={{ alignItems: 'center' }}>
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

        
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: boxWidth,
            height: boxHeight,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            zIndex: 1,
          }}
        >
          
        </View>
      </View>
    </View>
  );
};

const IndexScreen = () => {
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
        style={{
          width: boxWidth,
          height: 200,
        }}
        resizeMode="contain"
      />

      
      <View style={{ height: boxHeight + 25 }}>
        {features.length > 0 && (
          <Swiper
            loop={false}
            showsButtons={false}
            paginationStyle={{ bottom: -20 }}
            renderPagination={(index, total) => {
              const colors = ['#266FEF', '#266FEF', '#266FEF'];
              return (
                <View className="flex-row justify-center mt-1">
                  {Array.from({ length: total }).map((_, i) => {
                    const isActive = i === index;
                    return (
                      <View
                        key={i}
                        style={{
                          width: isActive ? 24 : 8,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: colors[i],
                          marginHorizontal: 4,
                          opacity: isActive ? 1 : 0.5,
                        }}
                      />
                    );
                  })}
                </View>
              );
            }}
          >
            {features.map((feature, idx) => (
              <FeatureBox
                key={`feature-${idx}`}
                svg={feature.svg}
                icon={feature.icon}
              />
            ))}
          </Swiper>
        )}
      </View>

      
      <View className="items-center px-8 w-full mt-2">
        <Text className="text-center text-base font-poppinsRegulary text-gray-950 mb-2">
          Add and verify the driver’s mobile number to activate full app features. Use the button below to complete setup.
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
