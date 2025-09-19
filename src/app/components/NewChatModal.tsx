import React from 'react';
import { Modal, View, StyleSheet, Text } from 'react-native';

interface ChatModalProps {
  visible: boolean;
  onClose: () => void;
}

const NewChatModal: React.FC<ChatModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.modalContainer}>
        {/* Add your modal content here */}
        <Text>New Chat Modal Content</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewChatModal;