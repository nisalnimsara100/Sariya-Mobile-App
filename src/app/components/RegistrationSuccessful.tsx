import { View, Text, useWindowDimensions, StyleSheet } from 'react-native';
import React from 'react';
import SuccessAnimation from '../../app/assets/animations/Success.json';
import LottieView from 'lottie-react-native';

const RegistrationSuccessful = () => {
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

    return (
        <View style={[styles.container, { paddingHorizontal: SCREEN_WIDTH * 0.05 }]}>
            <LottieView 
                source={SuccessAnimation} 
                autoPlay 
                loop={true}
                style={{ width: SCREEN_WIDTH * 0.5, height: SCREEN_HEIGHT * 0.5, marginTop: SCREEN_HEIGHT * -0.2 }} 
                renderMode="AUTOMATIC"
            />
            <Text style={[styles.successText, { fontSize: SCREEN_HEIGHT * 0.019, marginTop: SCREEN_HEIGHT * -0.15 }]}>
                Registration Successful{' '}
                <Text>🎉</Text>  {/* Separated emoji into its own Text component */}
            </Text>
            <Text style={[styles.subText, { fontSize: SCREEN_HEIGHT * 0.015 }]}>
                Your child&apos;s ride, secured.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    successText: {
        fontFamily: 'PoppinsSemiBold',
        textAlign: 'center',
    },
    subText: {
        fontFamily: 'PoppinsRegular',
        textAlign: 'center',
    },
});

export default RegistrationSuccessful;