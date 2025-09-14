import { View, Text } from 'react-native'
import React from 'react'
import Stack from 'expo-router/build/layouts/Stack'

const _layout = () => {
  return (
   <Stack
      screenOptions={{
        headerShown: false,                
        contentStyle: { backgroundColor: '#ffffff' }, 
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  )
}

export default _layout