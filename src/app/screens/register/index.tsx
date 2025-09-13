// @ts-nocheck
import { View, Text, TextInput, Image, Pressable, KeyboardAvoidingView, Platform, ScrollView, Modal, TouchableOpacity } from 'react-native'
import '../../../../global.css'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import * as React from 'react'

const BORDER = '#BCD1FF'
const PRIMARY = '#266FEF'

export default function RegisterScreen() {
	const [name, setName] = React.useState('')
	const [email, setEmail] = React.useState('')
	const [mobile, setMobile] = React.useState('')
	const [userType, setUserType] = React.useState('')
	const [pickerOpen, setPickerOpen] = React.useState(false)

	const userTypes = ['Student', 'Parent', 'Driver']

	return (
		<SafeAreaView className="flex-1 bg-white">
			<KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} className="flex-1">
				<ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}>
					{/* Back button */}
					<Pressable onPress={() => router.back()} className="mt-4" hitSlop={10}>
						<Text className="text-black text-2xl">←</Text>
					</Pressable>

					{/* Logo */}
					<Image source={require('~/app/assets/logoB.png')} resizeMode="contain" className="self-center w-[217px] h-[217px] mt-2" />

					{/* Name */}
					<View className="self-center w-[310px] mt-2">
						<Text className="text-[16px] leading-[32px] font-poppinsMedium text-black">Name<Text>*</Text></Text>
						<View className="mt-2 h-[48px] rounded-[9px] border" style={{ borderColor: BORDER }}>
							<TextInput
								value={name}
								onChangeText={setName}
								placeholder="Nisal Nimsara"
								placeholderTextColor="#959595"
								className="px-4 text-[16px] leading-[32px] font-poppinsRegulary"
							/>
						</View>
					</View>

					{/* Email */}
					<View className="self-center w-[310px] mt-3">
						<Text className="text-[16px] leading-[32px] font-poppinsMedium text-black">Email<Text>*</Text></Text>
						<View className="mt-2 h-[48px] rounded-[9px] border" style={{ borderColor: BORDER }}>
							<TextInput
								value={email}
								onChangeText={setEmail}
								keyboardType="email-address"
								autoCapitalize="none"
								placeholder="nisalnimsara2025@gmail.com"
								placeholderTextColor="#959595"
								className="px-4 text-[16px] leading-[32px] font-poppinsRegulary"
							/>
						</View>
					</View>

					{/* Mobile Number */}
					<View className="self-center w-[310px] mt-3">
						<Text className="text-[16px] leading-[32px] font-poppinsMedium text-black">Mobile Number<Text>*</Text></Text>
						<View className="mt-2 h-[48px] rounded-[9px] border" style={{ borderColor: BORDER }}>
							<TextInput
								value={mobile}
								onChangeText={setMobile}
								keyboardType="phone-pad"
								placeholder="+94 70 XXX XXXX"
								placeholderTextColor="#959595"
								className="px-4 text-[16px] leading-[32px] tracking-[2px] font-poppinsRegulary"
							/>
						</View>
					</View>

					{/* User Type */}
					<View className="self-center w-[310px] mt-3">
						<Text className="text-[16px] leading-[32px] font-poppinsMedium text-black">User Type<Text>*</Text></Text>
						<Pressable onPress={() => setPickerOpen(true)} className="mt-2 h-[48px] rounded-[9px] border flex-row items-center justify-between px-4" style={{ borderColor: BORDER }}>
							<Text className={`text-[16px] leading-[32px] ${userType ? 'text-black' : 'text-[#959595]'} font-poppinsRegulary`}>
								{userType || 'Select User Type'}
							</Text>
							<Text className="text-black">⌄</Text>
						</Pressable>
					</View>

					{/* Continue */}
					<Pressable className="self-center w-[310px] h-[48px] rounded-[9px] mt-4 items-center justify-center" style={{ backgroundColor: PRIMARY }} onPress={() => {}}>
						<Text className="text-white text-[16px] leading-[32px] font-poppinsMedium">Continue</Text>
					</Pressable>

					{/* Terms */}
					<Pressable className="mt-4 items-center">
						<Text className="text-[#959595] underline text-[14px] leading-[21px] font-poppinsMedium">Terms and Conditions</Text>
					</Pressable>
				</ScrollView>
			</KeyboardAvoidingView>

			{/* Simple picker modal */}
			<Modal transparent visible={pickerOpen} animationType="fade" onRequestClose={() => setPickerOpen(false)}>
				<Pressable className="flex-1 bg-black/30" onPress={() => setPickerOpen(false)}>
					<View className="absolute left-6 right-6 top-1/3 rounded-xl bg-white p-4">
						{userTypes.map((ut) => (
							<TouchableOpacity key={ut} className="py-3" onPress={() => { setUserType(ut); setPickerOpen(false) }}>
								<Text className="text-[16px] font-poppinsMedium">{ut}</Text>
							</TouchableOpacity>
						))}
					</View>
				</Pressable>
			</Modal>
		</SafeAreaView>
	)
}

