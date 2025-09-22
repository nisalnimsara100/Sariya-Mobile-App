import { View, Text, Pressable, Image } from 'react-native'
import '../../../../global.css'
import { Link } from 'expo-router'

const Welcome = () => {
  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Image source={require('~/app/assets/icon.png')} className="w-52 h-52 self-center mb-10" resizeMode="contain" />
      <Text className="text-3xl text-center font-poppinsBold text-[#23252F]">Welcome</Text>
      <Text className="text-center mt-2 text-[#6F6F71] font-poppinsMedium">Let’s get you signed in</Text>

      <Link href="/screens/login" asChild>
        <Pressable className="mt-10 rounded-xl bg-[#266FEF] py-3">
          <Text className="text-white text-center font-poppinsSemiBold">Login</Text>
        </Pressable>
      </Link>
    </View>
  )
}

export default Welcome