import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';

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

const ChatScreen = () => {
  const [inputFocused, setInputFocused] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Hey Nisal Nimsara?",
      isSent: true,
      time: "11:05 PM"
    },
    {
      id: '2',
      text: "I'm doing great, thanks for asking!",
      isSent: false,
      time: "11:06 PM"
    },
    {
      id: '3',
      text: "That's good to hear! I was wondering if you'd like to grab coffee sometime this week? I found a nice new place downtown.",
      isSent: true,
      time: "11:07 PM"
    },
    {
      id: '4',
      text: "Absolutely! I'd love to. How about Thursday afternoon? I'm free after 2 PM. The new place sounds interesting!",
      isSent: false,
      time: "11:08 PM"
    },
    {
      id: '5',
      text: "Hii i'm nethmi wijesinghe",
      isSent: false,
      time: "11:08 PM"
    },
    {
      id: '6',
      text: "👍",
      isSent: false,
      time: "11:10 PM"
    }
  ]);

  const scrollViewRef = useRef(null);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: message.trim(),
        isSent: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setMessage('');
      
      // Scroll to bottom after a short delay to ensure the message is rendered
      setTimeout(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }
      }, 100);
    }
  };

  const renderMessage = (msg) => {
    if (msg.isSent) {
      return (
        <View key={msg.id} style={styles.sentMessageContainer}>
          <View style={styles.sentMessageWrapper}>
            <View style={styles.sentBubble}>
              <Text style={styles.sentText}>{msg.text}</Text>
            </View>
            <Text style={styles.sentTimeBelow}>{msg.time}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View key={msg.id} style={styles.receivedMessageContainer}>
          <View style={styles.receivedMessageWrapper}>
            <View style={styles.receivedBubble}>
              <Text style={styles.receivedText}>{msg.text}</Text>
            </View>
            <Text style={styles.receivedTimeBelow}>{msg.time}</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.profileImageContainer}>
              <Text style={styles.profileInitial}></Text>
            </View>
            <View style={styles.headerText}>
              <Text style={styles.userName}>Nisal Nimsara</Text>
              <Text style={styles.status}>CBD-2207</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.phoneButton}>
            <Text style={styles.phoneIcon}>📞</Text>
          </TouchableOpacity>
        </View>

        {/* Date Header */}
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>Sun, Aug 26</Text>
        </View>

        {/* Chat Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map(renderMessage)}
        </ScrollView>

        {/* Message Input Container */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Message"
              placeholderTextColor="#999"
              value={message}
              onChangeText={setMessage}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              multiline
              maxLength={500}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <View style={styles.sendButtonWrapper}>
              {(inputFocused || message) && (
                <TouchableOpacity
                  style={[
                    styles.sendButton,
                    !message && styles.sendButtonDisabled,
                  ]}
                  onPress={handleSend}
                  disabled={!message}
                >
                  <Text style={styles.sendIcon}>↑</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Responsive Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: verticalScale(45),
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: '#333',
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
  },
  headerText: {
    marginLeft: scale(12),
    fontFamily: 'poppins-medium',
  },
  userName: {
    color: '#222',
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
  },
  status: {
    color: '#888',
    fontSize: responsiveFontSize(13),
    fontFamily: 'poppins-regular',
  },
  phoneButton: {
    padding: moderateScale(8),
  },
  phoneIcon: {
    fontSize: responsiveFontSize(21),
  },
  dateContainer: {
    alignItems: 'center',
    marginVertical: verticalScale(8),
  },
  dateText: {
    backgroundColor: '#ededed',
    paddingHorizontal: scale(18),
    paddingVertical: verticalScale(5),
    borderRadius: moderateScale(13),
    fontSize: responsiveFontSize(13),
    color: '#666',
  },
  chatContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
  },
  // Sent message container - ensures consistent right alignment
  sentMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: verticalScale(8),
    width: '100%',
  },
  sentMessageWrapper: {
    maxWidth: '90%',
    alignItems: 'flex-end',
  },
  // Received message container - ensures consistent left alignment
  receivedMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: verticalScale(8),
    width: '100%',
  },
  receivedMessageWrapper: {
    maxWidth: '90%',
    alignItems: 'flex-start',
  },
  receivedBubble: {
    backgroundColor: '#fff',
    paddingHorizontal: scale(17),
    paddingVertical: verticalScale(7),
    borderRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    borderBottomLeftRadius: moderateScale(6),
    borderBottomRightRadius: moderateScale(20),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(3),
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  receivedText: {
    fontSize: responsiveFontSize(16),
    color: '#000',
    flexShrink: 1,
    fontFamily: 'poppins-regular',
    fontWeight: '400',
  },
  receivedTimeBelow: {
    fontSize: responsiveFontSize(11),
    color: '#b2b2b2',
    marginLeft: scale(15),
    marginTop: verticalScale(2),
    marginBottom: verticalScale(2),
    textAlign: 'left',
  },
  sentBubble: {
    backgroundColor: '#297BE6',
    paddingHorizontal: scale(17),
    paddingVertical: verticalScale(7),
    borderRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(6),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(3),
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  sentText: {
    fontSize: responsiveFontSize(16),
    color: '#fff',
    flexShrink: 1,
    fontFamily: 'poppins-regular',
    fontWeight: '400',
  },
  sentTimeBelow: {
    fontSize: responsiveFontSize(11),
    color: '#b2b2b2',
    marginRight: scale(15),
    marginTop: verticalScale(2),
    marginBottom: verticalScale(2),
    textAlign: 'right',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ececec',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(10),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    minHeight: verticalScale(44),
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    borderRadius: moderateScale(25),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    paddingRight: scale(50),
    fontSize: responsiveFontSize(16),
    color: '#222',
    maxHeight: verticalScale(100),
    textAlignVertical: 'center',
    fontFamily: 'poppins-regular',
    fontWeight: '400',
  },
  sendButtonWrapper: {
    position: 'absolute',
    right: scale(8),
    bottom: verticalScale(8),
    width: moderateScale(32),
    height: moderateScale(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    backgroundColor: '#297BE6',
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(3),
    shadowOffset: { width: 0, height: 2 },
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  sendIcon: {
    fontSize: responsiveFontSize(16),
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatScreen;