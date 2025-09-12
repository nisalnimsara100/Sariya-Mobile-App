import { View, Text, Pressable } from 'react-native'
import '../../global.css'
import { Link } from 'expo-router'

const index = () => {
  return (
    <View>
      <Text className='text-4xl font-bold mt-20 text-center'>Screen Buttons</Text>
      <Link href="screens/welcome" asChild>
        <Pressable className='bg-blue-500 p-4 rounded m-10'>
          <Text className='text-white text-center'>Open Welcome Screen</Text>
        </Pressable>
      </Link>
    </View>
  )
}

export default index