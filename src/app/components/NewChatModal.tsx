import React, { useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import ChatNisal from '../assets/icons/chatss/Nisal.svg';
import ChatNethmi from '../assets/icons/chatss/Nethmi.svg';
import ChatSearch from '../assets/icons/chatss/search-line.svg';
import ChatAshen from '../assets/icons/chatss/Ashen.svg';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  type: 'driver' | 'parent';
}

interface ChatModalProps {
  visible: boolean;
  onClose: () => void;
}

// Get responsive dimensions and font scaling
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Enhanced responsive scaling functions for exact design proportions
const scale = (size: number): number => {
  const guidelineBaseWidth = 375; // iPhone 6/7/8 base width
  return (screenWidth / guidelineBaseWidth) * size;
};

const verticalScale = (size: number): number => {
  const guidelineBaseHeight = 812; // iPhone X base height  
  return (screenHeight / guidelineBaseHeight) * size;
};

const moderateScale = (size: number, factor: number = 0.5): number => {
  const scaledSize = scale(size);
  return size + (scaledSize - size) * factor;
};

// Enhanced responsive font size with better scaling
const responsiveFontSize = (size: number): number => {
  const scaledSize = scale(size);
  // Ensure fonts don't get too small on smaller devices or too large on tablets
  const minSize = size * 0.85;
  const maxSize = size * 1.3;
  return Math.max(minSize, Math.min(maxSize, scaledSize));
};

const NewChatModal: React.FC<ChatModalProps> = ({ visible, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Responsive avatar dimensions
  const AVATAR_SIZE = moderateScale(42);
  const AVATAR_HEIGHT = moderateScale(63); // Restore original height
  const AVATAR_BORDER_RADIUS = AVATAR_SIZE / 2;

  const allContacts: Contact[] = [
    { id: '1', name: 'Nisal Nimsara', avatar: 'nisal', type: 'driver' },
    { id: '2', name: 'Ashen Widanagamage', avatar: 'ashen', type: 'parent' },
    { id: '3', name: 'Chandula Wijesekara', avatar: 'chandula', type: 'parent' },
    { id: '4', name: 'Danuka Thushan', avatar: 'danuka', type: 'parent' },
    { id: '5', name: 'Dilshan Devinda', avatar: 'dilshan', type: 'parent' },
    { id: '6', name: 'Gimani Wijesinghe', avatar: 'gimani', type: 'parent' },
    { id: '7', name: 'Janaka Thennakoon', avatar: 'janaka', type: 'parent' },
    { id: '8', name: 'Maleesha Deshan', avatar: 'deshan', type: 'parent' },
    { id: '9', name: 'Nethmi Wijesinghe', avatar: 'nethmi', type: 'parent' },
    { id: '10', name: 'Nisal Adhikari', avatar: 'nisal', type: 'parent' },
    { id: '11', name: 'Nuwani Thasindu', avatar: 'nuwani', type: 'parent' },
    { id: '13', name: 'Anjalika ranasinghe', avatar: 'anjalika', type: 'parent' },
  ];

  // Filter and then sort alphabetically by name
  const filteredContacts = allContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const drivers = filteredContacts
    .filter(c => c.type === 'driver')
    .sort((a, b) => a.name.localeCompare(b.name));
  const parents = filteredContacts
    .filter(c => c.type === 'parent')
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleContactPress = (contact: Contact) => {
    console.log('Selected contact:', contact.name);
    setSearchQuery(''); // Clear search when contact is selected
    onClose();
  };

  const ContactItem: React.FC<{ contact: Contact; index: number }> = ({ contact, index }) => (
    <TouchableOpacity
      style={[
        styles.contactItem,
        { 
          backgroundColor: '#e8e8e8', 
          borderRadius: moderateScale(9),
          marginBottom: verticalScale(1), // Very small spacing like in UI
          marginHorizontal: scale(20),
        },
      ]}
      onPress={() => handleContactPress(contact)}
    >
      {contact.avatar === 'nisal' ? (
        <ChatNisal
          width={AVATAR_SIZE}
          height={AVATAR_HEIGHT}
          style={[styles.avatar, { borderRadius: AVATAR_BORDER_RADIUS }]}
        />
      ) : contact.avatar === 'nethmi' ? (
        <ChatNethmi
          width={AVATAR_SIZE}
          height={AVATAR_HEIGHT}
          style={[styles.avatar, { borderRadius: AVATAR_BORDER_RADIUS }]}
        />
      ) : contact.avatar === 'ashen' ? (
        <ChatAshen
          width={AVATAR_SIZE}
          height={AVATAR_HEIGHT}
          style={[styles.avatar, { borderRadius: AVATAR_BORDER_RADIUS }]}
        />
      ) : contact.avatar === 'anjalika' ? (
        <ChatNethmi
          width={AVATAR_SIZE}
          height={AVATAR_HEIGHT}
          style={[styles.avatar, { borderRadius: AVATAR_BORDER_RADIUS }]}
        />
      ) : contact.avatar === 'chandula' ? (
        <ChatAshen
          width={AVATAR_SIZE}
          height={AVATAR_HEIGHT}
          style={[styles.avatar, { borderRadius: AVATAR_BORDER_RADIUS }]}
        />
      ) : contact.avatar === 'gimani' ? (
        <ChatNethmi
          width={AVATAR_SIZE}
          height={AVATAR_HEIGHT}
          style={[styles.avatar, { borderRadius: AVATAR_BORDER_RADIUS }]}
        />
      ) : contact.avatar === 'danuka' ? (
        <ChatNisal
          width={AVATAR_SIZE}
          height={AVATAR_HEIGHT}
          style={[styles.avatar, { borderRadius: AVATAR_BORDER_RADIUS }]}
        />
      ) : contact.avatar === 'janaka' ? (
        <ChatNisal
          width={AVATAR_SIZE}
          height={AVATAR_HEIGHT}
          style={[styles.avatar, { borderRadius: AVATAR_BORDER_RADIUS }]}
        />
      ) : contact.avatar === 'deshan' ? (
        <ChatAshen
          width={AVATAR_SIZE}
          height={AVATAR_HEIGHT}
          style={[styles.avatar, { borderRadius: AVATAR_BORDER_RADIUS }]}
        />
      ) : contact.avatar === 'dilshan' ? (
        <ChatAshen
          width={AVATAR_SIZE}
          height={AVATAR_HEIGHT}
          style={[styles.avatar, { borderRadius: AVATAR_BORDER_RADIUS }]}
        />
      ) : contact.avatar === 'nuwani' ? (
        <ChatNethmi
          width={AVATAR_SIZE}
          height={AVATAR_HEIGHT}
          style={[styles.avatar, { borderRadius: AVATAR_BORDER_RADIUS }]}
        />
      ) : (
        <Image 
          source={{ uri: contact.avatar }} 
          style={[
            styles.avatar, 
            { 
              width: AVATAR_SIZE,
              height: AVATAR_HEIGHT,
              borderRadius: AVATAR_BORDER_RADIUS 
            }
          ]} 
        />
      )}
      <Text style={styles.contactName}>{contact.name}</Text>
    </TouchableOpacity>
  );

  const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <View style={styles.sectionHeader}>
      <Text style={title === 'Driver' ? styles.driverSectionTitle : styles.sectionTitle}>
        {title}
      </Text>
    </View>
  );

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>New Chat</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <ChatSearch 
              width={moderateScale(17)} 
              height={moderateScale(17)} 
              style={styles.searchIcon} 
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Name"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {searchQuery && filteredContacts.length === 0 ? (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No contacts found for &quot;{searchQuery}&quot;</Text>
            </View>
          ) : (
            <>
              {drivers.length > 0 && (
                <>
                  <SectionHeader title="Driver" />
                  {drivers.map((driver, index) => (
                    <ContactItem key={driver.id} contact={driver} index={index} />
                  ))}
                </>
              )}

              {parents.length > 0 && (
                <>
                  <SectionHeader title="Parents" />
                  {parents.map((parent, index) => (
                    <ContactItem key={parent.id} contact={parent} index={index} />
                  ))}
                </>
              )}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

// Responsive Styles
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5',
    fontFamily: 'PoppinsMedium',
  },
  header: {
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(20),
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
    fontFamily: 'PoppinsSemiBold',
  },
  searchContainer: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(12),
    backgroundColor: '#f5f5f5',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    borderRadius: moderateScale(20),
    paddingHorizontal: scale(12),
    height: Math.max(verticalScale(36), 32), // Responsive height with minimum
    minHeight: 32, // Ensure minimum usable height
  },
  searchIcon: { 
    marginRight: scale(8),
    color: '#999',
    width: moderateScale(16),
    height: moderateScale(16),
  },
  searchInput: {
    flex: 1,
    paddingVertical: 0,
    fontSize: responsiveFontSize(13),
    fontWeight: '400',
    color: '#000',
    fontFamily: 'PoppinsRegular',
    includeFontPadding: false, // Remove extra font padding on Android
    textAlignVertical: 'center', // Center text vertically
  },
  scrollView: { 
    flex: 1 
  },
  sectionHeader: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(8), // Reduced spacing
    marginTop: verticalScale(12), // Reduced margin
    backgroundColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: responsiveFontSize(10), // Smaller font
    fontWeight: '500',
    color: '#666',
    backgroundColor: '#d0d0d0',
    paddingHorizontal: scale(8), // Smaller padding
    paddingVertical: verticalScale(3), // Smaller padding
    borderRadius: moderateScale(12), // Smaller radius
    alignSelf: 'flex-start',
    fontFamily: 'PoppinsMedium',
    textAlign: 'center',
    overflow: 'hidden',
    minHeight: Math.max(verticalScale(18), 16), // Smaller minimum height
    includeFontPadding: false,
  },
  driverSectionTitle: {
    fontSize: responsiveFontSize(10), // Smaller font
    fontWeight: '500',
    color: '#fff',
    backgroundColor: '#000',
    paddingHorizontal: scale(8), // Smaller padding
    paddingVertical: verticalScale(3), // Smaller padding
    borderRadius: moderateScale(12), // Smaller radius
    alignSelf: 'flex-start',
    fontFamily: 'PoppinsMedium',
    textAlign: 'center',
    overflow: 'hidden',
    minHeight: Math.max(verticalScale(18), 16), // Smaller minimum height
    includeFontPadding: false,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(8),
    height: Math.max(verticalScale(54), 48), // Responsive height with minimum
    minHeight: 48, // Ensure minimum touch target
  },
  avatar: {
    width: moderateScale(42),
    height: Math.max(moderateScale(63), 50), // Responsive height with minimum
    borderRadius: moderateScale(21),
    marginRight: scale(12),
  },
  contactName: {
    fontSize: responsiveFontSize(15),
    fontWeight: '500',
    color: '#000',
    flex: 1,
    fontFamily: 'PoppinsMedium',
    includeFontPadding: false, // Remove extra font padding
  },
  noResultsContainer: {
    paddingVertical: verticalScale(40),
    paddingHorizontal: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsText: {
    fontSize: responsiveFontSize(14),
    color: '#666',
    fontFamily: 'PoppinsRegular',
    textAlign: 'center',
  },
});

export default NewChatModal;