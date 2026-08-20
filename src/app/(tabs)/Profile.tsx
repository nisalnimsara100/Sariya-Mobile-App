import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { router, Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const COLORS = {
  primary: '#266FEF',
  text: '#23252F',
  neutral400: '#6F6F71',
  alert: '#FF2D2D',
}

const Profile = () => {
  const handleLogout = () => {
    router.replace('/screens/welcome')
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <View className="flex-1 px-6 pt-10">
        <Text className="text-2xl font-poppinsBold text-[#23252F]">Profile</Text>
        <Text className="mt-2 font-poppinsMedium text-[#6F6F71]">
          Manage your account
        </Text>

        <View className="flex-1" />

        <Link href="/screens/dev" asChild>
          <Pressable
            className="mb-3 rounded-xl py-3"
            style={{ backgroundColor: COLORS.primary }}
          >
            <Text className="text-center font-poppinsSemiBold text-white">
              All Screens
            </Text>
          </Pressable>
        </Link>

        <Pressable
          onPress={handleLogout}
          className="mb-6 rounded-xl border py-3"
          style={{ borderColor: COLORS.alert }}
        >
          <Text
            className="text-center font-poppinsSemiBold"
            style={{ color: COLORS.alert }}
          >
            Logout
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default Profile