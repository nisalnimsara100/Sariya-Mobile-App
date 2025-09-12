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
      <Text className='text-4xl font-bold mt-20 text-center'>Screen Buttons</Text>
      <Link href="screens/welcome" asChild>
        <Pressable className='bg-blue-500 p-4 rounded-lg m-10'>
          <Text className='text-white text-center'>Open Welcome Screen</Text>
        </Pressable>
      </Link>
    </View>
  )
}

export default index