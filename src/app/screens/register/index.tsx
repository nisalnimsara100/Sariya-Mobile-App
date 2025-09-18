// @ts-nocheck
import { View, Text, TextInput, Image, Pressable, KeyboardAvoidingView, Platform, ScrollView, Modal, TouchableOpacity, Dimensions } from 'react-native'
import '../../../../global.css'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import * as React from 'react'
import ArrowBack from '../../assets/arrowback.svg'
import ArrowDown from '../../assets/arrowdown.svg'

const BORDER = '#BCD1FF'
const PRIMARY = '#266FEF'

export default function RegisterScreen() {
	const { width } = Dimensions.get('window')
	const containerWidth = Math.min(width * 0.85, 320) // Max width of 320px, or 85% of screen width
	const logoSize = Math.min(width * 0.55, 217) // Responsive logo size
	
	const [name, setName] = React.useState('')
	const [email, setEmail] = React.useState('')
	const [mobile, setMobile] = React.useState('')
	const [userType, setUserType] = React.useState('')
	const [pickerOpen, setPickerOpen] = React.useState(false)

	const userTypes = ['Student', 'Parent', 'Driver']

	return (
		<SafeAreaView className="flex-1 bg-white">
			<KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} className="flex-1">
				<ScrollView contentContainerStyle={{ 
					paddingHorizontal: Math.max(width * 0.075, 16), // Responsive horizontal padding
					paddingBottom: 24 
				}}>
					{/* Back button */}
					<Pressable onPress={() => router.back()} accessibilityLabel="Go back" className="mt-4 w-10 h-10 items-start justify-center" hitSlop={12}>
						<ArrowBack width={24} height={24} />
					</Pressable>

					{/* Logo */}
					<Image 
						source={require('~/app/assets/logoB.png')} 
						resizeMode="contain" 
						className="self-center mt-2" 
						style={{ 
							width: logoSize, 
							height: logoSize 
						}} 
					/>

					{/* Name */}
					<View className="self-center mt-2" style={{ width: containerWidth }}>
						<Text className="text-[16px] leading-[32px] font-poppinsMedium text-black">Name<Text>*</Text></Text>
						<View className="mt-1 h-[48px] rounded-[9px] border" style={{ borderColor: BORDER }}>
							<TextInput
								value={name}
								onChangeText={setName}
								placeholder="Nisal Nimsara"
								placeholderTextColor="#959595"
								className="px-4 text-[16px] leading-[32px] font-poppinsRegular"
							/>
						</View>
					</View>

					{/* Email */}
					<View className="self-center mt-3" style={{ width: containerWidth }}>
						<Text className="text-[16px] leading-[32px] font-poppinsMedium text-black">Email<Text>*</Text></Text>
						<View className="mt-1 h-[48px] rounded-[9px] border" style={{ borderColor: BORDER }}>
							<TextInput
								value={email}
								onChangeText={setEmail}
								keyboardType="email-address"
								autoCapitalize="none"
								placeholder="nisalnimsara2025@gmail.com"
								placeholderTextColor="#959595"
								className="px-4 text-[16px] leading-[32px] font-poppinsRegular"
							/>
						</View>
					</View>

					{/* Mobile Number */}
					<View className="self-center mt-3" style={{ width: containerWidth }}>
						<Text className="text-[16px] leading-[32px] font-poppinsMedium text-black">Mobile Number<Text>*</Text></Text>
						<View className="mt-1 h-[48px] rounded-[9px] border" style={{ borderColor: BORDER }}>
							<TextInput
								value={mobile}
								onChangeText={setMobile}
								keyboardType="phone-pad"
								placeholder="+94 70 XXX XXXX"
								placeholderTextColor="#959595"
								className="px-4 text-[16px] leading-[32px] tracking-[2px] font-poppinsRegular"
							/>
						</View>
					</View>

					{/* User Type */}
					<View className="self-center mt-3" style={{ width: containerWidth }}>
						<Text className="text-[16px] leading-[32px] font-poppinsMedium text-black">User Type<Text>*</Text></Text>
						<Pressable onPress={() => setPickerOpen(true)} className="mt-1 h-[48px] rounded-[9px] border flex-row items-center justify-between px-4" style={{ borderColor: BORDER }}>
							<Text className={`text-[16px] leading-[32px] ${userType ? 'text-black' : 'text-[#959595]'} font-poppinsRegular`}>
								{userType || 'Select User Type'}
							</Text>
							<ArrowDown width={16} height={16} />
						</Pressable>
					</View>

					{/* Continue */}
					<Pressable className="self-center h-[48px] rounded-[9px] mt-4 items-center justify-center" style={{ backgroundColor: PRIMARY, width: containerWidth }} onPress={() => {}}>
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
					<View 
						className="absolute top-1/3 rounded-xl bg-white p-4"
						style={{ 
							left: Math.max(width * 0.075, 16),
							right: Math.max(width * 0.075, 16)
						}}
					>
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

