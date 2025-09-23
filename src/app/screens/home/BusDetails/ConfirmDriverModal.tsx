import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  Dimensions,
} from "react-native";

import Warning from "src/app/assets/warning.svg";
import Close from "src/app/assets/close.svg";

const { width: screenWidth } = Dimensions.get("window");

const responsiveFontSize = (size: number): number => {
  const newSize = size * (screenWidth / 375);
  return Math.max(newSize, size * 0.85);
};

const ConfirmDriverModal = ({
  visible,
  driverName,
  onCancel,
  onConnect,
}: {
  visible: boolean;
  driverName: string;
  onCancel: () => void;
  onConnect: () => void;
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          
          <Pressable style={styles.closeButton} onPress={onCancel}>
            <Close width={14} height={14} />
          </Pressable>

          
          <View style={styles.iconWrapper}>
            <View style={styles.iconSquare}>
              <Warning width={22} height={22} />
            </View>
          </View>

          
          <Text style={styles.title}>Are You Sure?</Text>

          
          <Text style={styles.message}>
            Double check the driver's details{"\n"} before proceeding.
          </Text>

          
          <View style={styles.driverInfo}>
            <Text style={styles.driverLabel}>Driver’s Name:</Text>
            <Text style={styles.driverName}>
              {driverName || "Nisal Nimsara"}
            </Text>
          </View>

          
          <View style={styles.buttonColumn}>
            <Pressable style={styles.connectButton} onPress={onConnect}>
              <Text style={styles.connectText}>Connect The Driver</Text>
            </Pressable>
            <Pressable style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.2)", 
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
    position: "relative",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 7,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  iconWrapper: {
    marginBottom: 10,
  },
  iconSquare: {
    width: 42,
    height: 42,
    backgroundColor: "#FFE4E4",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#FFE4E4",
  },
  title: {
    fontSize: responsiveFontSize(20),
    fontWeight: "500",
    color: "#000",
    marginBottom: 6,
    fontFamily: "PoppinsMedium",
  },
  message: {
    fontSize: responsiveFontSize(14),
    color: "#959595",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: responsiveFontSize(18),
    fontFamily: "PoppinsRegular",
    fontWeight: "400",
  },
  driverInfo: {
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
  },
  driverLabel: {
    fontSize: responsiveFontSize(14),
    color: "#000",
    fontWeight: "400",
    marginBottom: -4,
    fontFamily: "PoppinsRegular",
  },
  driverName: {
    fontSize: responsiveFontSize(17),
    color: "#000",
    fontWeight: "500",
    fontFamily: "PoppinsMedium",
    marginBottom: -10,
  },
  buttonColumn: {
    width: "100%",
  },
  connectButton: {
    backgroundColor: "#266FEF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  connectText: {
    color: "#fff",
    fontSize: responsiveFontSize(16),
    fontWeight: "500",
    fontFamily: "PoppinsMedium",
  },
  cancelButton: {
    backgroundColor: "#F8F8F8",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 2,
  },
  cancelText: {
    color: "#000",
    fontSize: responsiveFontSize(16),
    fontWeight: "500",
    fontFamily: "PoppinsMedium",
  },
});

export default ConfirmDriverModal;
