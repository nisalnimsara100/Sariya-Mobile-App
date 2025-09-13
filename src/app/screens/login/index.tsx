import { View, Text, TextInput, Image, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import '../../../../global.css'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from '@expo/vector-icons/AntDesign'
import FontAwesome from '@expo/vector-icons/FontAwesome'

// Color tokens from the provided palette
const COLORS = {
	primary: '#266FEF',
	text: '#23252F',
	accent: '#F2C700', // picked a vivid yellow close to the mock
	alert: '#FF2D2D',
	// grays from the bar under the palette, approximate
	gray50: '#D7E5FD',
	gray100: '#BED2F4',
	gray200: '#B8D7FF',
	gray300: '#669EFF',
	gray400: '#4689FE',
	neutral100: '#ECECEC',
	neutral200: '#D8D8D8',
	neutral300: '#A1A1A1',
	neutral400: '#6F6F71',
	neutral500: '#4B4C50',
}

const SocialButton = ({ icon, label, className = '' }: { icon: any; label: string; className?: string }) => (
	<Pressable className={`rounded-[9px] border border-[#BCD1FF] bg-white px-4 flex-row items-center ${className}`}>
		<View className="w-6 h-6 items-center justify-center">{icon}</View>
		<Text className="flex-1 text-center text-[#A1A1A1] font-poppinsMedium">{label}</Text>
	</Pressable>
)

export default function LoginScreen() {
		// Uncontrolled input for simple UI parity with the mock
		return (
			<SafeAreaView className="flex-1 bg-white">
				<KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} className="flex-1">
					<ScrollView
						contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
						keyboardShouldPersistTaps="handled"
						showsVerticalScrollIndicator={false}
					>
						{/* Header Illustration */}
									<Image
										source={require('~/app/assets/login-top.png')}
										resizeMode="contain"
										className="self-center w-[215px] h-[210px] mt-[116px]"
									/>

						{/* Form */}
									<View className="mt-[64px] items-center">
										<Text className="self-start text-[16px] leading-[32px] text-[#23252F] font-poppinsSemiBold">Enter Your Mobile Number<Text>*</Text></Text>
										<View className="mt-[12px] w-[310px] h-[48px] rounded-[9px] border border-[#BCD1FF] bg-white justify-center">
								<TextInput
									keyboardType="phone-pad"
									placeholder="+94 70 XXX XXXX"
									placeholderTextColor="#A1A1A1"
												className="px-4 text-[#23252F] font-poppinsMedium"
								/>
							</View>

							<Pressable
											className="mt-[20px] w-[310px] h-[48px] rounded-[9px] justify-center"
								style={{ backgroundColor: COLORS.primary }}
								onPress={() => {}}
							>
											<Text className="text-white text-center font-poppinsSemiBold">Continue</Text>
							</Pressable>
						</View>

						{/* Divider text */}
									<View className="mt-[27px] items-center">
										<Text className="text-[14px] leading-[22px] text-[#23252F] font-poppinsSemiBold">Or Sign Up With</Text>
						</View>

									<View className="items-center">
										<SocialButton
											icon={<AntDesign name="google" size={18} color="#DB4437" />}
											label="Login With Google"
											className="mt-[32px] w-[310px] h-[48px]"
										/>
										<SocialButton
											icon={<FontAwesome name="facebook" size={18} color="#1877F2" />}
											label="Login With Facebook"
											className="mt-[20px] w-[310px] h-[48px]"
										/>
						</View>

						{/* Footer link */}
									<Pressable className="mt-[36px] items-center" onPress={() => {}}>
										<Text className="text-[#266FEF] underline font-poppinsMedium">Register New User</Text>
						</Pressable>
					</ScrollView>
				</KeyboardAvoidingView>
			</SafeAreaView>
		)
}

