import { View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import Sariya from '../../assets/animations/sariyaLogo.json'
import { useWindowDimensions } from 'react-native'

const SplashScreen = () => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#266FEF' }}>
      <LottieView source={Sariya} autoPlay loop style={[{ width: SCREEN_WIDTH * 0.8, height: SCREEN_HEIGHT * 0.8 }, { marginBottom: SCREEN_HEIGHT * 0.15 }]} />
    </View>
  )
}

export default SplashScreen