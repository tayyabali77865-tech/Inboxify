import React from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import AppPortal from './components/AppPortal';
import PrivacyPolicy from './components/PrivacyPolicy';
import SecurityPolicies from './components/SecurityPolicies';
import { X, CheckCircle, MessageSquare } from 'lucide-react';

export default function App() {
  // Helper to parse URL path to initial state
  const parseUrl = () => {
    const path = window.location.pathname;
    if (path === '/privacy') {
      return { viewMode: 'privacy', activeTab: 'inbox' };
    }
    if (path === '/security') {
      return { viewMode: 'security', activeTab: 'inbox' };
    }
    if (path.startsWith('/app')) {
      const parts = path.split('/');
      const tab = parts[2] || 'inbox';
      const validTabs = ['inbox', 'contacts', 'platform', 'team', 'automations', 'ai', 'analytics', 'settings'];
      return { 
        viewMode: 'app', 
        activeTab: validTabs.includes(tab) ? tab : 'inbox' 
      };
    }
    return { viewMode: 'landing', activeTab: 'inbox' };
  };

  const initialRoute = parseUrl();

  // 1. Global App States
  const [theme, setTheme] = React.useState(() => {
    return localStorage.getItem('chathub-theme') || 'light';
  });
  
  const [viewMode, setViewMode] = React.useState(initialRoute.viewMode); // 'landing', 'app', 'privacy', 'security'
  const [activeTab, setActiveTab] = React.useState(initialRoute.activeTab);
  const [toasts, setToasts] = React.useState([]);
  const [authModal, setAuthModal] = React.useState({ isOpen: false, type: 'login' });
  const [customAlert, setCustomAlert] = React.useState(null); // { type, message, title, onConfirm }

  const openLogin = () => setAuthModal({ isOpen: true, type: 'login' });
  const openSignup = () => setAuthModal({ isOpen: true, type: 'signup' });
  const closeAuthModal = () => setAuthModal({ isOpen: false, type: 'login' });

  // Mock Integrations list
  const [integrations, setIntegrations] = React.useState([
    { id: 1, name: 'WhatsApp', color: '#128c7e', connected: true },
    { id: 2, name: 'Instagram', color: '#e1306c', connected: true },
    { id: 3, name: 'Messenger', color: '#0084ff', connected: true },
    { id: 4, name: 'Telegram', color: '#0088cc', connected: true },
    { id: 5, name: 'Discord', color: '#5865f2', connected: false },
    { id: 6, name: 'X/Twitter', color: '#1da1f2', connected: false },
    { id: 7, name: 'TikTok', color: '#010101', connected: false },
    { id: 9, name: 'Gmail', color: '#db4437', connected: false },
    { id: 10, name: 'Messages', color: '#3b82f6', connected: false }
  ]);

  // Mock Active Contacts/Chats (CRM Data)
  const [contacts, setContacts] = React.useState([
    { id: 1, name: 'John Smith', channel: 'WhatsApp', email: 'john.smith@example.com', phone: '+1 555-0143', tag: 'Lead', lastMsg: 'I have a question about pricing', time: '10:35 AM', unreadCount: 2, online: true, lastSeen: null },
    { id: 2, name: 'Sarah Johnson', channel: 'Instagram', email: 'sarah.j@example.com', phone: '+1 555-0182', tag: 'Customer', lastMsg: 'Verify email is billing@gmail.com', time: '09:20 AM', unreadCount: 0, online: false, lastSeen: 'Today at 9:20 AM' },
    { id: 3, name: 'Mike Brown', channel: 'Telegram', email: 'mike.b@example.com', phone: '+1 555-0199', tag: 'Lead', lastMsg: 'Check that with our team.', time: 'Yesterday', unreadCount: 0, online: false, lastSeen: 'Yesterday at 6:45 PM' },
    { id: 4, name: 'Emma Wilson', channel: 'WhatsApp', email: 'emma.w@example.com', phone: '+1 555-0156', tag: 'Customer', lastMsg: 'Thanks for onboarding help!', time: 'Yesterday', unreadCount: 0, online: true, lastSeen: null },
    { id: 5, name: 'David Lee', channel: 'Messenger', email: 'david.l@example.com', phone: '+1 555-0121', tag: 'VIP', lastMsg: 'When will order ship?', time: '2 days ago', unreadCount: 1, online: false, lastSeen: 'Mon at 3:12 PM' }
  ]);

  // Mock Teammates Directory Data
  const [team, setTeam] = React.useState([
    { id: 1, name: 'John Doe', email: 'john.doe@chathub.com', role: 'Admin', status: 'Active', lastActive: 'Just now' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@chathub.com', role: 'Agent', status: 'Active', lastActive: '2 min ago' },
    { id: 3, name: 'Mike Brown', email: 'mike.b@chathub.com', role: 'Agent', status: 'Active', lastActive: '10 min ago' },
    { id: 4, name: 'Emma Wilson', email: 'emma.w@chathub.com', role: 'Agent', status: 'Active', lastActive: '1 hour ago' }
  ]);

  // Mock Automation Trigger Rules list
  const [automations, setAutomations] = React.useState([
    { id: 1, name: 'Welcome Message', active: true, keyword: null, triggerText: 'Hello! Thank you for connecting with us. How can we assist you today?' },
    { id: 2, name: 'Away Message', active: false, keyword: null, triggerText: 'Thanks for reaching out! We are currently closed. We will return tomorrow morning.' },
    { id: 3, name: 'Support Routing', active: true, keyword: 'support', triggerText: 'Transferring your ticket to our technical support team... Please hold on.' },
    { id: 4, name: 'Follow Up Message', active: false, keyword: null, triggerText: 'Checking in to see if your query has been fully resolved!' }
  ]);

  // Mock Workspace Settings Data
  const [settings, setSettings] = React.useState({
    businessName: 'ChatHub Inc',
    timezone: 'GMT+5',
    language: 'English',
    dateFormat: 'DD/MM/YYYY'
  });

  React.useEffect(() => {
    // Synchronize HTML theme data-attribute for root CSS classes
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('chathub-theme', theme);
  }, [theme]);

  const getUrlForState = (view, tab) => {
    if (view === 'privacy') return '/privacy';
    if (view === 'security') return '/security';
    if (view === 'app') return `/app/${tab}`;
    return '/';
  };

  // Sync state -> URL
  React.useEffect(() => {
    const currentPath = window.location.pathname;
    const targetPath = getUrlForState(viewMode, activeTab);
    if (currentPath !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
  }, [viewMode, activeTab]);

  // Sync URL -> state (handles back/forward navigation)
  React.useEffect(() => {
    const handlePopState = () => {
      const { viewMode: newView, activeTab: newTab } = parseUrl();
      setViewMode(newView);
      setActiveTab(newTab);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  React.useEffect(() => {
    const originalAlert = window.alert;
    window.alert = (message) => {
      setCustomAlert({ type: 'alert', message, title: 'Notice' });
    };
    window.showAlert = (message, title = 'Notice') => {
      setCustomAlert({ type: 'alert', message, title });
    };
    window.showConfirm = (message, onConfirm, title = 'Confirm Action') => {
      setCustomAlert({ type: 'confirm', message, title, onConfirm });
    };
    return () => {
      window.alert = originalAlert;
      delete window.showAlert;
      delete window.showConfirm;
    };
  }, []);
  // 3. Helper Functions
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const showToast = (message, type = 'success') => {
    const newToast = { id: Date.now(), message, type };
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove toast after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newToast.id));
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div style={{ minHeight: '100vh', transition: 'var(--transition)' }}>
      {/* 1. Global Navigation header (Shown on Landing, Privacy, and Security modes) */}
      {(viewMode === 'landing' || viewMode === 'privacy' || viewMode === 'security') && (
        <Navbar 
          theme={theme} 
          toggleTheme={toggleTheme} 
          viewMode={viewMode} 
          setViewMode={setViewMode} 
          openLogin={openLogin}
          openSignup={openSignup}
          integrations={integrations}
        />
      )}

      {/* 2. Page Area routers */}
      {viewMode === 'landing' && (
        <LandingPage 
          setViewMode={setViewMode} 
          integrations={integrations}
          setIntegrations={setIntegrations}
          openSignup={openSignup}
        />
      )}

      {viewMode === 'app' && (
        <AppPortal 
          theme={theme} 
          toggleTheme={toggleTheme} 
          setViewMode={setViewMode}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          contacts={contacts}
          setContacts={setContacts}
          team={team}
          setTeam={setTeam}
          automations={automations}
          setAutomations={setAutomations}
          settings={settings}
          setSettings={setSettings}
          showToast={showToast}
          integrations={integrations}
          setIntegrations={setIntegrations}
        />
      )}

      {viewMode === 'privacy' && (
        <PrivacyPolicy setViewMode={setViewMode} />
      )}

      {viewMode === 'security' && (
        <SecurityPolicies setViewMode={setViewMode} />
      )}

      {/* Auth Modal Overlay */}
      {authModal.isOpen && (
        <div className="modal-overlay" onClick={closeAuthModal}>
          <div 
            className="modal-content glass-panel" 
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '420px', padding: '30px' }}
          >
            <button 
              onClick={closeAuthModal} 
              style={{ position: 'absolute', top: '16px', right: '16px', color: 'var(--text-muted)' }}
            >
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'inline-flex', backgroundColor: 'var(--primary)', color: '#ffffff', padding: '8px', borderRadius: '8px', marginBottom: '12px' }}>
                <MessageSquare size={20} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
                {authModal.type === 'login' ? 'Welcome Back' : 'Create Your Account'}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {authModal.type === 'login' ? 'Sign in to access your unified inbox' : 'Get started with your 14-day free trial'}
              </p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              if (authModal.type === 'login') {
                const email = formData.get('email');
                showToast(`Welcome back, ${email.split('@')[0]}!`, 'success');
              } else {
                const firstName = formData.get('firstName');
                const companyName = formData.get('company');
                showToast(`Welcome to ChatHub, ${firstName}! Account created for ${companyName}.`, 'success');
              }
              closeAuthModal();
              setViewMode('app');
            }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {authModal.type === 'signup' && (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>First Name</label>
                    <input required type="text" name="firstName" placeholder="John" className="form-input" style={{ fontSize: '0.85rem' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Last Name</label>
                    <input required type="text" name="lastName" placeholder="Doe" className="form-input" style={{ fontSize: '0.85rem' }} />
                  </div>
                </div>
              )}

              {authModal.type === 'signup' && (
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Company Name</label>
                  <input required type="text" name="company" placeholder="Acme Corp" className="form-input" style={{ fontSize: '0.85rem' }} />
                </div>
              )}

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Email Address</label>
                <input required type="email" name="email" placeholder="you@example.com" className="form-input" style={{ fontSize: '0.85rem' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Password</label>
                <input required type="password" name="password" placeholder="••••••••" className="form-input" style={{ fontSize: '0.85rem' }} />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', marginTop: '8px', fontWeight: '600' }}>
                {authModal.type === 'login' ? 'Sign In' : 'Register'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>
                {authModal.type === 'login' ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button 
                onClick={() => setAuthModal(prev => ({ ...prev, type: prev.type === 'login' ? 'signup' : 'login' }))}
                style={{ color: 'var(--primary)', fontWeight: '600' }}
              >
                {authModal.type === 'login' ? 'Sign Up' : 'Log In'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Alert/Confirm Modal Dialog */}
      {customAlert && (
        <div className="modal-overlay" style={{ zIndex: 11000 }} onClick={() => {
          if (customAlert.type === 'alert') {
            setCustomAlert(null);
          }
        }}>
          <div 
            className="modal-content glass-panel" 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              maxWidth: '380px', 
              padding: '24px', 
              textAlign: 'center', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
              {customAlert.title}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
              {customAlert.message}
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '8px' }}>
              {customAlert.type === 'confirm' && (
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setCustomAlert(null)}
                  style={{ padding: '8px 18px', minWidth: '100px', fontSize: '0.85rem' }}
                >
                  Cancel
                </button>
              )}
              <button 
                className="btn btn-primary" 
                onClick={() => {
                  if (customAlert.type === 'confirm' && typeof customAlert.onConfirm === 'function') {
                    customAlert.onConfirm();
                  }
                  setCustomAlert(null);
                }}
                style={{ padding: '8px 18px', minWidth: '100px', fontSize: '0.85rem' }}
              >
                {customAlert.type === 'confirm' ? 'Confirm' : 'OK'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Toast Notifications overlay panel */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className={`toast toast-${toast.type} glass-panel`}
            style={{ minWidth: '280px', justifyContent: 'space-between' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle size={18} style={{ color: 'var(--success)' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>{toast.message}</span>
            </div>
            <button 
              onClick={() => removeToast(toast.id)}
              style={{ color: 'var(--text-muted)', display: 'flex' }}
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
