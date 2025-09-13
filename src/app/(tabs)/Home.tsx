import { View, Text, Pressable, Image, ScrollView, Dimensions } from 'react-native'
import '../../../global.css'
import { Link } from 'expo-router'

const { width } = Dimensions.get("window");

const index = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      
      <Image
        source={require('~/app/assets/icon.png')}
        className="w-40 h-40 mx-auto mt-16"
        resizeMode="contain"
      />

      
      <View className="mt-6">
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center" }}
        >
          
          <View className="w-screen items-center">
            <View className="bg-blue-500 rounded-2xl p-5 w-[307px] h-[225px] items-center">
              <View className="bg-white w-12 h-12 rounded-full items-center justify-center mb-4">
                <Image
                  source={require('src/app/assets/drop.png')}
                  className="w-10 h-10"
                  resizeMode="contain"
                />
              </View>
              <Text className="text-white text-xl font-poppinsMedium text-center mb-3">
                Real-time Bus Tracking
              </Text>
              <Text className="text-white text-sm font-poppinsLight text-center mb-1">
                • Live GPS map showing bus location and route
              </Text>
              <Text className="text-white text-sm font-poppinsLight text-center mb-1">
                • Estimated time of arrival at pickup, drop points
              </Text>
              <Text className="text-white text-sm font-poppinsLight text-center">
                • Speed alerts and route deviations
              </Text>
            </View>
          </View>

          
          <View className="w-screen items-center">
            <View className="bg-red-400 rounded-2xl p-5 w-[307px] h-[225px] items-center">
              <View className="bg-white w-12 h-12 rounded-full items-center justify-center mb-4">
                <Image
                  source={require('src/app/assets/massage.png')}
                  className="w-6 h-6"
                  resizeMode="contain"
                />
              </View>
              <Text className="text-white text-xl font-poppinsMedium text-center mb-3">
                Communication Hub
              </Text>
              <Text className="text-white text-sm font-poppinsLight text-center mb-1">
                • In-app voice call between parent and driver
              </Text>
              <Text className="text-white text-sm font-poppinsLight text-center mb-1">
                • Group chat for parents of the same bus
              </Text>
              <Text className="text-white text-sm font-poppinsLight text-center">
                • Direct messaging for parent-driver or parent-parent
              </Text>
            </View>
          </View>

          
          <View className="w-screen items-center">
            <View className="bg-orange-400 rounded-2xl p-5 w-[307px] h-[225px] items-center">
              <View className="bg-white w-12 h-12 rounded-full items-center justify-center mb-4">
                <Image
                  source={require('src/app/assets/bell.png')}
                  className="w-6 h-6"
                  resizeMode="contain"
                />
              </View>
              <Text className="text-white text-xl font-poppinsMedium text-center mb-3">
                Alerts & Notifications
              </Text>
              <Text className="text-white text-sm font-poppinsLight text-center mb-1">
                • Emergency alerts and urgent messages
              </Text>
              <Text className="text-white text-sm font-poppinsLight text-center mb-1">
                • Route change and bus delay warnings
              </Text>
              <Text className="text-white text-sm font-poppinsLight text-center">
                • All chat message notifications
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>

      
      <Text className="text-center text-sm font-poppinsRegulary text-gray-500 px-6 mt-6">
        Add and verify the driver’s mobile number to activate full app features. Use the button below to complete setup.
      </Text>

      
      <Link href="screens/setup" asChild>
        <Pressable className="bg-blue-600 p-4 rounded-xl mt-6 mx-8">
          <Text className="text-white text-center font-bold">Complete The Setup</Text>
        </Pressable>
      </Link>
    </ScrollView>
  )
}

export default index
