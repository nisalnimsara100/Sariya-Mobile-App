import { View, Text, Pressable, Image } from 'react-native'
import '../../global.css'
import { Link } from 'expo-router'

const index = () => {
  
  return (
    <View>
      <Image 
        source={require('~/app/assets/icon.png')} 
        className="w-64 h-64 mx-auto mt-40"
        resizeMode="contain"
      />
      <Text className='text-4xl mt-20 text-center font-poppinsBold'>Screen Buttons</Text>
      <Link href="screens/welcome" asChild>
        <Pressable className='bg-blue-500 p-4 rounded-lg ml-10 mr-10  mt-5'>
          <Text className='text-white text-center'>Open Welcome Screen</Text>
        </Pressable>
      </Link>
      <Link href="screens/dashboard" asChild>
        <Pressable className='bg-green-500 p-4 rounded-lg ml-10 mr-10 mt-3'>
          <Text className='text-white text-center'>Open Dashboard Screen</Text>
        </Pressable>
      </Link>
      <Link href="(tabs)" asChild>
        <Pressable className='bg-purple-500 p-4 rounded-lg ml-10 mr-10 mt-3'>
          <Text className='text-white text-center'>Open Tabs Screen</Text>
        </Pressable>
      </Link>
      <Link href="screens/login" asChild>
        <Pressable className='bg-blue-600 p-4 rounded-lg ml-10 mr-10 mt-3'>
          <Text className='text-white text-center'>Open Login Screen</Text>
        </Pressable>
      </Link>
      <Link href="screens/home/BusDetails" asChild>
        <Pressable className='bg-yellow-500 p-4 rounded-lg ml-10 mr-10 mt-3 mb-10'>
          <Text className='text-white text-center'>Open Home Screen</Text>
        </Pressable>
      </Link>

      
    </View>
  )
}

export default index