import { View, Text, TextInput, Image, Pressable, KeyboardAvoidingView, Platform } from 'react-native'
import '../../../../global.css'
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

const SocialButton = ({ icon, label }: { icon: any; label: string }) => (
	<Pressable className="w-full rounded-xl border border-[#E6E8EC] bg-white px-4 py-3 flex-row items-center">
		<View className="w-6 h-6 items-center justify-center">{icon}</View>
		<Text className="flex-1 text-center text-[#A1A1A1] font-poppinsMedium">{label}</Text>
	</Pressable>
)

export default function LoginScreen() {
	// Uncontrolled input for simple UI parity with the mock

	return (
		<KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} className="flex-1 bg-white">
			<View className="flex-1 px-6 pb-8 justify-between">
				{/* Header Illustration */}
				<Image
					source={require('~/app/assets/login-top.png')}
					resizeMode="contain"
					className="w-full h-52 mt-8"
				/>

				{/* Form */}
				<View className="mt-6">
					<Text className="text-[15px] text-[#23252F] font-poppinsSemiBold">Enter Your Mobile Number*</Text>
					<View className="mt-3 rounded-xl border border-[#E6E8EC]">
									<TextInput
										keyboardType="phone-pad"
							placeholder="+94 70 XXX XXXX"
							placeholderTextColor="#A1A1A1"
							className="px-4 py-3 text-[#23252F] font-poppinsMedium"
						/>
					</View>

					<Pressable
						className="mt-4 rounded-xl"
						style={{ backgroundColor: COLORS.primary }}
						onPress={() => {}}
					>
						<Text className="text-white text-center py-3 font-poppinsSemiBold">Continue</Text>
					</Pressable>
				</View>

				{/* Divider text */}
				<View>
					<View className="mt-6 items-center">
						<Text className="text-[#6F6F71] font-poppinsMedium">Or Sign Up With</Text>
					</View>

					<View className="mt-4 gap-3">
						<SocialButton
							icon={<AntDesign name="google" size={18} color="#DB4437" />}
							label="Login With Google"
						/>
						<SocialButton
							icon={<FontAwesome name="facebook" size={18} color="#1877F2" />}
							label="Login With Facebook"
						/>
					</View>

					{/* Footer link */}
					<Pressable className="mt-6 items-center" onPress={() => {}}>
						<Text className="text-[#266FEF] underline font-poppinsMedium">Register New User</Text>
					</Pressable>
				</View>
			</View>
		</KeyboardAvoidingView>
	)
}

