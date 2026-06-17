import React from 'react';
import {
  Search, Smile, Paperclip, Send, Mic, Check, CheckCheck,
  MoreVertical, Phone, Video, MessageSquare, Filter, User,
  Plus, X, Image, File, UserPlus, Info, Bot, Mail, ChevronDown,
  Archive, Trash2, Square, CheckSquare, Camera, Headphones, Clock,
  Timer, ListPlus, AlertTriangle, UserX, Eraser, XCircle,
  Copy, Star, Forward, Download, ArrowLeft, Menu, MinusCircle, Ban
} from 'lucide-react';
import { BrandIcon } from './BrandIcons';

export default function UnifiedInbox({ contacts, setContacts, automations, theme, showToast, integrations = [], setIntegrations, onChatSelectionChange, setSidebarOpen }) {
  const [selectedChatId, setSelectedChatId] = React.useState(null);
  const [avatarPreviewContact, setAvatarPreviewContact] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [inputText, setInputText] = React.useState('');
  const [filterUnread, setFilterUnread] = React.useState(false);
  const [showEmojiMenu, setShowEmojiMenu] = React.useState(false);
  const [showAttachMenu, setShowAttachMenu] = React.useState(false);
  const [isTypingSim, setIsTypingSim] = React.useState(false);
  const [showContactInfo, setShowContactInfo] = React.useState(false);
  const [filterPlatform, setFilterPlatform] = React.useState('all');
  const [filterStatus, setFilterStatus] = React.useState('all');
  const [showLeftHeaderMenu, setShowLeftHeaderMenu] = React.useState(false);
  const [selectMode, setSelectMode] = React.useState(false);
  const [selectedChatIds, setSelectedChatIds] = React.useState([]);
  const [showSelectionMenu, setShowSelectionMenu] = React.useState(false);
  const [showRightHeaderMenu, setShowRightHeaderMenu] = React.useState(false);
  const [selectMessagesMode, setSelectMessagesMode] = React.useState(false);
  const [selectedMessageIds, setSelectedMessageIds] = React.useState([]);
  const [showSearchSidebar, setShowSearchSidebar] = React.useState(false);
  const [chatSearchQuery, setChatSearchQuery] = React.useState('');
  const [showClearChatConfirm, setShowClearChatConfirm] = React.useState(false);
  const [showDeleteChatConfirm, setShowDeleteChatConfirm] = React.useState(false);
  const [showMorePlatforms, setShowMorePlatforms] = React.useState(false);
  const [showDisappearingSidebar, setShowDisappearingSidebar] = React.useState(false);
  const [disappearingDurations, setDisappearingDurations] = React.useState({});
  const [pendingDisappearingDuration, setPendingDisappearingDuration] = React.useState({});
  const [showCRMModal, setShowCRMModal] = React.useState(false);
  const [crmTag, setCrmTag] = React.useState('');
  const [showCustomInput, setShowCustomInput] = React.useState(false);
  const [customDurationValue, setCustomDurationValue] = React.useState('');
  const [selectedTagOption, setSelectedTagOption] = React.useState('Lead');
  const [customHour, setCustomHour] = React.useState('12');
  const [customMinute, setCustomMinute] = React.useState('00');
  const [customAmpm, setCustomAmpm] = React.useState('PM');
  const [isShaking, setIsShaking] = React.useState(false);
  const [showArchived, setShowArchived] = React.useState(false);

  const formatLastSeen = (str) => {
    if (!str) return 'recently';
    let formatted = str.replace(/\bat\b/g, 'At');
    formatted = formatted.replace(/\s*[AP]M\s*$/i, '');
    return formatted;
  };

  const emojiPickerRef = React.useRef(null);

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSpecialMoreMode = windowWidth >= 1225 && windowWidth <= 1410;

  React.useEffect(() => {
    const picker = emojiPickerRef.current;
    if (!picker) return;

    // Inject styling to hide skintone button and style the scrollbars
    if (picker.shadowRoot) {
      if (!picker.shadowRoot.querySelector('#picker-custom-styles')) {
        const style = document.createElement('style');
        style.id = 'picker-custom-styles';
        style.textContent = `
          #skintone-button,
          .skintone-button,
          [id*="skintone"],
          [class*="skintone"] {
            display: none !important;
          }
          
          /* Custom styled premium scrollbar for the picker panel */
          ::-webkit-scrollbar {
            width: 6px !important;
            height: 6px !important;
          }
          ::-webkit-scrollbar-track {
            background: transparent !important;
          }
          ::-webkit-scrollbar-thumb {
            background: #2a2a3e !important;
            border-radius: 10px !important;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #3f3f5a !important;
          }
          
          /* Firefox scrollbars */
          * {
            scrollbar-width: thin !important;
            scrollbar-color: #2a2a3e transparent !important;
          }
        `;
        picker.shadowRoot.appendChild(style);
      }
    }

    const handleEmojiClick = (e) => {
      if (e.detail && e.detail.unicode) {
        addEmoji(e.detail.unicode);
      }
    };

    picker.addEventListener('emoji-click', handleEmojiClick);
    return () => {
      picker.removeEventListener('emoji-click', handleEmojiClick);
    };
  }, [showEmojiMenu]);

  React.useEffect(() => {
    if (typeof onChatSelectionChange === 'function') {
      onChatSelectionChange(selectedChatId !== null);
    }
  }, [selectedChatId, onChatSelectionChange]);

  const toggleIntegration = (id) => {
    const item = integrations.find(i => i.id === id);
    if (!item) return;

    const nextConnected = !item.connected;

    if (typeof showToast === 'function') {
      showToast(
        `${item.name} has been ${nextConnected ? 'connected successfully' : 'disconnected'}!`,
        nextConnected ? 'success' : 'info'
      );
    }

    setIntegrations(prev => prev.map(integration => {
      if (integration.id === id) {
        return { ...integration, connected: nextConnected };
      }
      return integration;
    }));
  };

  const handleCopyMessages = () => {
    const activeChatMsgs = conversations[selectedChatId] || [];
    const textToCopy = activeChatMsgs
      .filter(m => selectedMessageIds.includes(m.id))
      .map(m => `[${m.time}] ${m.sentByMe ? 'Me' : selectedContact.name}: ${m.text}`)
      .join('\n');
    navigator.clipboard.writeText(textToCopy);
    if (typeof showToast === 'function') {
      showToast('Messages copied to clipboard', 'success');
    } else {
      alert('Copied to clipboard');
    }
    setSelectMessagesMode(false);
    setSelectedMessageIds([]);
  };

  const handleStarMessages = () => {
    if (typeof showToast === 'function') {
      showToast('Messages starred', 'success');
    } else {
      alert('Messages starred');
    }
    setSelectMessagesMode(false);
    setSelectedMessageIds([]);
  };

  const handleDeleteMessages = () => {
    setConversations(prev => {
      const activeChatMsgs = prev[selectedChatId] || [];
      const remaining = activeChatMsgs.filter(m => !selectedMessageIds.includes(m.id));
      return { ...prev, [selectedChatId]: remaining };
    });
    if (typeof showToast === 'function') {
      showToast('Messages deleted', 'success');
    } else {
      alert('Messages deleted');
    }
    setSelectMessagesMode(false);
    setSelectedMessageIds([]);
  };

  const handleForwardMessages = () => {
    if (typeof showToast === 'function') {
      showToast('Forwarding selected messages...', 'success');
    } else {
      alert('Forwarding selected messages...');
    }
    setSelectMessagesMode(false);
    setSelectedMessageIds([]);
  };

  const handleDownloadMessages = () => {
    const activeChatMsgs = conversations[selectedChatId] || [];
    const textToDownload = activeChatMsgs
      .filter(m => selectedMessageIds.includes(m.id))
      .map(m => `[${m.time}] ${m.sentByMe ? 'Me' : selectedContact.name}: ${m.text}`)
      .join('\n');
    const element = document.createElement("a");
    const file = new Blob([textToDownload], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `chat_export_${selectedContact.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    if (typeof showToast === 'function') {
      showToast('Messages exported successfully', 'success');
    }
    setSelectMessagesMode(false);
    setSelectedMessageIds([]);
  };

  const handleArchiveSelected = () => {
    if (selectedChatIds.length === 0) return;
    const isUnarchiving = contacts.find(c => selectedChatIds.includes(c.id))?.archived || false;
    setContacts(prev => {
      const updated = prev.map(c => {
        if (selectedChatIds.includes(c.id)) {
          return { ...c, archived: !isUnarchiving };
        }
        return c;
      });
      if (selectedChatIds.includes(selectedChatId)) {
        const remainingActive = updated.filter(c => !c.archived);
        if (remainingActive.length > 0) {
          setSelectedChatId(remainingActive[0].id);
        } else {
          setSelectedChatId(null);
        }
      }
      return updated;
    });
    if (isUnarchiving) {
      setShowArchived(false);
    }
    if (typeof showToast === 'function') {
      showToast(`${selectedChatIds.length} chat(s) ${isUnarchiving ? 'unarchived' : 'archived'} successfully!`, 'success');
    } else {
      alert(`${selectedChatIds.length} chat(s) ${isUnarchiving ? 'unarchived' : 'archived'}`);
    }
    setSelectMode(false);
    setSelectedChatIds([]);
    setShowSelectionMenu(false);
  };

  const handleDeleteSelected = () => {
    if (selectedChatIds.length === 0) return;
    setContacts(prev => {
      const remaining = prev.filter(c => !selectedChatIds.includes(c.id));
      if (selectedChatIds.includes(selectedChatId) && remaining.length > 0) {
        setSelectedChatId(remaining[0].id);
      }
      return remaining;
    });
    if (typeof showToast === 'function') {
      showToast(`${selectedChatIds.length} chat(s) deleted successfully!`, 'success');
    } else {
      alert(`${selectedChatIds.length} chat(s) deleted`);
    }
    setSelectMode(false);
    setSelectedChatIds([]);
    setShowSelectionMenu(false);
  };

  const handleMarkAsReadSelected = () => {
    if (selectedChatIds.length === 0) return;
    setContacts(prev => prev.map(c => {
      if (selectedChatIds.includes(c.id)) {
        return { ...c, unreadCount: 0 };
      }
      return c;
    }));
    if (typeof showToast === 'function') {
      showToast(`${selectedChatIds.length} chat(s) marked as read`, 'success');
    }
    setSelectMode(false);
    setSelectedChatIds([]);
    setShowSelectionMenu(false);
  };

  // Individual conversations database linked by contact ID
  const [conversations, setConversations] = React.useState({
    1: [
      { id: 101, text: "Hi, I have a question about your product catalog.", sentByMe: false, time: "10:30 AM", status: "read" },
      { id: 102, text: "Hello! Sure, I'd be happy to help you with that.", sentByMe: true, time: "10:32 AM", status: "read" },
      { id: 103, text: "Thanks! I'm specifically interested in the premium plan.", sentByMe: false, time: "10:33 AM", status: "read" },
      { id: 104, text: "Great choice! Here's the link to get started: chathub.com/pricing", sentByMe: true, time: "10:35 AM", status: "read" }
    ],
    2: [
      { id: 201, text: "Can you please help me reset my account password?", sentByMe: false, time: "09:15 AM", status: "read" },
      { id: 202, text: "Sure thing. Please verify your billing email address.", sentByMe: true, time: "09:17 AM", status: "read" },
      { id: 203, text: "My billing email is sarah.j@example.com", sentByMe: false, time: "09:20 AM", status: "read" }
    ],
    3: [
      { id: 301, text: "I want to request a refund for the extra seat.", sentByMe: false, time: "Yesterday", status: "read" },
      { id: 302, text: "Let me check that with our billing team. One moment.", sentByMe: true, time: "Yesterday", status: "read" }
    ],
    4: [
      { id: 401, text: "Thanks for the quick onboarding session!", sentByMe: false, time: "Yesterday", status: "read" },
      { id: 402, text: "You are very welcome! Let us know if you need anything else.", sentByMe: true, time: "Yesterday", status: "read" }
    ],
    5: [
      { id: 501, text: "When will my order ship out?", sentByMe: false, time: "2 days ago", status: "read" }
    ]
  });

  // Active chat profile details
  const selectedContact = contacts.find(c => c.id === selectedChatId) || contacts[0];
  const activeMessages = conversations[selectedChatId] || [];

  // Scroll to bottom of message list on updates
  const messagesEndRef = React.useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  React.useEffect(() => {
    scrollToBottom();
  }, [activeMessages, isTypingSim]);

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (showLeftHeaderMenu && !e.target.closest('.left-header-menu-container')) {
        setShowLeftHeaderMenu(false);
      }
      if (showSelectionMenu && !e.target.closest('.selection-menu-container')) {
        setShowSelectionMenu(false);
      }
      if (showAttachMenu && !e.target.closest('.plus-menu-container')) {
        setShowAttachMenu(false);
      }
      if (showEmojiMenu && !e.target.closest('.emoji-menu-container')) {
        setShowEmojiMenu(false);
      }
      if (showRightHeaderMenu && !e.target.closest('.right-header-menu-container')) {
        setShowRightHeaderMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showLeftHeaderMenu, showSelectionMenu, showAttachMenu, showEmojiMenu, showRightHeaderMenu]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const myTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage = {
      id: Date.now(),
      text: inputText,
      sentByMe: true,
      time: myTime,
      status: 'offline' // Starts with clock icon (simulating sending/local offline state)
    };

    // 1. Add message locally
    setConversations(prev => ({
      ...prev,
      [selectedChatId]: [...(prev[selectedChatId] || []), newMessage]
    }));

    const textSent = inputText;
    setInputText('');
    setShowEmojiMenu(false);
    setShowAttachMenu(false);

    // 2. Animate delivery ticks: offline (clock) -> sent (single check) -> delivered (double check) -> read (blue double check)
    setTimeout(() => {
      setConversations(prev => {
        const chatMsgs = [...(prev[selectedChatId] || [])];
        const msgIdx = chatMsgs.findIndex(m => m.id === newMessage.id);
        if (msgIdx !== -1) {
          chatMsgs[msgIdx] = { ...chatMsgs[msgIdx], status: 'sent' };
        }
        return { ...prev, [selectedChatId]: chatMsgs };
      });
    }, 600);

    setTimeout(() => {
      setConversations(prev => {
        const chatMsgs = [...(prev[selectedChatId] || [])];
        const msgIdx = chatMsgs.findIndex(m => m.id === newMessage.id);
        if (msgIdx !== -1) {
          chatMsgs[msgIdx] = { ...chatMsgs[msgIdx], status: 'delivered' };
        }
        return { ...prev, [selectedChatId]: chatMsgs };
      });
    }, 1400);

    setTimeout(() => {
      setConversations(prev => {
        const chatMsgs = [...(prev[selectedChatId] || [])];
        const msgIdx = chatMsgs.findIndex(m => m.id === newMessage.id);
        if (msgIdx !== -1) {
          chatMsgs[msgIdx] = { ...chatMsgs[msgIdx], status: 'read' };
        }
        return { ...prev, [selectedChatId]: chatMsgs };
      });
    }, 2200);

    // 3. Trigger Simulated Bot response
    setIsTypingSim(true);
    setTimeout(() => {
      setIsTypingSim(false);
      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // Determine response content
      let replyText = `Thanks for your message! Our agent will review this shortly.`;

      // If automations are active
      const welcomeActive = automations.find(a => a.id === 1)?.active;
      const awayActive = automations.find(a => a.id === 2)?.active;

      if (awayActive) {
        replyText = automations.find(a => a.id === 2).triggerText || "We are currently closed. We will reply as soon as we reopen.";
      } else if (welcomeActive && activeMessages.length <= 1) {
        replyText = automations.find(a => a.id === 1).triggerText || `Hi ${selectedContact.name}, welcome to ChatHub! How can we help you?`;
      } else {
        // Keyword-based custom triggers from user's custom automation lists
        const matchedAutomation = automations.find(auto =>
          auto.keyword && textSent.toLowerCase().includes(auto.keyword.toLowerCase()) && auto.active
        );
        if (matchedAutomation) {
          replyText = matchedAutomation.triggerText;
        } else {
          // Dynamic friendly replies
          if (textSent.toLowerCase().includes('price') || textSent.toLowerCase().includes('cost')) {
            replyText = `Our plans start at $19/month. You can view all pricing details on our Landing Page. Let me know if you have questions!`;
          } else if (textSent.toLowerCase().includes('hello') || textSent.toLowerCase().includes('hi')) {
            replyText = `Hello! How can I assist you today?`;
          } else {
            replyText = `Understood. I've logged your request: "${textSent}". An agent will reply to you soon.`;
          }
        }
      }

      const botMessage = {
        id: Date.now() + 1,
        text: replyText,
        sentByMe: false,
        time: botTime,
        status: 'read'
      };

      setConversations(prev => ({
        ...prev,
        [selectedChatId]: [...(prev[selectedChatId] || []), botMessage]
      }));

      // Update contact's last message in the contact sidebar
      setContacts(prev => prev.map(c => {
        if (c.id === selectedChatId) {
          return { ...c, lastMsg: replyText.substring(0, 30) + (replyText.length > 30 ? '...' : ''), unreadCount: 0 };
        }
        return c;
      }));

    }, 2500);

    // Clear unread counts for current chat
    setContacts(prev => prev.map(c => {
      if (c.id === selectedChatId) {
        return { ...c, unreadCount: 0 };
      }
      return c;
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Add emoji helper
  const addEmoji = (emoji) => {
    setInputText(prev => prev + emoji);
  };

  // Filter and search chats
  const filteredChats = contacts.filter(chat => {
    if (chat.archived) return false;
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMsg.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPlatform = filterPlatform === 'all' || chat.channel === filterPlatform;

    let matchesStatus = true;
    if (filterStatus === 'online') {
      matchesStatus = chat.online;
    } else if (filterStatus === 'offline') {
      matchesStatus = !chat.online;
    } else if (filterStatus === 'unread') {
      matchesStatus = chat.unreadCount > 0;
    }

    const matchesUnread = filterUnread ? chat.unreadCount > 0 : true;
    return matchesSearch && matchesPlatform && matchesStatus && matchesUnread;
  });

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '350px 1fr',
      height: '100vh',
      borderRadius: '0px',
      overflow: 'hidden',
      border: 'none',
      backgroundColor: 'var(--bg-secondary)',
      transition: 'var(--transition)'
    }} className={`inbox-layout ${selectedChatId ? 'chat-selected' : ''}`}>

      {/* 1. LEFT SIDEBAR (Chats List) */}
      <div className="inbox-sidebar" style={{
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-secondary)',
        minHeight: 0,
        height: '100%'
      }}>
        {/* Left header */}
        <div style={{
          padding: '14px 16px',
          backgroundColor: 'var(--bg-tertiary)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {setSidebarOpen && (
              <button
                onClick={(e) => { e.stopPropagation(); setSidebarOpen(true); }}
                className="inbox-menu-btn"
                style={{
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '50%',
                  transition: 'background-color 0.2s ease',
                  border: 'none',
                  background: 'none'
                }}
              >
                <Menu size={20} />
              </button>
            )}
            <span style={{ fontSize: '1.6rem', fontWeight: '800', fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Inbox</span>
          </div>

          <div style={{ display: 'flex', gap: '8px', position: 'relative' }}>
            <button
              onClick={(e) => { e.stopPropagation(); setShowLeftHeaderMenu(!showLeftHeaderMenu); }}
              className="header-action-btn"
              title="Inbox Options"
            >
              <MoreVertical size={18} />
            </button>

            {showLeftHeaderMenu && (
              <div className="glass-panel left-header-menu-container" style={{
                position: 'absolute',
                top: '40px',
                right: '0',
                borderRadius: '8px',
                padding: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 100,
                width: '180px',
                border: '1px solid var(--border-color)',
                animation: 'fadeIn 0.2s ease',
                backgroundColor: 'var(--bg-tertiary)'
              }} onClick={(e) => e.stopPropagation()}>
                <button
                  disabled={selectMode}
                  onClick={() => {
                    setSelectMode(true);
                    setSelectedChatIds([]);
                    setShowLeftHeaderMenu(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    textAlign: 'left',
                    width: '100%',
                    color: 'var(--text-primary)',
                    opacity: selectMode ? 0.5 : 1,
                    cursor: selectMode ? 'not-allowed' : 'pointer',
                    pointerEvents: selectMode ? 'none' : 'auto'
                  }}
                  className="dropdown-item-btn"
                >
                  <CheckSquare size={16} style={{ color: 'var(--text-secondary)' }} />
                  <span>Select Chats</span>
                </button>
                <button
                  onClick={() => {
                    if (selectMode) {
                      setIsShaking(true);
                      setTimeout(() => setIsShaking(false), 500);
                    }
                    setContacts(prev => prev.map(c => ({ ...c, unreadCount: 0 })));
                    if (typeof showToast === 'function') {
                      showToast('All messages marked as read', 'success');
                    } else {
                      alert('All messages marked as read');
                    }
                    setShowLeftHeaderMenu(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    textAlign: 'left',
                    width: '100%',
                    color: 'var(--text-primary)'
                  }}
                  className="dropdown-item-btn"
                >
                  <CheckCheck size={16} style={{ color: 'var(--text-secondary)' }} />
                  <span>Mark All As Read</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {selectMode ? (
          <div style={{
            padding: '0 20px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-tertiary)',
            height: '50px',
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                onClick={() => {
                  setSelectMode(false);
                  setSelectedChatIds([]);
                  setShowSelectionMenu(false);
                }}
                className="header-action-btn"
                title="Cancel selection"
              >
                <X size={20} />
              </button>
              <span style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                {selectedChatIds.length} selected
              </span>
            </div>

            <div style={{ position: 'relative' }}>
              <button
                disabled={selectedChatIds.length === 0}
                onClick={(e) => { e.stopPropagation(); setShowSelectionMenu(!showSelectionMenu); }}
                className="header-action-btn"
                title="Selection options"
                style={{
                  opacity: selectedChatIds.length === 0 ? 0.4 : 1,
                  pointerEvents: selectedChatIds.length === 0 ? 'none' : 'auto',
                  cursor: selectedChatIds.length === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                <MoreVertical size={20} />
              </button>

              {showSelectionMenu && selectedChatIds.length > 0 && (() => {
                const hasUnreadSelected = contacts.some(c => selectedChatIds.includes(c.id) && c.unreadCount > 0);
                return (
                  <div className="glass-panel selection-menu-container" style={{
                    position: 'absolute',
                    top: '40px',
                    right: '0',
                    borderRadius: '8px',
                    padding: '4px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    boxShadow: 'var(--shadow-lg)',
                    zIndex: 100,
                    width: '180px',
                    border: '1px solid var(--border-color)',
                    animation: 'fadeIn 0.2s ease',
                    backgroundColor: 'var(--bg-tertiary)'
                  }} onClick={(e) => e.stopPropagation()}>
                    <button
                      disabled={!hasUnreadSelected}
                      onClick={handleMarkAsReadSelected}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '5px 8px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        textAlign: 'left',
                        width: 'calc(100% - 2px)',
                        margin: '0 auto',
                        color: 'var(--text-primary)',
                        cursor: hasUnreadSelected ? 'pointer' : 'not-allowed',
                        opacity: hasUnreadSelected ? 1 : 0.4,
                        pointerEvents: hasUnreadSelected ? 'auto' : 'none'
                      }}
                      className="dropdown-item-btn"
                    >
                      <CheckCheck size={13} style={{ color: 'var(--text-secondary)' }} />
                      <span>Mark as read</span>
                    </button>

                    <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '2px 2px' }} />

                    <button
                      onClick={handleArchiveSelected}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '5px 8px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        textAlign: 'left',
                        width: 'calc(100% - 2px)',
                        margin: '0 auto',
                        color: 'var(--text-primary)',
                        cursor: 'pointer'
                      }}
                      className="dropdown-item-btn"
                    >
                      <Archive size={13} style={{ color: 'var(--text-secondary)' }} />
                      <span>{selectedChatIds.length > 0 && contacts.find(c => selectedChatIds.includes(c.id))?.archived ? 'Unarchive Chat' : 'Archive Chat'}</span>
                    </button>

                    <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '2px 2px' }} />

                    <button
                      onClick={() => {
                        setSelectedChatIds([]);
                        setShowSelectionMenu(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '5px 8px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        textAlign: 'left',
                        width: 'calc(100% - 2px)',
                        margin: '0 auto',
                        color: 'var(--danger)',
                        cursor: 'pointer'
                      }}
                      className="dropdown-item-btn danger-action-btn"
                    >
                      <MinusCircle size={13} style={{ color: 'var(--danger)' }} />
                      <span>Clear Selected Chats</span>
                    </button>

                    <button
                      onClick={handleDeleteSelected}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '5px 8px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        textAlign: 'left',
                        width: 'calc(100% - 2px)',
                        margin: '0 auto',
                        color: 'var(--danger)',
                        cursor: 'pointer'
                      }}
                      className="dropdown-item-btn danger-action-btn"
                    >
                      <Trash2 size={13} style={{ color: 'var(--danger)' }} />
                      <span>Delete Chats</span>
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        ) : (
          <>
            {/* Search */}
            <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '8px' }}>
              <div style={{
                position: 'relative',
                flex: 1
              }}>
                <input
                  type="text"
                  placeholder="Search or start new chat..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 36px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-tertiary)',
                    fontSize: '0.85rem',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                />
                <Search size={16} style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }} />
              </div>
            </div>

            {/* Filters dropdown row (All Platforms / All Status) */}
            <div style={{
              padding: '10px 14px',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              gap: '12px',
              backgroundColor: 'var(--bg-secondary)'
            }}>
              {/* Platform filter dropdown */}
              <div style={{ position: 'relative', flex: 1, display: 'flex' }}>
                <select
                  value={filterPlatform}
                  onChange={(e) => setFilterPlatform(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 28px 8px 12px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-tertiary)',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    outline: 'none'
                  }}
                >
                  <option value="all">All Platforms</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Telegram">Telegram</option>
                  <option value="Messenger">Messenger</option>
                </select>
                <ChevronDown size={14} style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-secondary)',
                  pointerEvents: 'none'
                }} />
              </div>

              {/* Status filter dropdown */}
              <div style={{ position: 'relative', flex: 1, display: 'flex' }}>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 28px 8px 12px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-tertiary)',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    outline: 'none'
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="unread">Unread</option>
                </select>
                <ChevronDown size={14} style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-secondary)',
                  pointerEvents: 'none'
                }} />
              </div>
            </div>
          </>
        )}

        {/* Contacts / Chats Scrollable list */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {(() => {
            const archivedChats = contacts.filter(chat => {
              if (!chat.archived) return false;
              const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                chat.lastMsg.toLowerCase().includes(searchQuery.toLowerCase());
              const matchesPlatform = filterPlatform === 'all' || chat.channel === filterPlatform;
              return matchesSearch && matchesPlatform;
            });
            return contacts.some(c => c.archived) && (
              <>
                <div
                  onClick={() => setShowArchived(prev => !prev)}
                  style={{
                    margin: '0px',
                    padding: '6px 16px',
                    borderRadius: '0px',
                    borderLeft: 'none',
                    borderRight: 'none',
                    borderTop: 'none',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'var(--bg-tertiary)',
                    fontSize: '0.76rem',
                    fontWeight: '600',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    boxShadow: 'none',
                    animation: 'fadeIn 0.2s ease',
                    transition: 'background-color 0.2s ease',
                    position: 'relative',
                    height: '32px'
                  }}
                  className="archived-header-row"
                >
                  {showArchived ? (
                    <>
                      <div style={{ position: 'absolute', left: '16px', display: 'flex', alignItems: 'center' }}>
                        <ArrowLeft size={14} style={{ color: 'var(--text-secondary)' }} />
                      </div>
                      <div style={{ margin: '0 auto', textAlign: 'center', width: '100%', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                        <Archive size={14} />
                        Archived Chats
                      </div>
                    </>
                  ) : (
                    <div style={{ margin: '0 auto', textAlign: 'center', width: '100%', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                      <Archive size={14} />
                      Archived Chats
                    </div>
                  )}
                </div>

                {showArchived && (
                  <div>
                    {archivedChats.length > 0 ? (
                      archivedChats.map(chat => {
                        const isActive = chat.id === selectedChatId;
                        const isSelected = selectedChatIds.includes(chat.id);
                        return (
                          <div
                            key={chat.id}
                            onClick={() => {
                              if (selectMode) {
                                setSelectedChatIds(prev =>
                                  prev.includes(chat.id) ? prev.filter(id => id !== chat.id) : [...prev, chat.id]
                                );
                              } else {
                                setSelectedChatId(chat.id);
                                setSelectMessagesMode(false);
                                setSelectedMessageIds([]);
                                setShowContactInfo(false);
                                setShowSearchSidebar(false);
                                setShowDisappearingSidebar(false);
                                setChatSearchQuery('');
                                setContacts(prev => prev.map(c => {
                                  if (c.id === chat.id) return { ...c, unreadCount: 0 };
                                  return c;
                                }));
                              }
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              padding: '12px 16px',
                              cursor: 'pointer',
                              backgroundColor: selectMode ? (isSelected ? 'rgba(99, 102, 241, 0.08)' : 'transparent') : (isActive ? 'var(--bg-tertiary)' : 'transparent'),
                              borderBottom: '1px solid var(--border-color)',
                              transition: 'var(--transition)',
                              opacity: 0.85
                            }}
                            className={`chat-item-row ${isShaking ? 'shake-animation' : ''}`}
                          >
                            {selectMode && (
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: isSelected ? 'var(--primary)' : 'var(--text-muted)',
                                  cursor: 'pointer',
                                  flexShrink: 0
                                }}
                              >
                                {isSelected ? (
                                  <CheckSquare size={20} />
                                ) : (
                                  <Square size={20} />
                                )}
                              </div>
                            )}

                            {/* Chat Avatar with platform brand icon badge */}
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                setAvatarPreviewContact(chat);
                              }}
                              className="chat-avatar-clickable"
                              style={{ position: 'relative', flexShrink: 0, cursor: 'pointer' }}
                            >
                              <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--primary-light)',
                                color: 'var(--primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                fontSize: '1.1rem'
                              }}>
                                {chat.name[0]}
                              </div>
                              <div style={{
                                position: 'absolute',
                                bottom: '-3px',
                                right: '-3px',
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '2px solid var(--bg-secondary)',
                                backgroundColor: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <BrandIcon
                                  name={chat.channel}
                                  style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                                />
                              </div>
                            </div>

                            {/* Chat Text Details */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                <h4 style={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {chat.name}
                                  <span style={{ fontSize: '0.65rem', fontWeight: '500', color: 'var(--text-secondary)', backgroundColor: 'var(--border-color)', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px' }}>Archived</span>
                                </h4>
                                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                  {chat.time}
                                </span>
                              </div>

                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{
                                  fontSize: '0.8rem',
                                  color: 'var(--text-secondary)',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  marginRight: '8px'
                                }}>
                                  {chat.lastMsg}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        No archived chats match search
                      </div>
                    )}
                  </div>
                )}
              </>
            );
          })()}
          {!showArchived && (
            filteredChats.length > 0 ? (
              filteredChats.map(chat => {
                const isActive = chat.id === selectedChatId;
                const isSelected = selectedChatIds.includes(chat.id);
                return (
                  <div
                    key={chat.id}
                    onClick={() => {
                      if (selectMode) {
                        setSelectedChatIds(prev =>
                          prev.includes(chat.id) ? prev.filter(id => id !== chat.id) : [...prev, chat.id]
                        );
                      } else {
                        setSelectedChatId(chat.id);
                        setSelectMessagesMode(false);
                        setSelectedMessageIds([]);
                        setShowContactInfo(false);
                        setShowSearchSidebar(false);
                        setShowDisappearingSidebar(false);
                        setChatSearchQuery('');
                        // Clear unread indicator
                        setContacts(prev => prev.map(c => {
                          if (c.id === chat.id) return { ...c, unreadCount: 0 };
                          return c;
                        }));
                      }
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      cursor: 'pointer',
                      backgroundColor: selectMode ? (isSelected ? 'rgba(99, 102, 241, 0.08)' : 'transparent') : (isActive ? 'var(--bg-tertiary)' : 'transparent'),
                      borderBottom: '1px solid var(--border-color)',
                      transition: 'var(--transition)'
                    }}
                    className={`chat-item-row ${isShaking ? 'shake-animation' : ''}`}
                  >
                    {selectMode && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isSelected ? 'var(--primary)' : 'var(--text-muted)',
                          cursor: 'pointer',
                          flexShrink: 0
                        }}
                      >
                        {isSelected ? (
                          <CheckSquare size={20} />
                        ) : (
                          <Square size={20} />
                        )}
                      </div>
                    )}

                    {/* Chat Avatar with platform brand icon badge */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setAvatarPreviewContact(chat);
                      }}
                      className="chat-avatar-clickable"
                      style={{ position: 'relative', flexShrink: 0, cursor: 'pointer' }}
                    >
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--primary-light)',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '1.1rem'
                      }}>
                        {chat.name[0]}
                      </div>
                      {/* Online indicator dot on avatar - top right */}
                      {chat.online && (
                        <div style={{
                          position: 'absolute',
                          top: '0px',
                          right: '-1px',
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: '#10b981',
                          border: '2px solid var(--bg-secondary)',
                          boxShadow: '0 0 0 2px rgba(16,185,129,0.2)',
                          zIndex: 2
                        }} />
                      )}
                      {/* Platform brand icon badge - bottom right */}
                      <div style={{
                        position: 'absolute',
                        bottom: '-3px',
                        right: '-3px',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '2px solid var(--bg-secondary)',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
                        backgroundColor: chat.channel === 'WhatsApp' ? '#25d366' : chat.channel === 'Telegram' ? '#229ed9' : chat.channel === 'Instagram' ? '#e1306c' : '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <BrandIcon
                          name={chat.channel}
                          style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                        />
                      </div>
                    </div>

                    {/* Chat Text Details */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {chat.name}
                        </h4>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          {chat.time}
                        </span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{
                          fontSize: '0.8rem',
                          color: chat.unreadCount > 0 ? 'var(--text-primary)' : 'var(--text-secondary)',
                          fontWeight: chat.unreadCount > 0 ? '600' : '400',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          marginRight: '8px'
                        }}>
                          {chat.lastMsg}
                        </p>

                        {chat.unreadCount > 0 && (
                          <span style={{
                            backgroundColor: '#10b981',
                            color: '#ffffff',
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                            borderRadius: '50%',
                            minWidth: '18px',
                            height: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2px'
                          }}>
                            {chat.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <MessageSquare size={36} style={{ marginBottom: '10px', opacity: 0.5 }} />
                <p style={{ fontSize: '0.85rem' }}>No conversations found</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* 2. RIGHT PANEL (Active chat screen) */}
      <div className="inbox-right-panel" style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'var(--bg-primary)',
        position: 'relative',
        minHeight: 0,
        height: '100%',
        width: '100%'
      }}>
        {!selectedChatId ? (
          <div
            className="inbox-connect-placeholder"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'var(--bg-primary)',
              padding: '32px 24px',
              overflowY: 'auto',
              height: '100%',
              boxSizing: 'border-box'
            }}
          >
            {/* Header section */}
            <div className="integrations-inbox-header" style={{
              textAlign: 'center',
              marginBottom: '28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
              animation: 'fadeIn 0.4s ease'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                borderRadius: '99px',
                fontSize: '0.78rem',
                fontWeight: '700',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                <Bot size={14} />
                <span>Channels Ecosystem</span>
              </div>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: '800',
                background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '2px'
              }}>
                Connect Your Favorite Platforms
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', fontSize: '0.88rem', lineHeight: '1.45', margin: '0 auto' }}>
                Integrate chat networks in just one click to sync conversations. Run multiple channels in a single screen.
              </p>
            </div>

            {/* Grid of integrations */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isSpecialMoreMode ? 'repeat(3, 1fr)' : 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '16px',
              maxWidth: '880px',
              margin: '0 auto',
              width: '100%',
              animation: 'fadeIn 0.5s ease'
            }} className="integrations-inbox-grid">
              {!showMorePlatforms ? (
                <>
                  {integrations
                    .filter((item) => {
                      if (isSpecialMoreMode) {
                        return item.name !== 'X/Twitter' && item.name !== 'TikTok' && item.name !== 'Messenger' && item.name !== 'Discord';
                      }
                      return item.name !== 'X/Twitter' && item.name !== 'TikTok';
                    })
                    .map((item) => (
                      <div key={item.id} className="glass-panel integration-inbox-card" style={{
                        padding: '20px 14px',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '12px',
                        textAlign: 'center',
                        border: item.connected ? '1.5px solid var(--success)' : '1px solid var(--border-color)',
                        transition: 'var(--transition)',
                        backgroundColor: 'var(--bg-secondary)',
                        position: 'relative'
                      }}>
                        {/* Brand logo */}
                        <div style={{
                          width: '46px',
                          height: '46px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }} className="brand-logo-container">
                          <BrandIcon name={item.name} style={{ width: '100%', height: '100%', borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }} />
                        </div>

                        {/* Info details */}
                        <div>
                          <h4 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-primary)' }}>{item.name}</h4>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{item.connected ? 'Connected' : 'Disconnected'}</p>
                        </div>

                        {/* Toggle connection button */}
                        <button
                          onClick={() => toggleIntegration(item.id)}
                          className="btn"
                          style={{
                            padding: '6px 12px',
                            fontSize: '0.75rem',
                            borderRadius: '99px',
                            backgroundColor: item.connected ? 'rgba(16, 185, 129, 0.1)' : 'var(--primary-light)',
                            color: item.connected ? 'var(--success)' : 'var(--primary)',
                            fontWeight: '700',
                            border: 'none',
                            width: '100%',
                            transition: 'var(--transition)'
                          }}
                        >
                          {item.connected ? 'Connected' : 'Connect'}
                        </button>
                      </div>
                    ))}

                  {/* More Button Card */}
                  <div
                    onClick={() => setShowMorePlatforms(true)}
                    className="glass-panel integration-inbox-card more-platforms-btn-card"
                    style={{
                      padding: '20px 14px',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      textAlign: 'center',
                      border: '1.5px dashed var(--primary)',
                      transition: 'var(--transition)',
                      backgroundColor: 'var(--bg-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary-light)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.3s ease'
                    }} className="brand-logo-container">
                      <Plus size={22} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--primary)' }}>More</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>Remaining channels</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {integrations
                    .filter((item) => {
                      if (isSpecialMoreMode) {
                        return item.name === 'X/Twitter' || item.name === 'TikTok' || item.name === 'Messenger' || item.name === 'Discord';
                      }
                      return item.name === 'X/Twitter' || item.name === 'TikTok';
                    })
                    .map((item) => (
                      <div key={item.id} className="glass-panel integration-inbox-card" style={{
                        padding: '20px 14px',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '12px',
                        textAlign: 'center',
                        border: item.connected ? '1.5px solid var(--success)' : '1px solid var(--border-color)',
                        transition: 'var(--transition)',
                        backgroundColor: 'var(--bg-secondary)',
                        position: 'relative'
                      }}>
                        {/* Brand logo */}
                        <div style={{
                          width: '46px',
                          height: '46px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }} className="brand-logo-container">
                          <BrandIcon name={item.name} style={{ width: '100%', height: '100%', borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }} />
                        </div>

                        {/* Info details */}
                        <div>
                          <h4 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-primary)' }}>{item.name}</h4>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{item.connected ? 'Connected' : 'Disconnected'}</p>
                        </div>

                        {/* Toggle connection button */}
                        <button
                          onClick={() => toggleIntegration(item.id)}
                          className="btn"
                          style={{
                            padding: '6px 12px',
                            fontSize: '0.75rem',
                            borderRadius: '99px',
                            backgroundColor: item.connected ? 'rgba(16, 185, 129, 0.1)' : 'var(--primary-light)',
                            color: item.connected ? 'var(--success)' : 'var(--primary)',
                            fontWeight: '700',
                            border: 'none',
                            width: '100%',
                            transition: 'var(--transition)'
                          }}
                        >
                          {item.connected ? 'Connected' : 'Connect'}
                        </button>
                      </div>
                    ))}

                  {/* Back Button Card */}
                  <div
                    onClick={() => setShowMorePlatforms(false)}
                    className="glass-panel integration-inbox-card back-platforms-btn-card"
                    style={{
                      padding: '20px 14px',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      textAlign: 'center',
                      border: '1px solid var(--border-color)',
                      transition: 'var(--transition)',
                      backgroundColor: 'var(--bg-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.3s ease'
                    }} className="brand-logo-container">
                      <ArrowLeft size={22} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-primary)' }}>Back</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>Return to main view</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <style>{`
              .integration-inbox-card {
                transition: border-color 0.2s ease, box-shadow 0.2s ease;
              }
              .integration-inbox-card:hover {
                border-color: var(--primary);
                box-shadow: var(--shadow-lg);
              }
              .integration-inbox-card:hover .brand-logo-container {
                transform: scale(1.08);
              }
              @media (max-width: 768px) {
                .integrations-inbox-header {
                  display: none !important;
                }
              }
              @media (max-width: 1225px) {
                .inbox-connect-placeholder {
                  background-color: #000000 !important;
                }
                .inbox-connect-placeholder > * {
                  display: none !important;
                }
              }
            `}</style>
          </div>
        ) : (
          <>
            {/* Main Chat Column */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              minWidth: 0,
              height: '100%',
              position: 'relative',
              borderRight: showContactInfo ? '1px solid var(--border-color)' : 'none'
            }}>
              {/* Chat header */}
              <div
                onClick={(e) => {
                  if (e.target.closest('button')) return;
                  if (e.target.closest('.profile-trigger') || window.innerWidth <= 700) {
                    setShowContactInfo(true);
                    setShowSearchSidebar(false);
                  }
                }}
                className="chat-header-clickable-mobile"
                style={{
                  padding: '8px 20px',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderBottom: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  zIndex: 10
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedChatId(null);
                      setShowDisappearingSidebar(false);
                    }}
                    className="mobile-back-btn"
                    style={{
                      display: 'none',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '6px',
                      borderRadius: '50%',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      backgroundColor: 'transparent',
                      border: 'none',
                      marginRight: '6px'
                    }}
                    title="Back to Chats"
                  >
                    <ArrowLeft size={20} />
                  </button>

                  <div
                    className="profile-trigger"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                      minWidth: '220px'
                    }}
                  >
                    {/* Avatar with platform icon badge */}
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--primary-light)',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}>
                        {selectedContact.name[0]}
                      </div>
                      {/* Platform brand icon badge */}
                      <div style={{
                        position: 'absolute',
                        bottom: '-3px',
                        right: '-3px',
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '2px solid var(--bg-tertiary)',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
                        backgroundColor: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <BrandIcon
                          name={selectedContact.channel}
                          style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                        />
                      </div>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>{selectedContact.name}</h4>
                      {selectedContact.online ? (
                        <p style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block', boxShadow: '0 0 0 2px rgba(16,185,129,0.25)', animation: 'pulse-online 2s infinite' }}></span>
                          <span style={{ fontWeight: '600' }}>Online</span>
                        </p>
                      ) : (
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span>{formatLastSeen(selectedContact.lastSeen)}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--text-secondary)', position: 'relative' }}>
                  <button
                    onClick={() => { setShowSearchSidebar(prev => !prev); setShowContactInfo(false); }}
                    className="header-action-btn"
                    title="Search Message"
                  >
                    <Search size={18} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowRightHeaderMenu(!showRightHeaderMenu); }}
                    className="header-action-btn"
                    title="More Options"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {showRightHeaderMenu && (
                    <div className="glass-panel right-header-menu-container" style={{
                      position: 'absolute',
                      top: '45px',
                      right: '0',
                      borderRadius: '8px',
                      padding: '6px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      boxShadow: 'var(--shadow-lg)',
                      zIndex: 100,
                      width: '220px',
                      border: '1px solid var(--border-color)',
                      animation: 'fadeIn 0.2s ease',
                      backgroundColor: 'var(--bg-tertiary)'
                    }} onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => { setShowContactInfo(true); setShowSearchSidebar(false); setShowRightHeaderMenu(false); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', textAlign: 'left', width: '100%', color: 'var(--text-primary)' }}
                        className="dropdown-item-btn"
                      >
                        <Info size={16} style={{ color: 'var(--text-secondary)' }} />
                        <span>Contact Info</span>
                      </button>
                      <button
                        onClick={() => { setSelectMessagesMode(true); setSelectedMessageIds([]); setShowRightHeaderMenu(false); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', textAlign: 'left', width: '100%', color: 'var(--text-primary)' }}
                        className="dropdown-item-btn"
                      >
                        <CheckSquare size={16} style={{ color: 'var(--text-secondary)' }} />
                        <span>Select Messages</span>
                      </button>
                      <button
                        onClick={() => {
                          const currentVal = disappearingDurations[selectedContact.id] || 'off';
                          setPendingDisappearingDuration(prev => ({ ...prev, [selectedContact.id]: currentVal }));
                          setShowDisappearingSidebar(true);
                          setShowContactInfo(false);
                          setShowSearchSidebar(false);
                          setShowRightHeaderMenu(false);
                        }}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', textAlign: 'left', width: '100%', color: 'var(--text-primary)' }}
                        className="dropdown-item-btn"
                      >
                        <Timer size={16} style={{ color: 'var(--text-secondary)' }} />
                        <span>Disappearing Messages</span>
                      </button>
                      <button
                        onClick={() => {
                          const isListed = !selectedContact?.deletedFromCRM;
                          if (isListed) {
                            const existingTag = selectedContact?.tag || '';
                            if (['Lead', 'Customer', 'VIP'].includes(existingTag)) {
                              setSelectedTagOption(existingTag);
                              setCrmTag(existingTag);
                            } else {
                              setSelectedTagOption(existingTag ? 'Other' : '');
                              setCrmTag(existingTag);
                            }
                          } else {
                            setSelectedTagOption('');
                            setCrmTag('');
                          }
                          setShowCRMModal(true);
                          setShowRightHeaderMenu(false);
                        }}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', textAlign: 'left', width: '100%', color: 'var(--text-primary)' }}
                        className="dropdown-item-btn"
                      >
                        <UserPlus size={16} style={{ color: 'var(--text-secondary)' }} />
                        <span>Add To CRM</span>
                      </button>

                      <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '4px 0' }} />
                      <button
                        onClick={() => { alert(`Blocking ${selectedContact.name}...`); setShowRightHeaderMenu(false); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', textAlign: 'left', width: '100%', color: 'var(--danger)' }}
                        className="dropdown-item-btn danger-action-btn"
                      >
                        <Ban size={16} style={{ color: 'var(--danger)' }} />
                        <span>Block</span>
                      </button>
                      <button
                        disabled={activeMessages.length === 0}
                        onClick={() => {
                          setShowClearChatConfirm(true);
                          setShowRightHeaderMenu(false);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          fontSize: '0.85rem',
                          textAlign: 'left',
                          width: '100%',
                          color: 'var(--danger)',
                          opacity: activeMessages.length === 0 ? 0.4 : 1,
                          pointerEvents: activeMessages.length === 0 ? 'none' : 'auto',
                          cursor: activeMessages.length === 0 ? 'not-allowed' : 'pointer'
                        }}
                        className="dropdown-item-btn danger-action-btn"
                      >
                        <MinusCircle size={16} style={{ color: 'var(--danger)' }} />
                        <span>Clear Chat</span>
                      </button>
                      <button
                        onClick={() => {
                          setShowDeleteChatConfirm(true);
                          setShowRightHeaderMenu(false);
                        }}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', textAlign: 'left', width: '100%', color: 'var(--danger)' }}
                        className="dropdown-item-btn danger-action-btn"
                      >
                        <Trash2 size={16} style={{ color: 'var(--danger)' }} />
                        <span>Delete Chat</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedChatId(null);
                          setShowRightHeaderMenu(false);
                          setShowContactInfo(false);
                          setShowSearchSidebar(false);
                          setShowDisappearingSidebar(false);
                          setSelectMessagesMode(false);
                          setSelectedMessageIds([]);
                        }}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', textAlign: 'left', width: '100%', color: 'var(--text-primary)' }}
                        className="dropdown-item-btn"
                      >
                        <XCircle size={16} style={{ color: 'var(--text-secondary)' }} />
                        <span>Close Chat</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Message Thread Area with WhatsApp Doodle Tile Styling */}
              <div style={{
                flex: 1,
                minHeight: 0,
                padding: '20px 24px',
                overflowY: 'auto',
                backgroundImage: 'linear-gradient(var(--whatsapp-overlay), var(--whatsapp-overlay)), radial-gradient(var(--border-color) 0.5px, transparent 0.5px)',
                backgroundSize: '10px 10px',
                backgroundColor: 'var(--whatsapp-bg)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }} className="whatsapp-thread">
                <div style={{ alignSelf: 'center', margin: '8px 0', padding: '4px 10px', backgroundColor: 'rgba(0,0,0,0.06)', borderRadius: '6px', fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
                  TODAY
                </div>

                {activeMessages.map((msg) => {
                  const isMe = msg.sentByMe;
                  const isMsgSelected = selectedMessageIds.includes(msg.id);
                  return (
                    <div
                      key={msg.id}
                      onClick={() => {
                        if (selectMessagesMode) {
                          setSelectedMessageIds(prev =>
                            prev.includes(msg.id) ? prev.filter(id => id !== msg.id) : [...prev, msg.id]
                          );
                        }
                      }}
                      className={selectMessagesMode ? "message-selection-row" : ""}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        width: '100%',
                        cursor: selectMessagesMode ? 'pointer' : 'default',
                        padding: selectMessagesMode ? '6px 12px' : '0px',
                        borderRadius: selectMessagesMode ? '8px' : '0px',
                        transition: 'background-color 0.2s ease'
                      }}
                    >
                      {selectMessagesMode && (
                        <div
                          style={{ cursor: 'pointer', flexShrink: 0 }}
                        >
                          {isMsgSelected ? (
                            <div style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '4px',
                              backgroundColor: '#10b981', // Green checked box
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#fff'
                            }}>
                              <Check size={14} strokeWidth={3} />
                            </div>
                          ) : (
                            <div style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '4px',
                              border: `2px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.35)'}`,
                              backgroundColor: 'transparent'
                            }} />
                          )}
                        </div>
                      )}

                      <div style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: isMe ? 'flex-end' : 'flex-start',
                        pointerEvents: selectMessagesMode ? 'none' : 'auto'
                      }}>
                        <div
                          id={`msg-${msg.id}`}
                          style={{
                            alignSelf: isMe ? 'flex-end' : 'flex-start',
                            maxWidth: '65%',
                            backgroundColor: isMe ? 'var(--whatsapp-bubble-sent)' : 'var(--whatsapp-bubble-rcvd)',
                            color: 'var(--text-primary)',
                            padding: '8px 12px',
                            borderRadius: isMe ? '10px 0px 10px 10px' : '0px 10px 10px 10px',
                            boxShadow: '0 1px 1.5px rgba(0,0,0,0.12)',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                            border: isMe ? 'none' : '1px solid var(--border-color)',
                            animation: 'fadeIn 0.2s ease',
                            transition: 'background-color 0.3s ease'
                          }}
                        >
                          <p style={{ fontSize: '0.88rem', wordBreak: 'break-word', lineHeight: '1.4', margin: 0 }}>{msg.text}</p>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            gap: '4px',
                            alignSelf: 'flex-end'
                          }}>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{msg.time}</span>
                            {isMe && (
                              <span style={{ display: 'flex', alignItems: 'center' }}>
                                {msg.status === 'offline' && (
                                  <Clock size={11} style={{ color: 'var(--text-muted)' }} />
                                )}
                                {msg.status === 'sent' && (
                                  <Check size={13} style={{ color: 'var(--text-muted)' }} />
                                )}
                                {msg.status === 'delivered' && (
                                  <div style={{ display: 'inline-flex', position: 'relative', width: '16px', height: '14px', alignItems: 'center', justifyContent: 'center' }}>
                                    <Check size={13} style={{ color: 'var(--text-muted)', position: 'absolute', left: 0 }} />
                                    <Check size={13} style={{ color: 'var(--text-muted)', position: 'absolute', left: '3px' }} />
                                  </div>
                                )}
                                {msg.status === 'read' && (
                                  <div style={{ display: 'inline-flex', position: 'relative', width: '16px', height: '14px', alignItems: 'center', justifyContent: 'center' }}>
                                    <Check size={13} style={{ color: '#53bdeb', position: 'absolute', left: 0 }} />
                                    <Check size={13} style={{ color: '#53bdeb', position: 'absolute', left: '3px' }} />
                                  </div>
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Typing Indicator */}
                {isTypingSim && (
                  <div style={{
                    alignSelf: 'flex-start',
                    backgroundColor: 'var(--whatsapp-bubble-rcvd)',
                    padding: '10px 14px',
                    borderRadius: '0px 10px 10px 10px',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 1px 1.5px rgba(0,0,0,0.12)'
                  }}>
                    <span className="dot" style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-secondary)', borderRadius: '50%', display: 'inline-block', animation: 'bounce 1.4s infinite ease-in-out' }}></span>
                    <span className="dot" style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-secondary)', borderRadius: '50%', display: 'inline-block', animation: 'bounce 1.4s infinite ease-in-out 0.2s' }}></span>
                    <span className="dot" style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-secondary)', borderRadius: '50%', display: 'inline-block', animation: 'bounce 1.4s infinite ease-in-out 0.4s' }}></span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Attachment (+ Plus) menu drawer popup */}
              {showAttachMenu && (
                <div className="glass-panel plus-menu-container" style={{
                  position: 'absolute',
                  bottom: '70px',
                  left: '20px',
                  borderRadius: '12px',
                  padding: '4px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 100,
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  width: '140px',
                  animation: 'fadeIn 0.2s ease',
                  backgroundColor: '#000000'
                }} onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => { alert('Select Document to attach'); setShowAttachMenu(false); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', borderRadius: '6px', fontSize: '0.82rem', width: 'calc(100% - 2px)', margin: '0 auto', textAlign: 'left', color: '#ffffff' }}
                    className="dropdown-item-btn"
                  >
                    <File size={15} style={{ color: '#818cf8' }} />
                    <span>Document</span>
                  </button>
                  <button
                    onClick={() => { alert('Select image/video to attach'); setShowAttachMenu(false); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', borderRadius: '6px', fontSize: '0.82rem', width: 'calc(100% - 2px)', margin: '0 auto', textAlign: 'left', color: '#ffffff' }}
                    className="dropdown-item-btn"
                  >
                    <Image size={15} style={{ color: '#f472b6' }} />
                    <span>Photos</span>
                  </button>
                  <button
                    onClick={() => { alert('Open Camera...'); setShowAttachMenu(false); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', borderRadius: '6px', fontSize: '0.82rem', width: 'calc(100% - 2px)', margin: '0 auto', textAlign: 'left', color: '#ffffff' }}
                    className="dropdown-item-btn"
                  >
                    <Camera size={15} style={{ color: '#f87171' }} />
                    <span>Camera</span>
                  </button>
                  <button
                    onClick={() => { alert('Select Audio file to attach'); setShowAttachMenu(false); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', borderRadius: '6px', fontSize: '0.82rem', width: 'calc(100% - 2px)', margin: '0 auto', textAlign: 'left', color: '#ffffff' }}
                    className="dropdown-item-btn"
                  >
                    <Headphones size={15} style={{ color: '#fbbf24' }} />
                    <span>Audio</span>
                  </button>
                  <button
                    onClick={() => { alert('Add contact card'); setShowAttachMenu(false); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', borderRadius: '6px', fontSize: '0.82rem', width: 'calc(100% - 2px)', margin: '0 auto', textAlign: 'left', color: '#ffffff' }}
                    className="dropdown-item-btn"
                  >
                    <User size={15} style={{ color: '#34d399' }} />
                    <span>Contact</span>
                  </button>
                </div>
              )}

              {/* Emoji menu drawer popup */}
              {showEmojiMenu && (
                <div className="glass-panel emoji-menu-container" style={{
                  position: 'absolute',
                  bottom: '80px',
                  left: '16px',
                  borderRadius: '12px',
                  padding: '4px',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 100,
                  width: '320px',
                  maxWidth: 'calc(100vw - 32px)',
                  height: '380px',
                  border: '1px solid #22223b',
                  backgroundColor: '#121221',
                  overflow: 'hidden'
                }} onClick={(e) => e.stopPropagation()}>
                  <emoji-picker
                    class="dark"
                    ref={emojiPickerRef}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                  />
                </div>
              )}

              {/* Bottom Input Area */}
              {/* Bottom Message Selection or Text Input Area */}
              {selectMessagesMode ? (
                <div style={{
                  padding: '10px 20px',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderTop: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '60px',
                  zIndex: 10
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button
                      onClick={() => {
                        setSelectMessagesMode(false);
                        setSelectedMessageIds([]);
                      }}
                      className="header-action-btn"
                      title="Cancel selection"
                    >
                      <X size={20} />
                    </button>
                    <span style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                      {selectedMessageIds.length} selected
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', color: 'var(--text-secondary)' }}>
                    <button
                      disabled={selectedMessageIds.length === 0}
                      onClick={handleCopyMessages}
                      className="header-action-btn"
                      title="Copy messages"
                      style={{
                        opacity: selectedMessageIds.length === 0 ? 0.4 : 1,
                        pointerEvents: selectedMessageIds.length === 0 ? 'none' : 'auto',
                        cursor: selectedMessageIds.length === 0 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      <Copy size={18} />
                    </button>
                    <button
                      disabled={selectedMessageIds.length === 0}
                      onClick={handleDeleteMessages}
                      className="header-action-btn"
                      title="Delete messages"
                      style={{
                        opacity: selectedMessageIds.length === 0 ? 0.4 : 1,
                        pointerEvents: selectedMessageIds.length === 0 ? 'none' : 'auto',
                        cursor: selectedMessageIds.length === 0 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      disabled={selectedMessageIds.length === 0}
                      onClick={handleForwardMessages}
                      className="header-action-btn"
                      title="Forward messages"
                      style={{
                        opacity: selectedMessageIds.length === 0 ? 0.4 : 1,
                        pointerEvents: selectedMessageIds.length === 0 ? 'none' : 'auto',
                        cursor: selectedMessageIds.length === 0 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      <Forward size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{
                  padding: '12px 20px',
                  backgroundColor: 'var(--whatsapp-bg)',
                  backgroundImage: 'linear-gradient(var(--whatsapp-overlay), var(--whatsapp-overlay)), radial-gradient(var(--border-color) 0.5px, transparent 0.5px)',
                  backgroundSize: '10px 10px',
                  borderTop: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  zIndex: 10
                }}>
                  {/* Unified Capsule Input Container */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    flex: 1,
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '24px',
                    padding: '0 16px',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    minWidth: 0
                  }}>
                    {/* Plus button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); setShowAttachMenu(!showAttachMenu); setShowEmojiMenu(false); }}
                      style={{
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'var(--transition)'
                      }}
                      className="input-capsule-icon-btn plus-menu-trigger"
                      title="Attachments"
                    >
                      <Plus size={20} />
                    </button>

                    {/* Smile button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); setShowEmojiMenu(!showEmojiMenu); setShowAttachMenu(false); }}
                      style={{
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'var(--transition)',
                        marginRight: '4px'
                      }}
                      className="input-capsule-icon-btn emoji-menu-trigger"
                      title="Emojis"
                    >
                      <Smile size={20} />
                    </button>

                    {/* Input Text Field */}
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={handleKeyPress}
                      style={{
                        flex: 1,
                        padding: '14px 6px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        outline: 'none',
                        fontSize: '0.95rem',
                        color: 'var(--text-primary)',
                        minWidth: 0
                      }}
                    />

                    {/* Mic / Send Button inside capsule */}
                    {inputText.trim() ? (
                      <button
                        onClick={handleSend}
                        style={{
                          padding: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--primary)',
                          cursor: 'pointer',
                          transition: 'var(--transition)'
                        }}
                        className="input-capsule-icon-btn"
                        title="Send message"
                      >
                        <Send size={18} />
                      </button>
                    ) : (
                      <button
                        onClick={() => alert('Simulating voice recording message...')}
                        style={{
                          padding: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--text-secondary)',
                          cursor: 'pointer',
                          transition: 'var(--transition)'
                        }}
                        className="input-capsule-icon-btn"
                        title="Voice input"
                      >
                        <Mic size={18} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Info Sidebar */}
            {showContactInfo && (
              <div style={{
                width: '380px',
                backgroundColor: 'var(--bg-secondary)',
                borderLeft: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                zIndex: 20,
                overflow: 'hidden',
                transition: 'var(--transition)'
              }} className="contact-info-sidebar slide-in-right">

                {/* Sidebar Header */}
                <div style={{
                  padding: '14px 20px',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderBottom: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  height: 'var(--navbar-height)',
                  flexShrink: 0
                }}>
                  <button
                    onClick={() => setShowContactInfo(false)}
                    style={{ color: 'var(--text-primary)', display: 'flex', padding: '4px' }}
                    title="Close Contact Info"
                  >
                    <X size={20} />
                  </button>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)' }}>Contact Info</h3>
                </div>

                {/* Sidebar Body */}
                <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, overflowY: 'auto' }}>

                  {/* Profile Card */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', paddingBottom: '20px', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{
                      width: '90px',
                      height: '90px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary-light)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '2rem',
                      boxShadow: 'var(--shadow)',
                      border: '3px solid var(--bg-secondary)'
                    }}>
                      {selectedContact.name[0]}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>{selectedContact.name}</h4>
                      {selectedContact.online ? (
                        <p style={{ fontSize: '0.8rem', color: '#10b981', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }}></span>
                          Online
                        </p>
                      ) : (
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {formatLastSeen(selectedContact.lastSeen)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Details List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h5 style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>About & Contact</h5>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {/* Phone */}
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{ color: 'var(--text-secondary)', padding: '2px' }}>
                          <Phone size={18} />
                        </div>
                        <div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Phone Number</span>
                          <span style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-primary)' }}>{selectedContact.phone || 'N/A'}</span>
                        </div>
                      </div>

                      {/* Email */}
                      {selectedContact.email && selectedContact.channel === 'Gmail' && (
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <div style={{ color: 'var(--text-secondary)', padding: '2px' }}>
                            <Mail size={18} />
                          </div>
                          <div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Email Address</span>
                            <span style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-primary)', wordBreak: 'break-all' }}>{selectedContact.email}</span>
                          </div>
                        </div>
                      )}

                      {/* Channel / Platform */}
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{ color: 'var(--text-secondary)', padding: '2px' }}>
                          <Bot size={18} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Source Channel</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              overflow: 'hidden',
                              backgroundColor: selectedContact.channel === 'WhatsApp' ? '#25d366' : selectedContact.channel === 'Telegram' ? '#229ed9' : selectedContact.channel === 'Instagram' ? '#e1306c' : '#fff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <BrandIcon name={selectedContact.channel} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                            <span style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-primary)' }}>{selectedContact.channel}</span>
                          </div>
                        </div>
                      </div>

                      {/* CRM Tag */}
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{ color: 'var(--text-secondary)', padding: '2px' }}>
                          <Info size={18} />
                        </div>
                        <div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>CRM Tag</span>
                          {selectedContact.tag ? (
                            <span className={`badge badge-${selectedContact.tag.toLowerCase()}`}>
                              {selectedContact.tag}
                            </span>
                          ) : (
                            <span style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-muted)' }}>-</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Content */}
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <h5 style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Media, links and docs</h5>
                    <div style={{
                      padding: '12px',
                      backgroundColor: 'var(--bg-tertiary)',
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)'
                    }}>
                      No media, links or docs shared yet
                    </div>
                  </div>

                  {/* Actions List */}
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button
                      onClick={() => {
                        const isListed = !selectedContact?.deletedFromCRM;
                        if (isListed) {
                          const existingTag = selectedContact?.tag || '';
                          if (['Lead', 'Customer', 'VIP'].includes(existingTag)) {
                            setSelectedTagOption(existingTag);
                            setCrmTag(existingTag);
                          } else {
                            setSelectedTagOption(existingTag ? 'Other' : '');
                            setCrmTag(existingTag);
                          }
                        } else {
                          setSelectedTagOption('');
                          setCrmTag('');
                        }
                        setShowCRMModal(true);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 12px',
                        color: 'var(--text-primary)',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        transition: 'var(--transition)',
                        width: '100%',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                      className="dropdown-item-btn"
                    >
                      <ListPlus size={16} />
                      Add to List
                    </button>

                    <button
                      onClick={() => setShowClearChatConfirm(true)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 12px',
                        color: 'var(--danger)',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        transition: 'var(--transition)',
                        width: '100%',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                      className="danger-action-btn"
                    >
                      <MinusCircle size={16} />
                      Clear Chat
                    </button>

                    <button
                      onClick={() => alert(`Blocking ${selectedContact.name}...`)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 12px',
                        color: 'var(--danger)',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        transition: 'var(--transition)',
                        width: '100%',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                      className="danger-action-btn"
                    >
                      <Ban size={16} />
                      Block {selectedContact.name}
                    </button>

                    <button
                      onClick={() => setShowDeleteChatConfirm(true)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 12px',
                        color: 'var(--danger)',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        transition: 'var(--transition)',
                        width: '100%',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                      className="danger-action-btn"
                    >
                      <Trash2 size={16} />
                      Delete Chat
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* Search Messages Sidebar */}
            {showSearchSidebar && (
              <div style={{
                width: '380px',
                backgroundColor: 'var(--bg-secondary)',
                borderLeft: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                zIndex: 20,
                overflowY: 'auto',
                transition: 'var(--transition)'
              }} className="contact-info-sidebar slide-in-right">

                {/* Sidebar Header */}
                <div style={{
                  padding: '14px 20px',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderBottom: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  height: 'var(--navbar-height)',
                  flexShrink: 0
                }}>
                  <button
                    onClick={() => { setShowSearchSidebar(false); setChatSearchQuery(''); }}
                    style={{ color: 'var(--text-primary)', display: 'flex', padding: '4px', background: 'none', border: 'none', cursor: 'pointer' }}
                    title="Close Search"
                  >
                    <X size={20} />
                  </button>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>Search Messages</h3>
                </div>

                {/* Sidebar Body */}
                <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, minHeight: 0 }}>
                  {/* Search Input */}
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      placeholder="Search messages..."
                      value={chatSearchQuery}
                      onChange={(e) => setChatSearchQuery(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px 8px 36px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--bg-tertiary)',
                        fontSize: '0.85rem',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        boxSizing: 'border-box'
                      }}
                    />
                    <Search size={16} style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-muted)'
                    }} />
                    {chatSearchQuery && (
                      <button
                        onClick={() => setChatSearchQuery('')}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-muted)',
                          cursor: 'pointer',
                          padding: 0
                        }}
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  {/* Search Results */}
                  <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {!chatSearchQuery ? (
                      <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 10px', fontSize: '0.85rem' }}>
                        Search for messages in this chat.
                      </div>
                    ) : (
                      (() => {
                        const matches = activeMessages.filter(m =>
                          m.text.toLowerCase().includes(chatSearchQuery.toLowerCase())
                        );
                        if (matches.length === 0) {
                          return (
                            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 10px', fontSize: '0.85rem' }}>
                              No messages found.
                            </div>
                          );
                        }
                        return matches.map(m => {
                          const senderName = m.sentByMe ? 'Me' : selectedContact.name;
                          return (
                            <div
                              key={m.id}
                              onClick={() => {
                                const el = document.getElementById(`msg-${m.id}`);
                                if (el) {
                                  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                  // Highlight message background temporarily
                                  el.style.backgroundColor = 'rgba(16, 185, 129, 0.3)';
                                  setTimeout(() => {
                                    el.style.backgroundColor = m.sentByMe ? 'var(--whatsapp-bubble-sent)' : 'var(--whatsapp-bubble-rcvd)';
                                  }, 1500);
                                }
                              }}
                              style={{
                                padding: '12px',
                                borderRadius: '8px',
                                backgroundColor: 'var(--bg-tertiary)',
                                border: '1px solid var(--border-color)',
                                cursor: 'pointer',
                                transition: 'var(--transition)'
                              }}
                              className="search-result-item"
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                <span style={{ fontWeight: '600' }}>{senderName}</span>
                                <span>{m.time}</span>
                              </div>
                              <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', margin: 0, wordBreak: 'break-word', lineHeight: '1.4' }}>
                                {m.text}
                              </p>
                            </div>
                          );
                        });
                      })()
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Disappearing Messages Sidebar */}
            {showDisappearingSidebar && (
              <div style={{
                width: '380px',
                backgroundColor: 'var(--bg-secondary)',
                borderLeft: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                zIndex: 20,
                overflowY: 'auto',
                transition: 'var(--transition)'
              }} className="contact-info-sidebar slide-in-right">

                {/* Sidebar Header */}
                <div style={{
                  padding: '14px 20px',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderBottom: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  height: 'var(--navbar-height)',
                  flexShrink: 0
                }}>
                  <button
                    onClick={() => setShowDisappearingSidebar(false)}
                    style={{ color: 'var(--text-primary)', display: 'flex', padding: '4px', background: 'none', border: 'none', cursor: 'pointer' }}
                    title="Close"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>Disappearing messages</h3>
                </div>

                {/* Sidebar Body */}
                <div style={{ padding: '20px 20px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>

                  {/* Clock SVG Logo (Enlarged to 120px) */}
                  <div style={{ padding: '0px', display: 'flex', justifyContent: 'center' }}>
                    <svg width="120" height="120" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto', display: 'block' }}>
                      {/* White message bubble shape in background */}
                      <path d="M110 50 C125 50, 140 60, 140 75 C140 90, 125 100, 110 100 C105 100, 100 98, 95 95 L80 102 L85 92 C80 87, 78 82, 78 75 C78 60, 92 50, 110 50 Z" fill="#FCFAF2" opacity="0.9" />

                      {/* Clock circle */}
                      <circle cx="95" cy="80" r="35" fill="#25D366" />
                      <circle cx="95" cy="80" r="30" fill="none" stroke="#128C7E" strokeWidth="1.5" />

                      {/* Dots on the clock */}
                      <circle cx="95" cy="56" r="1.5" fill="#075E54" />
                      <circle cx="107" cy="59" r="1.5" fill="#075E54" />
                      <circle cx="116" cy="68" r="1.5" fill="#075E54" />
                      <circle cx="119" cy="80" r="1.5" fill="#075E54" />
                      <circle cx="116" cy="92" r="1.5" fill="#075E54" />
                      <circle cx="107" cy="101" r="1.5" fill="#075E54" />
                      <circle cx="95" cy="104" r="1.5" fill="#075E54" />
                      <circle cx="83" cy="101" r="1.5" fill="#075E54" />
                      <circle cx="74" cy="92" r="1.5" fill="#075E54" />
                      <circle cx="71" cy="80" r="1.5" fill="#075E54" />
                      <circle cx="74" cy="68" r="1.5" fill="#075E54" />
                      <circle cx="83" cy="59" r="1.5" fill="#075E54" />

                      {/* Dial needle */}
                      <path d="M95 80 L80 75" stroke="#075E54" strokeWidth="2.5" strokeLinecap="round" />
                      <circle cx="95" cy="80" r="3" fill="#075E54" />

                      {/* Overlapping light green clouds/bubbles on bottom-left */}
                      <circle cx="65" cy="95" r="15" fill="#E8F5E9" opacity="0.95" />
                      <circle cx="78" cy="98" r="10" fill="#E8F5E9" opacity="0.95" />
                      <circle cx="55" cy="65" r="7" fill="#E8F5E9" opacity="0.9" />
                      <circle cx="65" cy="72" r="5" fill="#E8F5E9" opacity="0.9" />
                      <circle cx="45" cy="78" r="4" fill="#E8F5E9" opacity="0.9" />
                    </svg>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px', textAlign: 'center' }}>
                      Make messages in this chat disappear
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', textAlign: 'center', margin: 0 }}>
                      Enable disappearing messages to automatically clean up your chat history. All new messages sent in this conversation will be permanently deleted after your selected time duration, helping you keep your conversations private and free up device storage. Anyone in this chat has the ability to update this setting at any time.
                    </p>
                  </div>

                  {/* Radio Group Options */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' }}>
                    {(() => {
                      const activeDuration = disappearingDurations[selectedContact.id] || 'off';
                      const pendingDuration = pendingDisappearingDuration[selectedContact.id] || activeDuration;
                      const standardOptions = ['24h', '7d', '90d', 'off'];
                      const isCustom = !standardOptions.includes(pendingDuration) || !standardOptions.includes(activeDuration);

                      const optionsToRender = [
                        { value: '24h', label: '24 hours' },
                        { value: '7d', label: '7 days' },
                        { value: '90d', label: '90 days' },
                        { value: 'off', label: 'Off' }
                      ];

                      if (isCustom) {
                        const customValue = !standardOptions.includes(activeDuration) ? activeDuration : pendingDuration;
                        // Insert before 'off'
                        optionsToRender.splice(3, 0, { value: customValue, label: customValue });
                      }

                      return (
                        <>
                          {optionsToRender.map(opt => {
                            const isActive = activeDuration === opt.value;
                            const isChecked = pendingDuration === opt.value;
                            return (
                              <label
                                key={opt.value}
                                onClick={() => {
                                  if (!isActive) {
                                    setPendingDisappearingDuration(prev => ({ ...prev, [selectedContact.id]: opt.value }));
                                  }
                                }}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '12px',
                                  cursor: isActive ? 'not-allowed' : 'pointer',
                                  padding: '6px 10px',
                                  borderRadius: '8px',
                                  transition: 'background-color 0.2s ease',
                                  backgroundColor: isChecked ? 'rgba(37, 211, 102, 0.05)' : 'transparent',
                                  opacity: isActive ? 0.5 : 1,
                                  pointerEvents: isActive ? 'none' : 'auto'
                                }}
                                className="disappearing-option-row"
                              >
                                <div style={{
                                  width: '18px',
                                  height: '18px',
                                  borderRadius: '50%',
                                  border: isChecked ? '2px solid #25D366' : '2px solid var(--text-muted)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  transition: 'all 0.2s ease',
                                  flexShrink: 0
                                }}>
                                  {isChecked && (
                                    <div style={{
                                      width: '8px',
                                      height: '8px',
                                      borderRadius: '50%',
                                      backgroundColor: '#25D366'
                                    }} />
                                  )}
                                </div>
                                <span style={{ fontSize: '0.9rem', fontWeight: isChecked ? '600' : '500', color: isChecked ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                                  {opt.label}
                                </span>
                              </label>
                            );
                          })}

                          {/* Custom duration setter */}
                          <div style={{ marginTop: '4px', paddingLeft: '10px' }}>
                            {!showCustomInput ? (
                              <button
                                onClick={() => setShowCustomInput(true)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: 'var(--primary)',
                                  fontSize: '0.82rem',
                                  fontWeight: '600',
                                  cursor: 'pointer',
                                  padding: 0,
                                  textDecoration: 'underline'
                                }}
                              >
                                Set custom duration...
                              </button>
                            ) : (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px', padding: '10px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'center' }}>
                                  {/* Hour Select */}
                                  <select
                                    value={customHour}
                                    onChange={(e) => setCustomHour(e.target.value)}
                                    style={{
                                      padding: '4px 6px',
                                      borderRadius: '6px',
                                      backgroundColor: 'var(--bg-secondary)',
                                      border: '1px solid var(--border-color)',
                                      color: 'var(--text-primary)',
                                      fontSize: '0.82rem',
                                      fontWeight: '600',
                                      outline: 'none',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    {Array.from({ length: 12 }, (_, i) => String(i + 1)).map(h => (
                                      <option key={h} value={h}>{h}</option>
                                    ))}
                                  </select>

                                  <span style={{ fontSize: '0.82rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>:</span>

                                  {/* Minute Select */}
                                  <select
                                    value={customMinute}
                                    onChange={(e) => setCustomMinute(e.target.value)}
                                    style={{
                                      padding: '4px 6px',
                                      borderRadius: '6px',
                                      backgroundColor: 'var(--bg-secondary)',
                                      border: '1px solid var(--border-color)',
                                      color: 'var(--text-primary)',
                                      fontSize: '0.82rem',
                                      fontWeight: '600',
                                      outline: 'none',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    {['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'].map(m => (
                                      <option key={m} value={m}>{m}</option>
                                    ))}
                                  </select>

                                  {/* AM/PM Select */}
                                  <select
                                    value={customAmpm}
                                    onChange={(e) => setCustomAmpm(e.target.value)}
                                    style={{
                                      padding: '4px 6px',
                                      borderRadius: '6px',
                                      backgroundColor: 'var(--bg-secondary)',
                                      border: '1px solid var(--border-color)',
                                      color: 'var(--text-primary)',
                                      fontSize: '0.82rem',
                                      fontWeight: '600',
                                      outline: 'none',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                  </select>
                                </div>

                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '4px' }}>
                                  <button
                                    onClick={() => setShowCustomInput(false)}
                                    style={{
                                      padding: '4px 10px',
                                      color: 'var(--text-secondary)',
                                      background: 'none',
                                      border: '1px solid var(--border-color)',
                                      borderRadius: '6px',
                                      fontSize: '0.75rem',
                                      fontWeight: '600',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => {
                                      const timeVal = `${customHour}:${customMinute} ${customAmpm}`;
                                      setPendingDisappearingDuration(prev => ({ ...prev, [selectedContact.id]: timeVal }));
                                      setShowCustomInput(false);
                                    }}
                                    style={{
                                      padding: '4px 12px',
                                      backgroundColor: 'var(--primary)',
                                      color: '#fff',
                                      borderRadius: '6px',
                                      border: 'none',
                                      fontSize: '0.75rem',
                                      fontWeight: '600',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    Set Time
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  {/* Confirm Button */}
                  <button
                    onClick={() => {
                      const activeDuration = disappearingDurations[selectedContact.id] || 'off';
                      const pendingDuration = pendingDisappearingDuration[selectedContact.id] || activeDuration;
                      setDisappearingDurations(prev => ({ ...prev, [selectedContact.id]: pendingDuration }));

                      if (pendingDuration !== 'off') {
                        setConversations(prev => {
                          const currentMsgs = prev[selectedChatId] || [];
                          let filteredMsgs = [...currentMsgs];
                          if (pendingDuration === '24h' || pendingDuration.toLowerCase().includes('hour') || pendingDuration.toLowerCase().includes('day')) {
                            filteredMsgs = currentMsgs.filter(m => m.time !== 'Yesterday' && m.time !== '2 days ago');
                          } else if (pendingDuration === '7d') {
                            filteredMsgs = currentMsgs.filter(m => m.time !== '2 days ago');
                          }
                          return {
                            ...prev,
                            [selectedChatId]: filteredMsgs
                          };
                        });

                        if (typeof showToast === 'function') {
                          showToast(`Disappearing messages set to ${pendingDuration.endsWith('h') || pendingDuration.endsWith('d') ? (pendingDuration === '24h' ? '24 hours' : pendingDuration === '7d' ? '7 days' : '90 days') : pendingDuration}`, 'success');
                        }
                      } else {
                        if (typeof showToast === 'function') {
                          showToast("Disappearing messages turned off.", 'info');
                        }
                      }
                      setShowDisappearingSidebar(false);
                    }}
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      marginTop: '8px',
                      fontWeight: '600',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(37, 211, 102, 0.2)',
                      backgroundColor: '#25D366',
                      color: '#ffffff',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.88rem'
                    }}
                  >
                    Confirm
                  </button>

                </div>
              </div>
            )}

            {/* Clear Chat Confirmation Modal */}
            {showClearChatConfirm && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                animation: 'fadeIn 0.2s ease'
              }}>
                <div className="glass-panel" style={{
                  width: '320px',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: 'var(--shadow-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
                    Clear this chat?
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                    Are you sure you want to clear all messages in this chat? This action cannot be undone.
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
                    <button
                      onClick={() => setShowClearChatConfirm(false)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'transparent',
                        color: 'var(--text-secondary)',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                      className="dropdown-item-btn"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setConversations(prev => ({ ...prev, [selectedChatId]: [] }));
                        setContacts(prev => prev.map(c => {
                          if (c.id === selectedChatId) {
                            return { ...c, lastMsg: '' };
                          }
                          return c;
                        }));
                        if (typeof showToast === 'function') {
                          showToast('Chat cleared successfully', 'success');
                        }
                        setShowClearChatConfirm(false);
                      }}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: 'var(--danger)',
                        color: '#ffffff',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Clear Chat
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Delete Chat Confirmation Modal */}
            {showDeleteChatConfirm && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                animation: 'fadeIn 0.2s ease'
              }}>
                <div className="glass-panel" style={{
                  width: '320px',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: 'var(--shadow-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
                    Delete this chat?
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                    Are you sure you want to delete this chat with {selectedContact?.name}? All messages and history will be permanently removed.
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
                    <button
                      onClick={() => setShowDeleteChatConfirm(false)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'transparent',
                        color: 'var(--text-secondary)',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                      className="dropdown-item-btn"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setContacts(prev => prev.filter(c => c.id !== selectedChatId));
                        setSelectedChatId(null);
                        if (typeof showToast === 'function') {
                          showToast('Chat deleted successfully', 'success');
                        }
                        setShowDeleteChatConfirm(false);
                      }}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: 'var(--danger)',
                        color: '#ffffff',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Delete Chat
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Contact Avatar Fullscreen Preview Modal (WhatsApp Style) */}
        {avatarPreviewContact && (
          <div
            onClick={() => setAvatarPreviewContact(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(3px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'fadeIn 0.2s ease'
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                animation: 'fadeIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {/* Large circular initials avatar */}
              <div style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '4.5rem',
                position: 'relative',
                userSelect: 'none',
                boxShadow: 'var(--shadow-lg)'
              }}>
                {avatarPreviewContact.name[0]}

                {/* Platform Badge overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: '6px',
                  right: '6px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: avatarPreviewContact.channel === 'WhatsApp' ? '#25d366' : avatarPreviewContact.channel === 'Telegram' ? '#229ed9' : avatarPreviewContact.channel === 'Instagram' ? '#e1306c' : '#fff',
                  border: '2px solid var(--bg-secondary)',
                  boxShadow: 'var(--shadow)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  <BrandIcon
                    name={avatarPreviewContact.channel}
                    style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                  />
                </div>
              </div>

              {/* Action Message button - slightly smaller width */}
              <button
                onClick={() => {
                  setSelectedChatId(avatarPreviewContact.id);
                  setAvatarPreviewContact(null);
                }}
                style={{
                  width: '140px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px 14px',
                  gap: '8px',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  border: 'none'
                }}
                className="btn btn-primary"
                title="Open Chat"
              >
                <MessageSquare size={16} />
                <span>Message</span>
              </button>
            </div>
          </div>
        )}

        {/* Add to CRM Modal */}
        {showCRMModal && (() => {
          const isSaveDisabled = (!selectedContact?.deletedFromCRM && crmTag === selectedContact?.tag) || !crmTag;
          return (
            <div className="modal-overlay" style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1100,
              backdropFilter: 'blur(4px)',
              animation: 'fadeIn 0.2s ease'
            }} onClick={() => setShowCRMModal(false)}>
              <div className="modal-content glass-panel" style={{
                width: '320px',
                maxWidth: 'calc(100vw - 32px)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: 'var(--shadow-lg)',
                position: 'relative',
                animation: 'fadeIn 0.25s ease'
              }} onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button
                  onClick={() => setShowCRMModal(false)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    color: 'var(--text-muted)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  <X size={16} />
                </button>

                {/* Content Header */}
                <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                  <div style={{
                    display: 'inline-flex',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    color: 'var(--primary)',
                    padding: '10px',
                    borderRadius: '10px',
                    marginBottom: '8px'
                  }}>
                    <UserPlus size={18} />
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Add to CRM</h3>
                </div>

                {/* Description (styled like disappearing messages) */}
                <div style={{ marginBottom: '12px' }}>
                  <p style={{
                    fontSize: '0.76rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.5',
                    textAlign: 'center',
                    margin: 0
                  }}>
                    Assign status tags to organize your contacts in the CRM registry. Custom tags help filter and track user engagement status—whether they are prospective leads, active customers, or VIP clients. Tags apply globally across your workspace pipelines.
                  </p>
                </div>

                {/* Input field */}
                <form onSubmit={(e) => {
                  e.preventDefault();
                  setContacts(prev => prev.map(c => {
                    if (c.id === selectedContact.id) {
                      return { ...c, tag: crmTag.trim(), deletedFromCRM: false };
                    }
                    return c;
                  }));
                  if (typeof showToast === 'function') {
                    showToast(`Contact tag updated to "${crmTag}" successfully!`, 'success');
                  }
                  setShowCRMModal(false);
                }} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      color: 'var(--text-secondary)',
                      display: 'block',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Tag
                    </label>

                    {/* Preset tag pills */}
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
                      {['Lead', 'Customer', 'VIP'].map(tagOpt => {
                        const isActive = selectedTagOption === tagOpt;
                        return (
                          <button
                            key={tagOpt}
                            type="button"
                            onClick={() => {
                              setSelectedTagOption(tagOpt);
                              setCrmTag(tagOpt);
                            }}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '20px',
                              fontSize: '0.78rem',
                              fontWeight: '600',
                              cursor: 'pointer',
                              transition: 'var(--transition)',
                              border: isActive ? '1.5px solid var(--primary)' : '1.5px solid var(--border-color)',
                              backgroundColor: isActive ? 'var(--primary-light)' : 'var(--bg-tertiary)',
                              color: isActive ? 'var(--primary)' : 'var(--text-secondary)'
                            }}
                          >
                            {tagOpt}
                          </button>
                        );
                      })}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTagOption('Other');
                          setCrmTag('');
                        }}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '0.78rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'var(--transition)',
                          border: selectedTagOption === 'Other' ? '1.5px solid var(--primary)' : '1.5px solid var(--border-color)',
                          backgroundColor: selectedTagOption === 'Other' ? 'var(--primary-light)' : 'var(--bg-tertiary)',
                          color: selectedTagOption === 'Other' ? 'var(--primary)' : 'var(--text-secondary)'
                        }}
                      >
                        Other
                      </button>
                    </div>

                    {/* Manual custom tag input */}
                    {selectedTagOption === 'Other' && (
                      <input
                        required
                        type="text"
                        placeholder="Enter custom tag manually..."
                        value={crmTag}
                        onChange={(e) => setCrmTag(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          backgroundColor: 'var(--bg-tertiary)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-primary)',
                          fontSize: '0.82rem',
                          boxSizing: 'border-box',
                          outline: 'none'
                        }}
                        className="form-input"
                      />
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '4px' }}>
                    <button
                      type="button"
                      onClick={() => setShowCRMModal(false)}
                      className="btn btn-secondary"
                      style={{ padding: '8px 14px', fontSize: '0.8rem' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSaveDisabled}
                      style={{
                        padding: '8px 14px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        opacity: isSaveDisabled ? 0.5 : 1,
                        cursor: isSaveDisabled ? 'not-allowed' : 'pointer'
                      }}
                    >
                      Save Tag
                    </button>
                  </div>
                </form>
              </div>
            </div>
          );
        })()}
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes pulse-online {
          0%, 100% { box-shadow: 0 0 0 2px rgba(16,185,129,0.25); }
          50% { box-shadow: 0 0 0 5px rgba(16,185,129,0.08); }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .slide-in-right {
          animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .danger-action-btn:hover {
          background-color: rgba(244, 63, 94, 0.08) !important;
        }
        .profile-trigger {
          padding: 6px 12px;
          border-radius: 8px;
          transition: background-color 0.2s ease;
        }
        .profile-trigger:hover {
          background-color: var(--border-color) !important;
        }
        .header-action-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          background: transparent;
          border: none;
          padding: 0 !important;
          margin: 0 !important;
          cursor: pointer;
          transition: var(--transition);
        }
        .header-action-btn:hover {
          background-color: var(--border-color) !important;
          color: var(--text-primary);
        }
        .dropdown-item-btn {
          background-color: transparent;
          border: none;
          transition: var(--transition);
        }
        .dropdown-item-btn:hover {
          background-color: var(--border-color) !important;
        }
        .plus-menu-container .dropdown-item-btn:hover {
          background-color: rgba(255, 255, 255, 0.15) !important;
        }
        .archived-header-row:hover {
          background-color: var(--border-color) !important;
        }
        .chat-item-row {
          transition: background-color 0.2s ease !important;
        }
        .chat-item-row:hover {
          background-color: var(--border-color) !important;
        }
        .chat-avatar-clickable {
          transition: transform 0.2s ease, opacity 0.2s ease;
        }
        .chat-avatar-clickable:hover {
          opacity: 0.85;
          transform: scale(1.05);
        }
        .search-result-item {
          transition: background-color 0.2s ease !important;
        }
        .search-result-item:hover {
          background-color: var(--border-color) !important;
        }
        .message-selection-row {
          transition: background-color 0.2s ease !important;
        }
        .message-selection-row:hover {
          background-color: var(--border-color) !important;
        }
        @media (max-width: 700px) {
          .chat-header-clickable-mobile {
            cursor: pointer !important;
          }
          .chat-header-clickable-mobile:hover {
            opacity: 0.95;
            background-color: var(--bg-secondary) !important;
          }
        }
        .input-capsule-icon-btn {
          transition: color 0.2s ease, transform 0.2s ease;
        }
        .input-capsule-icon-btn:hover {
          color: var(--text-primary) !important;
          transform: scale(1.08);
        }

        emoji-picker {
          width: 100%;
          height: 100%;
          border: none;
          --background: #121221;
          --border-color: #22223b;
          --outline-color: var(--primary);
          --input-border-color: #22223b;
          --input-placeholder-color: #64748b;
          --category-emoji-size: 1.1rem;
          --emoji-size: 1.25rem;
        }

        .inbox-menu-btn {
          display: none !important;
        }

        @media (max-width: 1024px) {
          .inbox-menu-btn {
            display: flex !important;
          }
          .inbox-layout {
            grid-template-columns: 1fr !important;
            height: calc(100vh - 64px) !important;
            border-radius: 0px !important;
            border: none !important;
          }
          
          /* When a chat is selected on mobile, make layout full screen height to reclaim tab bar space */
          .inbox-layout.chat-selected {
            height: 100vh !important;
          }
          
          /* Show/hide sidebar vs right panel depending on chat selection */
          .inbox-layout:not(.chat-selected) .inbox-sidebar {
            display: flex !important;
            width: 100% !important;
          }
          .inbox-layout:not(.chat-selected) .inbox-right-panel {
            display: none !important;
          }
          
          .inbox-layout.chat-selected .inbox-sidebar {
            display: none !important;
          }
          .inbox-layout.chat-selected .inbox-right-panel {
            display: flex !important;
            width: 100% !important;
          }

          .contact-info-sidebar {
            position: absolute !important;
            right: 0 !important;
            top: 0 !important;
            bottom: 0 !important;
            width: 100% !important;
            z-index: 150 !important;
            box-shadow: var(--shadow-lg) !important;
          }
          
          .mobile-back-btn {
            display: flex !important;
          }
          .mobile-back-btn:hover {
            background-color: var(--border-color) !important;
          }

           .chat-item-row {
             padding: 18px 16px !important;
           }

          @keyframes shakeHorizontal {
            0%, 100% { transform: translateX(0); }
            15%, 45%, 75% { transform: translateX(-6px); }
            30%, 60%, 90% { transform: translateX(6px); }
          }
          .shake-animation {
            animation: shakeHorizontal 0.5s ease-in-out;
          }

          /* Tweak whatsapp-thread content sizing to be slightly smaller on mobile view */
          .whatsapp-thread {
            padding: 12px 14px !important;
            gap: 8px !important;
          }
          .whatsapp-thread p {
            font-size: 0.8rem !important;
          }
          .whatsapp-thread [id^="msg-"] {
            padding: 6px 10px !important;
          }
          .inbox-right-panel input[placeholder="Type a message..."] {
            padding: 8px 4px !important;
            font-size: 0.88rem !important;
          }
        }
      `}</style>
    </div>
  );
}
