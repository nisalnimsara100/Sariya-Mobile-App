import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from 'react-native';
import ChatPlus from '../assets/icons/chatss/Vector.svg';
import ChatNisal from '../assets/icons/chatss/Nisal.svg';
import ChatNethmi from '../assets/icons/chatss/Nethmi.svg';
import ChatAshen from '../assets/icons/chatss/Ashen.svg';
import ChatSearch from '../assets/icons/chatss/search-line.svg';
import ChatModal from '../components/NewChatModal'; 

interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
}

interface ChatSection {
  section?: string;
  section1?: string;
  data: ChatItem[];
}

const chatData: ChatSection[] = [
  {
    section1: 'Driver',
    data: [
      {
        id: '1',
        name: 'Nisal Nimsara',
        lastMessage: 'Ah...OK Miss',
        time: '12:28 PM',
        unread: 3,
        avatar: 'nisal',
      },
    ],
  },
  {
    section: 'Parents',
    data: [
      {
        id: '2',
        name: 'Nethmi Wijesinghe',
        lastMessage: 'You: Oya loku wadakda?',
        time: '12:15 PM',
        unread: 0,
        avatar: 'nethmi',
      },
      {
        id: '3',
        name: 'Sugath Palitha',
        lastMessage: 'You: Nan mama uyanawa kiri hodi.',
        time: '12:10 PM',
        unread: 0,
        avatar: 'ashen',
      },
      {
        id: '4',
        name: 'Nethmi Wijesinghe',
        lastMessage: 'You:Kiri hodda rasaida?',
        time: '12:15 PM',
        unread: 0,
        avatar: 'nethmi',
      },
      {
        id: '5',
        name: 'Sugath Palitha',
        lastMessage: 'You: Loku rasak na.',
        time: '12:10 PM',
        unread: 0,
        avatar: 'ashen',
      },
    ],
  },
];

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

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => (
  <View
    style={[
      styles.sectionContainer,
      title === 'Driver' ? styles.driverSection : styles.parentSection,
    ]}
  >
    <Text
      style={[
        styles.sectionText,
        title === 'Driver' ? styles.driverText : styles.parentText,
      ]}
    >
      {title}
    </Text>
  </View>
);

interface ChatItemProps {
  item: ChatItem;
}

const ChatItem: React.FC<ChatItemProps> = ({ item }) => (
  <View style={styles.chatItemContainer}>
    {item.avatar === 'nisal' ? (
      <ChatNisal
        width={styles.avatar.width}
        height={styles.avatar.height}
        style={styles.avatar}
      />
    ) : item.avatar === 'nethmi' ? (
      <ChatNethmi
        width={styles.avatar.width}
        height={styles.avatar.height}
        style={styles.avatar}
      />
    ) : item.avatar === 'ashen' ? (
      <ChatAshen
        width={styles.avatar.width}
        height={styles.avatar.height}
        style={styles.avatar}
      />
    ) : (
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
    )}
    <View style={styles.chatTextContainer}>
      <Text style={styles.chatName}>{item.name}</Text>
      <Text numberOfLines={isTablet ? 2 : 1} style={styles.chatLastMessage}>
        {item.lastMessage}
      </Text>
    </View>
    <View style={styles.chatRightContainer}>
      <Text style={styles.chatTime}>{item.time}</Text>
      {item.unread > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{item.unread}</Text>
        </View>
      )}
    </View>
  </View>
);

const Chat: React.FC = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchBoxContainer}>
        <View style={styles.searchBoxInner}>
          <ChatSearch
            width={moderateScale(20)}
            height={moderateScale(20)}
            style={styles.searchIcon}
          />
          <TextInput placeholder="Search Chats" style={styles.searchBox} />
        </View>
      </View>

      <FlatList
        data={chatData}
        keyExtractor={(section, index) =>
          section.section ? section.section : section.section1 ? section.section1 : `section-${index}`
        }
        renderItem={({ item: section }) => (
          <View>
            <SectionHeader title={section.section1 ?? section.section ?? 'Unknown'} />
            {section.data.map((chat) => (
              <ChatItem key={chat.id} item={chat} />
            ))}
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <ChatPlus width={moderateScale(26)} height={moderateScale(26)} />
      </TouchableOpacity>

      <ChatModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
};

// Responsive Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: verticalScale(50),
    paddingLeft: scale(16),
    paddingRight: scale(16),
    fontFamily: 'poppins',
  },
  searchBoxContainer: {
    marginHorizontal: scale(3),
    marginBottom: verticalScale(10),
    marginTop: verticalScale(-30),
  },
  searchBox: {
    flex: 1,
    backgroundColor: '#EBEBEB',
    borderRadius: moderateScale(20),
    height: verticalScale(40),
    paddingLeft: scale(2),
    fontSize: responsiveFontSize(14),
  },
  searchBoxInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBEBEB',
    borderRadius: moderateScale(20),
    paddingHorizontal: scale(10),
    height: verticalScale(40),
  },
  searchIcon: {
    marginRight: scale(8),
  },
  sectionContainer: {
    marginVertical: verticalScale(8),
    borderRadius: moderateScale(20),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    alignSelf: 'flex-start',
  },
  driverSection: {
    backgroundColor: '#000000',
  },
  parentSection: {
    backgroundColor: '#EBEBEB',
  },
  sectionText: {
    fontWeight: '600',
    fontSize: responsiveFontSize(14),
  },
  driverText: {
    color: '#FFFFFF',
  },
  parentText: {
    color: '#4C4C4C',
  },
  chatItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(1),
    minHeight: verticalScale(90),
  },
  avatar: {
    width: moderateScale(63),
    height: moderateScale(70),
    borderRadius: moderateScale(22),
    marginRight: scale(15),
  },
  chatTextContainer: {
    flex: 1,
    paddingRight: scale(10),
  },
  chatName: {
    fontWeight: '500',
    fontSize: responsiveFontSize(16),
    marginBottom: verticalScale(2),
  },
  chatLastMessage: {
    color: '#777',
    fontSize: responsiveFontSize(13),
    lineHeight: responsiveFontSize(18),
  },
  chatRightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    minHeight: moderateScale(50),
  },
  chatTime: {
    color: '#A8A8A8',
    fontSize: responsiveFontSize(12),
  },
  unreadBadge: {
    marginTop: verticalScale(5),
    backgroundColor: '#3B8DDD',
    borderRadius: moderateScale(11),
    minWidth: moderateScale(23),
    height: moderateScale(23),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(2),
  },
  unreadText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(13),
  },
  floatingButton: {
    position: 'absolute',
    bottom: verticalScale(40),
    right: scale(35),
    width: moderateScale(56),
    height: moderateScale(56),
    backgroundColor: '#328DFF',
    borderRadius: moderateScale(28),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Chat;