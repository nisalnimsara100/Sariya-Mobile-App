import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Dimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Dashboard2 from "src/app/assets/D2.svg";
import ConfirmDriverModal from "./ConfirmDriverModal"; // ✅ Step 1: Import modal

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
  const [showModal, setShowModal] = useState(false); // ✅ Step 2: Modal state

  const handleConfirmPress = () => setShowModal(true);
  const handleConnectDriver = () => {
    // You can add logic here (e.g., API call)
    setShowModal(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>School Bus Details</Text>
          <Text style={styles.subtitle}>Confirm your school bus details</Text>
        </View>

        <View style={styles.illustration}>
          <Dashboard2 width="100%" height="100%" preserveAspectRatio="xMidYMid meet" />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Driver’s Mobile Number*</Text>
          <TextInput
            style={styles.input}
            placeholder="+94 70 XXX XXXX"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Driver’s Name</Text>
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

      {/* ✅ Step 3: Render modal */}
      <ConfirmDriverModal
        visible={showModal}
        driverName={driverName}
        onCancel={() => setShowModal(false)}
        onConnect={handleConnectDriver}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  scrollContent: {
    minHeight: screenHeight,
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: verticalScale(20),
  },

  headerContainer: { alignItems: "center", marginTop: verticalScale(20) },
  title: {
    fontSize: responsiveFontSize(18),
    fontWeight: "600",
    color: "#000",
    fontFamily: "PoppinsSemiBold",
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
    padding: moderateScale(12),
    marginBottom: verticalScale(18),
    fontSize: responsiveFontSize(16),
    color: "#959595",
    width: "100%",
    fontFamily: "PoppinsRegular",
  },

  confirmButton: {
    backgroundColor: "#266FEF",
    paddingVertical: verticalScale(15),
    borderRadius: moderateScale(8),
    alignItems: "center",
    marginTop: verticalScale(18),
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
