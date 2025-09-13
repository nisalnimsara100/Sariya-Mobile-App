import { View, Text, Pressable, Image, ScrollView } from 'react-native'
import '../../../global.css'
import { Link } from 'expo-router'

const index = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      {/* Logo */}
      <Image
        source={require('~/app/assets/icon.png')}
        className="w-40 h-40 mx-auto mt-16"
        resizeMode="contain"
      />

      {/* Features */}
      <View className="mt-6 px-6">

        {/* Real-time Bus Tracking */}
       <View className="bg-blue-500 rounded-2xl p-5 items-center">
  {/* Circle with icon */}
  <View className="bg-white w-12 h-12 rounded-full items-center justify-center mb-3">
    <Image
      source={require('src/app/assets/drop.png')}
      className="w-6 h-6"
      resizeMode="contain"
    />
  </View>

  <Text className="text-white text-lg font-poppinsMedium text-center">
    Real-time Bus Tracking
  </Text>
  <Text className="text-white mt-2 text-center">
    • Live GPS map showing bus location and route
  </Text>
  <Text className="text-white text-center">
    • Estimated time of arrival at pickup, drop points
  </Text>
  <Text className="text-white text-center">
    • Speed alerts and route deviations
  </Text>
</View>


        {/* Communication Hub */}
        <View className="bg-red-400 rounded-2xl p-5 mb-4 items-center">

  {/* Circle with icon */}
  <View className="bg-white w-12 h-12 rounded-full items-center justify-center mb-3">
    <Image
      source={require('src/app/assets/massage.png')}
      className="w-6 h-6"
      resizeMode="contain"
    />
  </View>

  <Text className="text-white text-lg font-poppinsMedium text-center">
    Communication Hub
  </Text>
  <Text className="text-white mt-2 text-center">
    • In-app voice call between parent and driver
  </Text>
  <Text className="text-white text-center">
    • Group chat for parents of the same bus
  </Text>
  <Text className="text-white text-center">
    • Direct messaging for parent-driver or parent-parent
  </Text>
</View>


        {/* Alerts & Notifications */}
        <View className="bg-orange-400 rounded-2xl p-5 mb-6 items-center">

  {/* Circle with icon */}
  <View className="bg-white w-12 h-12 rounded-full items-center justify-center mb-3">
    <Image
      source={require('src/app/assets/bell.png')}
      className="w-6 h-6"
      resizeMode="contain"
    />
  </View>

  <Text className="text-white text-lg font-poppinsMedium text-center">
    Alerts & Notifications
  </Text>
  <Text className="text-white mt-2 text-center">
    • Emergency alerts and urgent messages
  </Text>
  <Text className="text-white text-center">
    • Route change and bus delay warnings
  </Text>
  <Text className="text-white text-center">
    • All chat message notifications
  </Text>
</View>

      </View>

      {/* Info */}
      <Text className="text-center text-gray-600 px-6">
        Add and verify the driver’s mobile number to activate full app features. Use the button below to complete setup.
      </Text>

      {/* Setup Button */}
      <Link href="screens/setup" asChild>
        <Pressable className="bg-blue-600 p-4 rounded-xl mt-6 mx-8">
          <Text className="text-white text-center font-bold">Complete The Setup</Text>
        </Pressable>
      </Link>
    </ScrollView>
  )
}

export default index
