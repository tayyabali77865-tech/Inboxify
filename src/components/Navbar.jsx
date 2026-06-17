import React from 'react';
import { Sun, Moon, MessageSquare, ArrowRight, Menu, X, ChevronDown, Sparkles, Zap, Database, Users, BarChart3 } from 'lucide-react';
import { BrandIcon } from './BrandIcons';

export default function Navbar({ theme, toggleTheme, viewMode, setViewMode, openLogin, openSignup, integrations }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const defaultIntegrations = [
    { id: 1, name: 'WhatsApp', color: '#128c7e', connected: true },
    { id: 2, name: 'Instagram', color: '#e1306c', connected: true },
    { id: 3, name: 'Messenger', color: '#0084ff', connected: true },
    { id: 4, name: 'Telegram', color: '#0088cc', connected: true },
    { id: 5, name: 'Discord', color: '#5865f2', connected: false },
    { id: 6, name: 'X/Twitter', color: '#1da1f2', connected: false },
    { id: 7, name: 'TikTok', color: '#010101', connected: false },
    { id: 9, name: 'Gmail', color: '#db4437', connected: false },
    { id: 10, name: 'Messages', color: '#3b82f6', connected: false }
  ];

  const listIntegrations = integrations || defaultIntegrations;

  const solutions = [
    { name: "Agencies" },
    { name: "Healthcare" },
    { name: "Multi-location" },
    { name: "Real Estate" },
    { name: "Enterprise" },
    { name: "Hotels" },
    { name: "Professional Services" },
    { name: "Restaurant Groups" }
  ];

  const features = [
    { title: "Unified Inbox", desc: "All client messages in one shared inbox.", icon: <MessageSquare size={16} />, color: "var(--primary)" },
    { title: "Smart Automations", desc: "Set up auto-replies & chat routing rules.", icon: <Zap size={16} />, color: "var(--warning)" },
    { title: "Contacts CRM", desc: "Create rich profiles with custom tags.", icon: <Database size={16} />, color: "var(--success)" },
    { title: "AI Assistant", desc: "Autopilot queries with smart AI agents.", icon: <Sparkles size={16} />, color: "#a855f7" },
    { title: "Team Inbox", desc: "Seamlessly assign and forward sessions.", icon: <Users size={16} />, color: "var(--secondary)" },
    { title: "Analytics", desc: "Deep metrics on responses and workloads.", icon: <BarChart3 size={16} />, color: "#f97316" }
  ];

  return (
    <nav className="glass-panel" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      height: 'var(--navbar-height)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      borderBottom: '1px solid var(--border-color)',
      transition: 'var(--transition)'
    }}>
      {/* Brand Logo */}
      <div
        onClick={() => setViewMode('landing')}
        style={{ display: 'flex', alignItems: 'center', gap: '0px', cursor: 'pointer' }}
      >
        <div style={{
          padding: '4px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg viewBox="0 0 24 24" width="42" height="42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            <path d="M18 7c0-2.76-2.24-5-5-5S8 4.24 8 7c0 1.13.38 2.16 1.01 3L8 14l4.5-1.5c.16.03.33.05.5.05 2.76 0 5-2.24 5-5z" fill="url(#logoGrad)" />
            <path d="M12 11c0 2.21-1.79 4-4 4-.4 0-.78-.06-1.14-.17L3 17l1.05-3.15C3.39 12.98 3 12.03 3 11c0-2.21 1.79-4 4-4s4 1.79 4 4z" fill="#ec4899" fillOpacity="0.85" />
          </svg>
        </div>
        <span style={{
          fontSize: '1.6rem',
          fontWeight: '700',
          fontFamily: 'var(--font-heading)',
          letterSpacing: '-0.03em',
          background: 'linear-gradient(45deg, var(--primary), var(--secondary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          ChatHub
        </span>
      </div>

      {/* Desktop Navigation Links */}
      {viewMode === 'landing' && (
        <div className="desktop-only" style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'center'
        }}>
          {/* Solutions Dropdown Menu */}
          <div className="nav-dropdown-wrapper">
            <button className="nav-link nav-btn" style={{
              fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-secondary)'
            }}>
              <span>Solutions</span>
              <ChevronDown size={14} className="chevron-icon" />
            </button>
            <div className="dropdown-menu solutions-megamenu glass-panel">
              <div style={{
                display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', backgroundColor: 'var(--bg-secondary)',
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    Industries That Win with ChatHub
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px 16px' }}>
                    {solutions.map((item, idx) => (
                      <a href="#features" key={idx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',

                        padding: '6px 0',
                        fontSize: '0.88rem',
                        fontWeight: '500',
                        color: 'var(--text-primary)',
                        transition: 'var(--transition)'

                      }} className="industry-link">
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></span>
                        <span>{item.name}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <div style={{
                  padding: '24px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  justifyContent: 'center',
                  minHeight: '180px',
                  minWidth: '100%',
                  maxWidth: '100%'
                }} className="solutions-banner">
                  <div style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.3' }}>
                    Finally, a unified inbox that actually gets it.
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.45' }}>
                    Ditch the browser tab chaos. Bring all your customer chats, automated workflows, and CRM tags into a single clean workspace, so your team can focus on what moves the needle: customer satisfaction.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Dropdown Menu */}
          <div className="nav-dropdown-wrapper">
            <button className="nav-link nav-btn" style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
              <span>Features</span>
              <ChevronDown size={14} className="chevron-icon" />
            </button>
            <div className="dropdown-menu megamenu glass-panel">
              <div className="dropdown-grid">
                {features.map((item, idx) => (
                  <a href="#features" key={idx} className="dropdown-item">
                    <div className="item-icon-wrapper" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="item-title">{item.title}</div>
                      <div className="item-desc">{item.desc}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Channels Dropdown Menu */}
          <div className="nav-dropdown-wrapper">
            <button className="nav-link nav-btn" style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
              <span>Channels</span>
              <ChevronDown size={14} className="chevron-icon" />
            </button>
            <div className="dropdown-menu channel-menu glass-panel">
              <div className="dropdown-header">
                <strong>Connectable Channels</strong>
                <span className="badge badge-lead">{listIntegrations.filter(i => i.connected).length} Connected</span>
              </div>
              <div className="channel-grid">
                {listIntegrations.map((item) => (
                  <a href="#integrations" key={item.id} className="channel-item">
                    <div className="channel-icon-circle" style={{
                      width: '28px',
                      height: '28px',
                      padding: 0,
                      backgroundColor: 'transparent',
                      borderRadius: '50%'
                    }}>
                      <BrandIcon name={item.name} style={{ width: '100%', height: '100%', borderRadius: '50%', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }} />
                    </div>
                    <div className="channel-info">
                      <span className="channel-name">{item.name}</span>
                      <span className="channel-status" style={{ color: item.connected ? 'var(--success)' : 'var(--text-muted)' }}>
                        <span className="status-dot" style={{ backgroundColor: item.connected ? 'var(--success)' : 'var(--text-muted)' }}></span>
                        {item.connected ? 'Active' : 'Setup'}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a href="#pricing" style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-secondary)', transition: 'var(--transition)' }} className="nav-link">Pricing</a>
        </div>
      )}      {/* Desktop/Mobile Right side elements */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', zIndex: 1001 }}>
        {/* Theme Toggle Switch */}
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
            transition: 'var(--transition)',
            border: '1px solid var(--border-color)'
          }}
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {viewMode === 'landing' ? (
          <>
            <button
              onClick={openLogin}
              className="btn btn-secondary desktop-only"
              style={{ padding: '8px 16px', fontSize: '0.9rem' }}
            >
              Sign In
            </button>
            <button
              onClick={openSignup}
              className="btn btn-primary desktop-only"
              style={{ padding: '8px 18px', fontSize: '0.9rem', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)' }}
            >
              <span>Get Started Free</span>
              <ArrowRight size={16} />
            </button>
          </>
        ) : (
          <button
            onClick={() => setViewMode('landing')}
            className="btn btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <span>Exit Portal</span>
          </button>
        )}

        {/* Mobile Menu Toggle */}
        {viewMode === 'landing' && (
          <button
            className="mobile-only"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              color: 'var(--text-primary)',
              display: 'none',
              padding: '6px',
              zIndex: 10002,
              position: 'relative'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {/* Mobile Drawer Menu - Sliding Sidebar */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '280px',
          height: '100vh',
          backgroundColor: 'var(--bg-secondary)',
          zIndex: 10001,
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          paddingTop: '80px',
          gap: '20px',
          borderLeft: '1px solid var(--border-color)',
          overflowY: 'auto',
          boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
          animation: 'slideInRight 0.3s ease-out'
        }}>
          {/* Close Button at top-right corner of drawer */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '24px',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={24} />
          </button>

          <a href="#features" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)' }}>Solutions</a>
          <a href="#features" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)' }}>Features</a>
          <a href="#integrations" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)' }}>Integrations</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)' }}>Pricing</a>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button
              onClick={() => { setMobileMenuOpen(false); openLogin(); }}
              className="btn btn-secondary"
              style={{ width: '100%', padding: '12px' }}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); openSignup(); }}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px' }}
            >
              Get Started Free
            </button>
          </div>
        </div>
      )}

      {/* Inline styles for responsive Navbar helper */}
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @media (max-width: 1000px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-only {
            display: block !important;
          }
        }
        .nav-link:hover {
          color: var(--primary) !important;
        }

        /* Nav Dropdown Core Styles */
        .nav-dropdown-wrapper {
          position: relative;
          padding: 12px 0;
        }
        .nav-btn {
          cursor: pointer;
          border: none;
          background: none;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: var(--transition);
        }
        .chevron-icon {
          transition: transform 0.2s ease;
        }
        .nav-dropdown-wrapper:hover .chevron-icon {
          transform: rotate(180deg);
        }
        
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          opacity: 0;
          pointer-events: none;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-lg);
          padding: 16px;
        }
        .nav-dropdown-wrapper:hover .dropdown-menu {
          opacity: 1;
          pointer-events: auto;
          transform: translateX(-50%) translateY(-2px);
        }
        
        /* Megamenu layout for Solutions */
        .megamenu {
          width: 500px;
        }
        .dropdown-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        
        /* Solutions megamenu styling */
        .solutions-megamenu {
          width: 720px;
          padding: 28px;
        }
      
        
        .industry-link:hover {
          color: var(--primary) !important;
        }
        .dropdown-item {
          display: flex;
          gap: 12px;
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          transition: var(--transition);
          text-align: left;
        }
        .dropdown-item:hover {
          background-color: var(--bg-tertiary);
        }
        .item-icon-wrapper {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .item-title {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .item-desc {
          font-size: 0.72rem;
          color: var(--text-secondary);
          margin-top: 2px;
          line-height: 1.35;
        }
        
        /* Channels dropdown styling */
        .channel-menu {
          width: 310px;
        }
        .dropdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 10px;
          margin-bottom: 12px;
          font-size: 0.82rem;
        }
        .channel-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }
        .channel-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          border-radius: var(--radius-sm);
          transition: var(--transition);
          text-align: left;
        }
        .channel-item:hover {
          background-color: var(--bg-tertiary);
          transform: scale(1.02);
        }
        .channel-icon-circle {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          color: #ffffff;
          flex-shrink: 0;
        }
        .channel-info {
          display: flex;
          flex-direction: column;
        }
        .channel-name {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .channel-status {
          font-size: 0.68rem;
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 1px;
        }
        .status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          display: inline-block;
        }
      `}</style>
    </nav>
  );
}
