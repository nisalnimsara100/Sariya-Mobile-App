import { View, Text, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import '../../../global.css';
import HomeBold from '../assets/icons/Bold/Home.svg';
import HomeOutline from '../assets/icons/Light/Home.svg';
import ChatBold from '../assets/icons/Bold/Chat.svg';
import ChatOutline from '../assets/icons/Light/Chat.svg';
import NotificationsBold from '../assets/icons/Bold/Notification.svg';
import NotificationsOutline from '../assets/icons/Light/Notification.svg';
import ProfileBold from '../assets/icons/Bold/Profile.svg';
import ProfileOutline from '../assets/icons/Light/Profile.svg';

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarLabelStyle: { fontSize: 12, marginTop: 7 },
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View className="items-center">
              <View className={focused ? "w-32 h-1 rounded bg-blue-600 mb-2" : "w-32 h-1 rounded bg-transparent mb-2"} />
              {focused ? <HomeBold width={26} height={26} /> : <HomeOutline width={24} height={24}/>}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Chat"
        options={{
          title: 'Chat',
          tabBarLabelStyle: { fontSize: 12, marginTop: 7 },
          tabBarIcon: ({ focused }) => (
            <View className="items-center">
              <View className={focused ? "w-32 h-1 rounded bg-blue-600 mb-2" : "w-32 h-1 rounded bg-transparent mb-2"} />
              {focused ? <ChatBold width={26} height={26} /> : <ChatOutline width={24} height={24} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Notifications"
        options={{
          title: 'Notifications',
          tabBarLabelStyle: { fontSize: 12, marginTop: 7 },
          tabBarIcon: ({ focused }) => (
            <View className="items-center">
              <View className={focused ? "w-32 h-1 rounded bg-blue-600 mb-2" : "w-32 h-1 rounded bg-transparent mb-2"} />
              {focused ? <NotificationsBold width={26} height={26} /> : <NotificationsOutline width={24} height={24} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarLabelStyle: { fontSize: 12, marginTop: 7 },
          tabBarIcon: ({ focused }) => (
            <View className="items-center">
              <View className={focused ? "w-32 h-1 rounded bg-blue-600 mb-2" : "w-32 h-1 rounded bg-transparent mb-2"} />
              {focused ? <ProfileBold width={26} height={26} /> : <ProfileOutline width={24} height={24} />}
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
