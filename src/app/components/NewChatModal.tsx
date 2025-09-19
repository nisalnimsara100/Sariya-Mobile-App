import React, { useState, useEffect } from 'react';
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
const isTablet = screenWidth > 600;
const isLandscape = screenWidth > screenHeight;

// Responsive scaling functions
const scale = (size: number): number => (screenWidth / 375) * size; // 375 is base width (iPhone 6/7/8)
const verticalScale = (size: number): number => (screenHeight / 812) * size; // 812 is base height
const moderateScale = (size: number, factor: number = 0.5): number =>
  size + (scale(size) - size) * factor;

// Responsive font size
const responsiveFontSize = (size: number): number => {
  const newSize = size * (screenWidth / 375);
  return Math.max(newSize, size * 0.8); // Ensure minimum readability
};

const NewChatModal: React.FC<ChatModalProps> = ({ visible, onClose }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  // Responsive avatar dimensions
  const AVATAR_WIDTH = moderateScale(42);
  const AVATAR_HEIGHT = moderateScale(63);
  const AVATAR_BORDER_RADIUS = Math.min(AVATAR_WIDTH, AVATAR_HEIGHT) / 2;

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
  const drivers = allContacts
    .filter(c => c.type === 'driver')
    .sort((a, b) => a.name.localeCompare(b.name));
  const parents = allContacts
    .filter(c => c.type === 'parent')
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleContactPress = (contact: Contact) => {
    console.log('Selected contact:', contact.name);
    onClose();
  };

  const ContactItem: React.FC<{ contact: Contact; index: number }> = ({ contact, index }) => (
    <TouchableOpacity
      style={[
        styles.contactItem,
        { 
          backgroundColor: '#e8e8e8', 
          borderRadius: moderateScale(9),
          borderBottomColor: '#f5f5f5', 
          borderBottomWidth: index === (contact.type === 'driver' ? drivers.length - 0.5 : parents.length - 0.5) ? 0 : 0.5,
         
          
        },
      ]}
      onPress={() => handleContactPress(contact)}
    >
      {contact.avatar === 'nisal' ? (
        <ChatNisal
          width={AVATAR_WIDTH}
          height={AVATAR_HEIGHT}
          style={[styles.avatar, { borderRadius: AVATAR_BORDER_RADIUS }]}
        />
      ) : contact.avatar === 'nethmi' ? (
        <ChatNethmi
          width={AVATAR_WIDTH}
          height={AVATAR_HEIGHT}
          style={[styles.avatar, { borderRadius: AVATAR_BORDER_RADIUS }]}
        />
      ) : contact.avatar === 'ashen' ? (
        <ChatAshen
          width={AVATAR_WIDTH}
          height={AVATAR_HEIGHT}
          style={[styles.avatar, { borderRadius: AVATAR_BORDER_RADIUS }]}
        />
      ) : contact.avatar === 'anjalika' ? (
        <ChatNethmi
          width={AVATAR_WIDTH}
          height={AVATAR_HEIGHT}
          style={[styles.avatar, { borderRadius: AVATAR_BORDER_RADIUS }]}
        />
      ) : contact.avatar === 'chandula' ? (
        <ChatAshen
          width={AVATAR_WIDTH}
          height={AVATAR_HEIGHT}
          style={[styles.avatar, { borderRadius: AVATAR_BORDER_RADIUS }]}
        />
      ) : contact.avatar === 'gimani' ? (
        <ChatNethmi
          width={AVATAR_WIDTH}
          height={AVATAR_HEIGHT}
          style={[styles.avatar, { borderRadius: AVATAR_BORDER_RADIUS }]}
        />
      ) : contact.avatar === 'danuka' ? (
        <ChatNisal
          width={AVATAR_WIDTH}
          height={AVATAR_HEIGHT}
          style={[styles.avatar, { borderRadius: AVATAR_BORDER_RADIUS }]}
        />
      ) : contact.avatar === 'janaka' ? (
        <ChatNisal
          width={AVATAR_WIDTH}
          height={AVATAR_HEIGHT}
          style={[styles.avatar, { borderRadius: AVATAR_BORDER_RADIUS }]}
        />
      ) : contact.avatar === 'deshan' ? (
        <ChatAshen
          width={AVATAR_WIDTH}
          height={AVATAR_HEIGHT}
          style={[styles.avatar, { borderRadius: AVATAR_BORDER_RADIUS }]}
        />
      ) : contact.avatar === 'dilshan' ? (
        <ChatAshen
          width={AVATAR_WIDTH}
          height={AVATAR_HEIGHT}
          style={[styles.avatar, { borderRadius: AVATAR_BORDER_RADIUS }]}
        />
      ) : contact.avatar === 'nuwani' ? (
        <ChatNethmi
          width={AVATAR_WIDTH}
          height={AVATAR_HEIGHT}
          style={[styles.avatar, { borderRadius: AVATAR_BORDER_RADIUS }]}
        />
      ) : (
        <Image 
          source={{ uri: contact.avatar }} 
          style={[
            styles.avatar, 
            { 
              width: AVATAR_WIDTH,
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
            />
          </View>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
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
    paddingLeft: scale(20),
    paddingRight: scale(20),
    fontFamily: 'PoppinsMedium',
  },
  header: {
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(20),
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
    fontFamily: 'PoppinsSemiBold',
  },
  searchContainer: {
    paddingHorizontal: scale(1),
    paddingVertical: verticalScale(1),
    backgroundColor: '#f5f5f5',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    borderRadius: moderateScale(29),
    paddingHorizontal: scale(14),
  },
  searchIcon: { 
    marginRight: scale(8), 
    color: '#999' 
  },
  searchInput: {
    flex: 1,
    paddingVertical: verticalScale(12),
    fontSize: responsiveFontSize(11),
    fontWeight: '400',
    color: '#000',
    fontFamily: 'PoppinsRegular',
  },
  scrollView: { 
    flex: 1 
  },
  sectionHeader: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(8),
    marginTop: verticalScale(8),
    borderRadius: moderateScale(1),
    backgroundColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: responsiveFontSize(12),
    fontWeight: '400',
    color: '#666',
    backgroundColor: '#d0d0d0',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(3),
    borderRadius: moderateScale(29),
    marginHorizontal: verticalScale(-15),
    alignSelf: 'flex-start',
    fontFamily: 'PoppinsRegular',
    textAlign: 'center',
    
  },
  driverSectionTitle: {
    fontSize: responsiveFontSize(12),
    fontWeight: '400',
    color: '#fff',
    backgroundColor: '#000',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(2),
    borderRadius: moderateScale(29),
    alignSelf: 'flex-start',
    marginVertical: verticalScale(1),
    marginHorizontal: verticalScale(-15),
    fontFamily: 'PoppinsRegular',
    textAlign: 'center',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(12),
    marginBottom: 0,
    width: scale(348),
    height: verticalScale(54),
    minHeight: verticalScale(isTablet ? 60 : 54),
  },
  avatar: {
    width: moderateScale(42),
    height: moderateScale(63),
    borderRadius: moderateScale(21),
    marginRight: scale(12),
  },
  contactName: {
    fontSize: responsiveFontSize(15),
    fontWeight: '500',
    color: '#000',
    flex: 1,
    fontFamily: 'PoppinsMedium',
  },
});

export default NewChatModal;