import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Dimensions,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Dashboard2 from "src/app/assets/verify your bus.svg";
import ConfirmDriverModal from "./ConfirmDriverModal";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const scale = (size: number): number => (screenWidth / 375) * size;
const verticalScale = (size: number): number => (screenHeight / 812) * size;
const moderateScale = (size: number, factor: number = 0.5): number =>
  size + (scale(size) - size) * factor;

const responsiveFontSize = (size: number): number => {
  const newSize = size * (screenWidth / 375);
  return Math.max(newSize, size * 0.85);
};

const SchoolBusDetails = () => {
  const [mobile, setMobile] = useState("");
  const [driverName, setDriverName] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleConfirmPress = () => setShowModal(true);
  const handleConnectDriver = () => {
    setShowModal(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Verify Your Bus</Text>
          <Text style={styles.subtitle}>Confirm your bus details</Text>
        </View>

        <View style={styles.illustration}>
          <Dashboard2
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Your Mobile Number*</Text>
          <TextInput
            style={styles.input}
            placeholder="+94 70 XXX XXXX"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Your Name</Text>
          <TextInput
            style={styles.input}
            placeholder="This field will be auto complete"
            value={driverName}
            onChangeText={setDriverName}
          />

          <Text style={styles.label}>Vehicle Number</Text>
          <TextInput
            style={styles.input}
            placeholder="This field will be auto complete"
            value={vehicleNo}
            onChangeText={setVehicleNo}
          />

          <Pressable style={styles.confirmButton} onPress={handleConfirmPress}>
            <Text style={styles.confirmText}>Confirm</Text>
          </Pressable>
        </View>
      </ScrollView>

      <ConfirmDriverModal
        visible={showModal}
        driverName={driverName}
        onCancel={() => setShowModal(false)}
        onConnect={handleConnectDriver}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: verticalScale(40),
    paddingBottom: verticalScale(40),
  },

  headerContainer: { alignItems: "center", marginBottom: verticalScale(0) },
  title: {
    fontSize: responsiveFontSize(18),
    fontWeight: "600",
    color: "#000",
    fontFamily: "PoppinsSemiBold",
    marginTop: verticalScale(30),
  },
  subtitle: {
    fontSize: responsiveFontSize(14),
    color: "#7d7d7d",
    marginTop: verticalScale(4),
    fontFamily: "PoppinsRegular",
    fontWeight: "400",
  },

  illustration: {
    width: screenWidth * 0.65,
    height: screenHeight * 0.25,
    marginVertical: verticalScale(20),
  },

  form: {
    width: "80%",
    alignItems: "center",
  },
  label: {
    fontSize: responsiveFontSize(16),
    fontWeight: "500",
    marginBottom: verticalScale(6),
    color: "#000",
    alignSelf: "flex-start",
    fontFamily: "PoppinsMedium",
  },
  input: {
    borderWidth: 1,
    borderColor: "#BCD1FF",
    borderRadius: moderateScale(8),
    paddingVertical: 0,
    paddingHorizontal: moderateScale(12),
    height: verticalScale(52),
    marginBottom: verticalScale(18),
    fontSize: responsiveFontSize(16),
    color: "#000",
    width: "100%",
    fontFamily: "PoppinsRegular",
    textAlignVertical: "center",
  },

  confirmButton: {
    backgroundColor: "#266FEF",
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(8),
    alignItems: "center",
    marginTop: verticalScale(16),
    width: "100%",
  },
  confirmText: {
    color: "#fff",
    fontSize: responsiveFontSize(16),
    fontWeight: "500",
    fontFamily: "PoppinsMedium",
  },
});

export default SchoolBusDetails;
