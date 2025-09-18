import { View, Text, Pressable, Image, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import Swiper from 'react-native-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';

import Bluebox from '../../../src/app/assets/bluePlaceholder.svg';
import Redbox from '../../../src/app/assets/orangePlaceholder.svg';
import Orangebox from '../../../src/app/assets/redPlaceholder.svg';
import DownAnimation from '../../../src/app/assets/lotties/Arrows.json';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');
const boxWidth = Math.min(width * 0.85, 307);
const boxHeight = boxWidth * (225 / 307);

const FeatureBox = ({
  svg: SvgComponent,
  icon,
  title,
  description,
}: {
  svg: any;
  icon: any;
  title: string;
  description: string[];
}) => {
  return (
    <View className="items-center">
      <View
        style={{
          width: boxWidth,
          height: boxHeight,
        }}
        className="relative rounded-3xl overflow-hidden"
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
          <View className="w-14 h-14 rounded-full bg-white justify-center items-center mb-3">
            <Image
              source={icon}
              style={{ width: 32, height: 32, resizeMode: 'contain' }}
            />
          </View>
          <Text className="text-white text-2xl font-poppinsMedium text-center mb-3">
            {title}
          </Text>
          <View className="w-full px-3">
            {description.map((desc, idx) => (
              <Text
                key={idx}
                className="text-white text-xs font-poppinsLight mb-2"
              >
                {desc}
              </Text>
            ))}
          </View>
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
      title: 'Real-time Bus Tracking',
      description: [
        '• Live GPS map showing bus location and route.',
        '• Estimated time of arrival at pickup, drop points.',
        '• Speed alerts and route deviations.',
      ],
    },
    {
      svg: Orangebox,
      icon: require('../../../src/app/assets/massage.png'),
      title: 'Communication Hub',
      description: [
        '• In-app voice call between parent and driver.',
        '• Group chat for parents of the same bus.',
        '• Direct messaging for individual parent-driver or parent-parent communication.',
      ],
    },
    {
      svg: Redbox,
      icon: require('../../../src/app/assets/bell.png'),
      title: 'Alerts & Notifications',
      description: [
        '• Emergency alerts and urgent messages.',
        '• Route change and bus delay warnings.',
        '• All chat message notifications from drivers and parents.',
      ],
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white justify-between py-4">
      <View className="items-center px-4">
        <Image
          source={require('../../../src/app/assets/icon.png')}
          style={{
            width: Math.min(width * 0.8, 320),
            height: Math.min(width * 0.48, 180),
          }}
          resizeMode="contain"
        />
      </View>

      <View style={{ height: boxHeight + 20 }}>
        <Swiper
          loop={false}
          showsButtons={false}
          paginationStyle={{ bottom: -25 }}
          renderPagination={(index, total) => {
            const colors = ['#266FEF', '#266FEF', '#266FEF'];
            return (
              <View className="flex-row justify-center mt-2">
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
              key={idx}
              svg={feature.svg}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </Swiper>
      </View>

      <View className="items-center px-6">
        <Text className="text-center text-base font-poppinsRegulary text-gray-950 mb-1">
          Add and verify the driver’s mobile number to activate full app
          features. Use the button below to complete setup.
        </Text>

        <LottieView
          source={DownAnimation}
          autoPlay
          loop
          style={{ width: 100, height: 100 }}
        />

        <Link href="screens/setup" asChild>
          <Pressable className="bg-blue-500 p-4 rounded-xl mt-5 w-full max-w-[320px]">
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