import React from 'react';
import {
  BarChart3, MessageSquare, Users, Zap, Sparkles, Settings as SettingsIcon,
  ChevronLeft, ChevronRight, LayoutDashboard, Database, UserCheck, Menu, X, ArrowLeft,
  Moon, Sun, HelpCircle, LogOut, Globe, ChevronDown, ChevronUp
} from 'lucide-react';

import DashboardOverview from './DashboardOverview';
import UnifiedInbox from './UnifiedInbox';
import ContactsCRM from './ContactsCRM';
import TeamManagement from './TeamManagement';
import Automations from './Automations';
import AIAssistant from './AIAssistant';
import AnalyticsDetails from './AnalyticsDetails';
import Settings from './Settings';
import Platform from './Platform';

export default function AppPortal({
  theme, toggleTheme, setViewMode, activeTab, setActiveTab,
  contacts, setContacts, team, setTeam, automations, setAutomations,
  settings, setSettings, showToast, integrations, setIntegrations
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [showMoreMobileMenu, setShowMoreMobileMenu] = React.useState(false);
  const [isInboxChatSelected, setIsInboxChatSelected] = React.useState(false);

  // Map sidebar item definitions
  const sidebarItems = [
    { id: 'inbox', label: 'Inbox', icon: <MessageSquare size={18} />, badge: 2 },
    { id: 'contacts', label: 'Contacts (CRM)', icon: <Database size={18} /> },
    { id: 'platform', label: 'Platform', icon: <Globe size={18} /> },
    { id: 'team', label: 'Team', icon: <UserCheck size={18} /> },
    { id: 'automations', label: 'Automations', icon: <Zap size={18} /> },
    { id: 'ai', label: 'AI Assistant', icon: <Sparkles size={18} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={18} /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon size={18} /> }
  ];

  // Render correct sub component based on tab ID
  const renderContent = () => {
    switch (activeTab) {
      case 'inbox':
        return <UnifiedInbox contacts={contacts} setContacts={setContacts} automations={automations} theme={theme} showToast={showToast} integrations={integrations} setIntegrations={setIntegrations} onChatSelectionChange={(isSelected) => setIsInboxChatSelected(isSelected)} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />;
      case 'contacts':
        return <ContactsCRM contacts={contacts} setContacts={setContacts} />;
      case 'platform':
        return <Platform integrations={integrations} setIntegrations={setIntegrations} showToast={showToast} />;
      case 'team':
        return <TeamManagement team={team} setTeam={setTeam} />;
      case 'automations':
        return <Automations automations={automations} setAutomations={setAutomations} />;
      case 'ai':
        return <AIAssistant contacts={contacts} setTab={setActiveTab} />;
      case 'analytics':
        return <AnalyticsDetails />;
      case 'settings':
        return <Settings settings={settings} setSettings={setSettings} showToast={showToast} />;
      default:
        return <UnifiedInbox contacts={contacts} setContacts={setContacts} automations={automations} theme={theme} integrations={integrations} setIntegrations={setIntegrations} onChatSelectionChange={(isSelected) => setIsInboxChatSelected(isSelected)} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />;
    }
  };

  const currentTabLabel = sidebarItems.find(item => item.id === activeTab)?.label || 'Inbox';

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)',
      transition: 'var(--transition)',
      overflowX: 'hidden'
    }}>

      {/* Sidebar mobile overlay background */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay-mobile-bg"
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(3px)',
            zIndex: 45,
            display: 'none'
          }}
        />
      )}

      {/* 1. SIDEBAR (Laptop View) */}
      <aside
        className={`glass-panel sidebar-el ${sidebarOpen ? 'open' : 'closed'}`}
        onMouseLeave={() => setSidebarOpen(false)}
        style={{
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 50,
          transition: 'var(--transition)',
          backgroundColor: 'var(--bg-secondary)'
        }}
      >
        {/* Sidebar Header branding */}
        <div style={{
          height: 'var(--navbar-height)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: sidebarOpen ? 'flex-start' : 'center',
          padding: sidebarOpen ? '0 16px' : '0',
          width: '100%',
          position: 'relative'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            justifyContent: sidebarOpen ? 'flex-start' : 'center',
            width: '100%'
          }} onClick={() => setViewMode('landing')}>
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" style={{
              borderRadius: '12px',
              flexShrink: 0
            }}
              xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="sidebarLogoGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
              <path d="M18 7c0-2.76-2.24-5-5-5S8 4.24 8 7c0 1.13.38 2.16 1.01 3L8 14l4.5-1.5c.16.03.33.05.5.05 2.76 0 5-2.24 5-5z" fill="url(#sidebarLogoGrad)" />
              <path d="M12 11c0 2.21-1.79 4-4 4-.4 0-.78-.06-1.14-.17L3 17l1.05-3.15C3.39 12.98 3 12.03 3 11c0-2.21 1.79-4 4-4s4 1.79 4 4z" fill="#ec4899" fillOpacity="0.85" />
            </svg>
            {sidebarOpen && <span style={{
              fontSize: '1.55rem',
              fontWeight: '800',
              fontFamily: 'var(--font-heading)',
              background: 'linear-gradient(90deg, #a855f7, #6366f1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              whiteSpace: 'nowrap'
            }}>ChatHub</span>}
          </div>
          {sidebarOpen && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(false);
              }}
              className="sidebar-close-mobile-btn"
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-primary)',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-tertiary)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <ChevronLeft size={20} />
            </button>
          )}
        </div>

        {/* Sidebar Navigation Links */}
        <nav
          onMouseEnter={() => setSidebarOpen(true)}
          style={{ flex: 1, padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto' }}
        >
          {sidebarItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`btn ${!sidebarOpen ? 'sidebar-tooltip-wrapper' : ''}`}
                style={{
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  padding: sidebarOpen ? '10px 14px' : '12px 0',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                  color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                  fontWeight: isActive ? '600' : '400',
                  border: 'none',
                  transition: 'var(--transition)',
                  width: '100%',
                  position: 'relative'
                }}
              >
                {sidebarOpen ? (
                  <>
                    {item.icon}
                    <span style={{ fontSize: '0.9rem' }}>{item.label}</span>
                    {item.badge && !isActive && (
                      <span style={{
                        marginLeft: 'auto',
                        backgroundColor: 'var(--secondary)',
                        color: '#ffffff',
                        fontSize: '0.7rem',
                        padding: '2px 6px',
                        borderRadius: '99px',
                        fontWeight: 'bold'
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    {item.icon}
                    {item.badge && !isActive && (
                      <span style={{
                        position: 'absolute',
                        top: '4px',
                        right: '12px',
                        backgroundColor: 'var(--secondary)',
                        color: '#ffffff',
                        fontSize: '0.6rem',
                        padding: '1px 4px',
                        borderRadius: '99px',
                        fontWeight: 'bold',
                        lineHeight: '1'
                      }}>
                        {item.badge}
                      </span>
                    )}
                    <span className="sidebar-tooltip">{item.label}</span>
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer User profile info */}
        <div style={{
          padding: '20px 16px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: sidebarOpen ? 'row' : 'column',
          alignItems: 'center',
          gap: '12px',
          justifyContent: sidebarOpen ? 'flex-start' : 'center'
        }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary)',
            color: '#ffffff',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.9rem',
            flexShrink: 0
          }} className={!sidebarOpen ? "sidebar-tooltip-wrapper" : ""}>
            JD
            {!sidebarOpen && <span className="sidebar-tooltip">John Doe (Admin)</span>}
          </div>
          {sidebarOpen ? (
            <>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>John Doe</h4>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Workspace Admin</p>
              </div>
              <button
                onClick={toggleTheme}
                style={{ color: 'var(--text-secondary)', display: 'flex' }}
                title="Toggle Theme"
              >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              </button>
              <button
                onClick={() => setViewMode('landing')}
                style={{ color: 'var(--text-muted)', display: 'flex' }}
                title="Log Out of Portal"
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
              <button
                onClick={toggleTheme}
                style={{ color: 'var(--text-secondary)', display: 'flex', padding: '4px' }}
                className="sidebar-tooltip-wrapper"
              >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                <span className="sidebar-tooltip">Toggle Theme</span>
              </button>
              <button
                onClick={() => setViewMode('landing')}
                style={{ color: 'var(--text-muted)', display: 'flex', padding: '4px' }}
                className="sidebar-tooltip-wrapper"
              >
                <LogOut size={16} />
                <span className="sidebar-tooltip">Log Out</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <div className={`workspace-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'} tab-${activeTab} ${activeTab === 'inbox' && isInboxChatSelected ? 'tabs-hidden' : ''}`} style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        transition: 'var(--transition)',
        overflowX: 'hidden'
      }}>

        {/* Local Top Bar Header */}
        {activeTab !== 'inbox' && (
          <header className="glass-panel" style={{
            height: 'var(--navbar-height)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            backgroundColor: 'var(--bg-secondary)',
            position: 'sticky',
            top: 0,
            zIndex: 40
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  style={{ color: 'var(--text-primary)', padding: '6px' }}
                  className="sidebar-open-toggle"
                >
                  <Menu size={20} />
                </button>
              )}
              <h2 style={{ fontSize: '1.2rem', fontWeight: '700' }}>{currentTabLabel}</h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Theme selector */}
              <button
                onClick={toggleTheme}
                style={{
                  padding: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--border-color)'
                }}
              >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              </button>
            </div>
          </header>
        )}

        {/* Renders screen content area */}
        <main style={{
          flex: 1,
          padding: activeTab === 'inbox' ? '0px' : '24px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {renderContent()}
        </main>
      </div>

      {/* 3. BOTTOM TAB NAVIGATION (Mobile View - Matches Part 2 Layout) */}
      <div
        className={`mobile-bottom-tabs glass-panel ${activeTab === 'inbox' && isInboxChatSelected ? 'tabs-hidden' : ''
          }`}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '64px',
          borderTop: '1px solid var(--border-color)',
          display: 'none', // Set by responsive media queries
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: 'var(--bg-secondary)',
          zIndex: 100,
          padding: '0 8px'
        }}
      >
        <button
          onClick={() => { setActiveTab('inbox'); setShowMoreMobileMenu(false); }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'inbox' ? 'var(--primary)' : 'var(--text-secondary)', position: 'relative' }}
        >
          <MessageSquare size={20} />
          <span style={{ fontSize: '0.65rem', fontWeight: '600' }}>Inbox</span>
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '-4px',
            backgroundColor: 'var(--secondary)',
            color: '#fff',
            fontSize: '0.6rem',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}>2</span>
        </button>

        <button
          onClick={() => { setActiveTab('platform'); setShowMoreMobileMenu(false); }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'platform' ? 'var(--primary)' : 'var(--text-secondary)' }}
        >
          <Globe size={20} />
          <span style={{ fontSize: '0.65rem', fontWeight: '600' }}>Platform</span>
        </button>

        <button
          onClick={() => { setActiveTab('team'); setShowMoreMobileMenu(false); }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'team' ? 'var(--primary)' : 'var(--text-secondary)' }}
        >
          <UserCheck size={20} />
          <span style={{ fontSize: '0.65rem', fontWeight: '600' }}>Team</span>
        </button>

        <button
          onClick={() => { setActiveTab('analytics'); setShowMoreMobileMenu(false); }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'analytics' ? 'var(--primary)' : 'var(--text-secondary)' }}
        >
          <BarChart3 size={20} />
          <span style={{ fontSize: '0.65rem', fontWeight: '600' }}>Analytics</span>
        </button>

        {/* More button */}
        <button
          onClick={() => setShowMoreMobileMenu(!showMoreMobileMenu)}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: showMoreMobileMenu ? 'var(--primary)' : 'var(--text-secondary)' }}
        >
          <Menu size={20} />
          <span style={{ fontSize: '0.65rem', fontWeight: '600' }}>More</span>
        </button>

        {/* "More" popup mobile drawer */}
        {showMoreMobileMenu && (
          <div className="glass-panel" style={{
            position: 'absolute',
            bottom: '72px',
            right: '10px',
            borderRadius: '12px',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            boxShadow: 'var(--shadow-lg)',
            width: '180px',
            zIndex: 101,
            border: '1px solid var(--border-color)',
            animation: 'fadeIn 0.2s ease'
          }}>
            <button
              onClick={() => { setActiveTab('contacts'); setShowMoreMobileMenu(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', width: '100%', fontSize: '0.8rem', color: activeTab === 'contacts' ? 'var(--primary)' : 'var(--text-primary)' }}
              className="btn-secondary"
            >
              <Database size={16} />
              <span>Contacts CRM</span>
            </button>
            <button
              onClick={() => { setActiveTab('automations'); setShowMoreMobileMenu(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', width: '100%', fontSize: '0.8rem', color: activeTab === 'automations' ? 'var(--primary)' : 'var(--text-primary)' }}
              className="btn-secondary"
            >
              <Zap size={16} />
              <span>Automations</span>
            </button>
            <button
              onClick={() => { setActiveTab('ai'); setShowMoreMobileMenu(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', width: '100%', fontSize: '0.8rem', color: activeTab === 'ai' ? 'var(--primary)' : 'var(--text-primary)' }}
              className="btn-secondary"
            >
              <Sparkles size={16} />
              <span>AI Assistant</span>
            </button>
            <button
              onClick={() => { setActiveTab('settings'); setShowMoreMobileMenu(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', width: '100%', fontSize: '0.8rem', color: activeTab === 'settings' ? 'var(--primary)' : 'var(--text-primary)' }}
              className="btn-secondary"
            >
              <SettingsIcon size={16} />
              <span>Settings</span>
            </button>
            <div style={{ borderTop: '1px solid var(--border-color)', margin: '4px 0' }} />
            <button
              onClick={() => { setViewMode('landing'); setShowMoreMobileMenu(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', width: '100%', fontSize: '0.8rem', color: 'var(--danger)' }}
              className="btn-secondary"
            >
              <ArrowLeft size={16} />
              <span>Exit Portal</span>
            </button>
          </div>
        )}
      </div>

      {/* Portal CSS style overrides */}
      <style>{`
        /* Tooltip Container and style */
        .sidebar-tooltip-wrapper {
          position: relative;
        }
        .sidebar-tooltip {
          visibility: hidden;
          white-space: nowrap;
          background-color: var(--text-primary);
          color: var(--bg-secondary);
          text-align: center;
          border-radius: 6px;
          padding: 6px 12px;
          position: absolute;
          z-index: 1000;
          left: 80px;
          top: 50%;
          transform: translateY(-50%) translateX(-10px);
          opacity: 0;
          transition: opacity 0.2s ease, transform 0.2s ease;
          box-shadow: var(--shadow-lg);
          font-size: 0.75rem;
          font-weight: 600;
          pointer-events: none;
        }
        .sidebar-tooltip::after {
          content: "";
          position: absolute;
          top: 50%;
          right: 100%;
          margin-top: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: transparent var(--text-primary) transparent transparent;
        }
        .sidebar-tooltip-wrapper:hover .sidebar-tooltip {
          visibility: visible;
          opacity: 1;
          transform: translateY(-50%) translateX(0px);
        }

        /* Sidebar layout details on desktop */
        @media (min-width: 1025px) {
          .sidebar-el {
            width: 260px;
            transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          }
          .sidebar-el.open {
            width: 260px;
            box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
          }
          .sidebar-el.closed {
            width: 72px;
          }
          .workspace-container {
            padding-bottom: 0px !important;
            transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          }
          .workspace-container.sidebar-open {
            margin-left: 72px !important;
          }
          .workspace-container.sidebar-closed {
            margin-left: 72px !important;
          }
          .sidebar-open-toggle {
            display: none !important;
          }
        }
        
        /* Sidebar layout details on mobile */
        @media (max-width: 1024px) {
          .sidebar-el {
            transform: translateX(-100%);
            width: 260px !important;
          }
          .sidebar-el.open {
            transform: translateX(0) !important;
          }
          .sidebar-el.closed {
            transform: translateX(-100%) !important;
          }
          .workspace-container {
            margin-left: 0px !important;
            padding-bottom: 80px !important;
          }
          .workspace-container.tab-inbox {
            padding-bottom: 64px !important;
          }
          .workspace-container.tab-inbox.tabs-hidden {
            padding-bottom: 0px !important;
          }
          .mobile-bottom-tabs {
            display: flex !important;
          }
          .mobile-bottom-tabs.tabs-hidden {
            display: none !important;
          }
          .desktop-only-btn {
            display: none !important;
          }
          .sidebar-overlay-mobile-bg {
            display: block !important;
          }
          .sidebar-close-mobile-btn {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
