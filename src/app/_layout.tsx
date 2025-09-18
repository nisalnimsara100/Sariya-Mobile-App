import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PoppinsRegular: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
    PoppinsMedium: require('./assets/fonts/Poppins-Medium.ttf'),
    PoppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsLight: require('./assets/fonts/Poppins-Light.ttf'),
  })

  if (!fontsLoaded) return null

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,                
        contentStyle: { backgroundColor: '#ffffff' }, 
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  )
}
