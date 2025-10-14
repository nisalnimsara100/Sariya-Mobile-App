import React, { ReactElement, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Nav1 from '../assets/icons/chatss/Noti1.svg';
import Nav2 from '../assets/icons/chatss/Noti2.svg';

// Responsive scale utilities (same base as your Chat.tsx)
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const scale = (size: number) => (screenWidth / 375) * size;
const verticalScale = (size: number) => (screenHeight / 812) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;
const responsiveFontSize = (size: number) =>
  Math.max(size * (screenWidth / 375), size * 0.8);

interface NotificationItemType {
  icon: ReactElement;
  message: string;
  time: string;
  type: 'Normal' | 'Alert' | 'Emergency'; // for filtering tabs
}

interface NotificationSectionType {
  day: string;
  items: NotificationItemType[];
}

const allNotifications: NotificationSectionType[] = [
  {
    day: 'Today',
    items: [
      {
        icon: <Nav1 width={moderateScale(30)} height={moderateScale(30)} />,
        message: 'The children have been dropped off from school safely.',
        time: '07:15 AM',
        type: 'Normal',
      },
      {
        icon: <Nav2 width={moderateScale(30)} height={moderateScale(30)} />,
        message: 'There is an ongoing alert situation now.',
        time: '08:00 AM',
        type: 'Alert',
      },
    ],
  },
  {
    day: 'Yesterday',
    items: [
      {
        icon: <Nav1 width={moderateScale(30)} height={moderateScale(30)} />,
        message: 'The children have been dropped off from school safely.',
        time: '07:15 AM',
        type: 'Normal',
      },
      {
        icon: <Nav2 width={moderateScale(30)} height={moderateScale(30)} />,
        message: 'There was a past alert situation.',
        time: '08:00 AM',
        type: 'Alert',
      },
    ],
  },
];

const Tabs = [
  { label: 'Normal', color: '#236CFF' },
  { label: 'Alert', color: '#FF9137' },
  { label: 'Emergency', color: '#FF3939' },
];

const NotificationSectionHeader = ({ title }: { title: string }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionText}>{title}</Text>
  </View>
);

const NotificationItem = ({ item }: { item: NotificationItemType }) => (
  <View style={styles.notificationItemContainer}>
    <View style={styles.iconWrapper}>{item.icon}</View>
    <View style={styles.messageWrapper}>
      <Text style={styles.messageText}>{item.message}</Text>
    </View>
    <Text style={styles.timeText}>{item.time}</Text>
  </View>
);

const Notifications = () => {
  const [activeTab, setActiveTab] = useState<'Normal' | 'Alert' | 'Emergency'>(
    'Normal'
  );

  // Filter notifications to show all on Normal
  // For Alert and Emergency, show only Normal messages (one message)
  const filteredNotifications: NotificationSectionType[] =
    allNotifications.map((section) => {
      if (activeTab === 'Normal') {
        return section;
      }
      return {
        day: section.day,
        items: section.items.filter((item) => item.type === 'Normal'),
      };
    });

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {Tabs.map(({ label, color }) => (
          <TouchableOpacity
            key={label}
            style={[
              styles.tabButton,
              { backgroundColor: color },
              activeTab === label && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab(label as any)}
          >
            <Text style={styles.tabText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {filteredNotifications.map((section) => (
          <View key={section.day} style={styles.sectionWrapper}>
            <NotificationSectionHeader title={section.day} />
            {section.items.map((item, index) => (
              <NotificationItem key={index} item={item} />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: verticalScale(10),
    paddingLeft: scale(15),
  },
  tabButton: {
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(7),
    marginHorizontal: scale(4),
    elevation: 1,
    opacity: 0.7,
  },
  activeTabButton: {
    opacity: 1,
  },
  tabText: {
    fontFamily: 'poppins-regular',
    color: 'white',
    fontWeight: '400',
    fontSize: responsiveFontSize(13),
  },
  scrollContainer: { paddingHorizontal: 0 },
  sectionWrapper: { marginBottom: verticalScale(16) },
  sectionContainer: {
    marginLeft: scale(16),
    marginBottom: verticalScale(10),
  },
  sectionText: {
    fontFamily: 'poppins-regular',
    fontWeight: '600',
    fontSize: responsiveFontSize(17),
    color: '#000',
  },
  notificationItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    borderBottomWidth: 0.5,
    borderBottomColor: '#EAECF0',
  },
  iconWrapper: {
    backgroundColor: 'rgba(35, 220, 98, 0.1)',
    borderRadius: 50,
    width: moderateScale(60),
    height: moderateScale(60),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  messageWrapper: { flex: 1 },
  messageText: {
    fontFamily: 'poppins-regular',
    color: '#454545',
    fontSize: responsiveFontSize(15),
    fontWeight: '400',
    lineHeight: moderateScale(22),
  },
  timeText: {
    fontFamily: 'poppins-regular',
    fontWeight: '500',
    color: '#000',
    fontSize: responsiveFontSize(12),
    marginLeft: scale(6),
  },
});

export default Notifications;
