import React from 'react';
import { 
  Globe, CheckCircle2, AlertCircle, RefreshCw, 
  Search, Shield, ArrowUpRight, MessageSquare, ToggleLeft, ToggleRight, Settings, X
} from 'lucide-react';
import { BrandIcon } from './BrandIcons';

export default function Platform({ integrations, setIntegrations, showToast }) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterCategory, setFilterCategory] = React.useState('all');
  const [isSyncing, setIsSyncing] = React.useState(false);

  // WhatsApp Cloud API Connection config
  const [configModalOpen, setConfigModalOpen] = React.useState(false);
  const [token, setToken] = React.useState(() => {
    const config = JSON.parse(localStorage.getItem('chathub_whatsapp_api_config') || '{}');
    return config.token || import.meta.env.VITE_WHATSAPP_ACCESS_TOKEN || '';
  });
  const [phoneNumberId, setPhoneNumberId] = React.useState(() => {
    const config = JSON.parse(localStorage.getItem('chathub_whatsapp_api_config') || '{}');
    return config.phoneNumberId || '';
  });
  const [testRecipient, setTestRecipient] = React.useState(() => {
    const config = JSON.parse(localStorage.getItem('chathub_whatsapp_api_config') || '{}');
    return config.testRecipient || '';
  });

  const handleSaveConfig = (e) => {
    e.preventDefault();
    if (!token.trim() || !phoneNumberId.trim()) {
      showToast('Token and Phone Number ID are required!', 'error');
      return;
    }
    const config = { token, phoneNumberId, testRecipient };
    localStorage.setItem('chathub_whatsapp_api_config', JSON.stringify(config));
    showToast('WhatsApp Cloud API Configuration saved successfully!', 'success');
    setConfigModalOpen(false);
  };

  const toggleConnection = (id) => {
    const item = integrations.find(i => i.id === id);
    if (!item) return;

    const nextConnected = !item.connected;

    showToast(
      `${item.name} has been ${nextConnected ? 'connected successfully' : 'disconnected'}!`,
      nextConnected ? 'success' : 'info'
    );

    setIntegrations(prev => prev.map(integration => {
      if (integration.id === id) {
        return { ...integration, connected: nextConnected };
      }
      return integration;
    }));
  };

  const handleSyncAll = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showToast('All platforms synchronized successfully!', 'success');
    }, 1500);
  };

  // Filter integrations
  const filteredIntegrations = integrations.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterCategory === 'active') {
      return matchesSearch && item.connected;
    }
    if (filterCategory === 'offline') {
      return matchesSearch && !item.connected;
    }
    return matchesSearch;
  });

  const connectedCount = integrations.filter(i => i.connected).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.3s ease' }}>

      {/* 1. Header Area with Stats */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)' }}>Platform Integrations</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Connect and manage social channels routing messages to your unified inbox</p>
        </div>

        <button
          onClick={handleSyncAll}
          disabled={isSyncing}
          className="btn btn-secondary desktop-sync-btn"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', fontSize: '0.85rem' }}
        >
          <RefreshCw size={16} className={isSyncing ? "spin-sync" : ""} style={{ transition: 'transform 0.5s ease' }} />
          <span>{isSyncing ? 'Syncing...' : 'Sync All Channels'}</span>
        </button>
      </div>

      {/* 2. Stats Dashboard Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        {/* Stat Card 1 */}
        <div className="glass-panel stat-card" style={{ padding: '20px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '12px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '12px' }}>
            <Globe size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', fontWeight: '500' }}>Active Platforms</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)' }}>{connectedCount} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '400' }}>/ {integrations.length}</span></h3>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="glass-panel stat-card webhook-card" style={{ padding: '20px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '12px', backgroundColor: 'rgba(16,185,129,0.1)', color: 'var(--success)', borderRadius: '12px' }}>
            <MessageSquare size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', fontWeight: '500' }}>API Webhook Status</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Healthy
              <CheckCircle2 size={16} style={{ color: 'var(--success)' }} />
            </h3>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="glass-panel stat-card encryption-card" style={{ padding: '20px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '12px', backgroundColor: 'rgba(236,72,153,0.1)', color: 'var(--secondary)', borderRadius: '12px' }}>
            <Shield size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', fontWeight: '500' }}>Secure Encryption</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)' }}>TLS 1.3</h3>
          </div>
        </div>
      </div>

      {/* 3. Controls & Filter Bar */}
      <div className="glass-panel" style={{
        padding: '14px 20px',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        {/* Search */}
        <div style={{ position: 'relative', width: '280px' }}>
          <input
            type="text"
            placeholder="Search platforms..."
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

        {/* Filter categories */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {[
            { id: 'all', label: 'All Channels' },
            { id: 'active', label: 'Active' },
            { id: 'offline', label: 'Offline' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              style={{
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '600',
                backgroundColor: filterCategory === cat.id ? 'var(--primary-light)' : 'transparent',
                color: filterCategory === cat.id ? 'var(--primary)' : 'var(--text-secondary)',
                transition: 'var(--transition)',
                border: filterCategory === cat.id ? '1px solid transparent' : '1px solid var(--border-color)'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile-only Sync All Channels Button */}
      <button
        onClick={handleSyncAll}
        disabled={isSyncing}
        className="btn btn-secondary mobile-sync-btn"
        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', fontSize: '0.85rem' }}
      >
        <RefreshCw size={16} className={isSyncing ? "spin-sync" : ""} style={{ transition: 'transform 0.5s ease' }} />
        <span>{isSyncing ? 'Syncing...' : 'Sync All Channels'}</span>
      </button>

      {/* 4. Channels Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px'
      }} className="platform-cards-grid">
        {filteredIntegrations.map((item) => (
          <div
            key={item.id}
            className="glass-panel platform-card"
            style={{
              padding: '20px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px',
              transition: 'var(--transition)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Top Info row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {/* Brand Avatar */}
                <div className="platform-brand-icon-wrapper" style={{
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <BrandIcon
                    name={item.name}
                    style={{ width: '100%', height: '100%', borderRadius: '50%', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                  />
                </div>
                <div>
                  <h4 className="platform-card-title" style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)' }}>{item.name}</h4>
                  <span className="platform-card-subtitle" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {item.connected ? 'Receiving updates' : 'Inactive'}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <span className="platform-status-badge" style={{
                fontSize: '0.68rem',
                fontWeight: '700',
                padding: '3px 8px',
                borderRadius: '10px',
                backgroundColor: item.connected ? 'rgba(16,185,129,0.12)' : 'var(--bg-tertiary)',
                color: item.connected ? 'var(--success)' : 'var(--text-muted)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: item.connected ? 'var(--success)' : 'var(--text-muted)'
                }}></span>
                {item.connected ? 'CONNECTED' : 'DISCONNECTED'}
              </span>
            </div>

            {/* Middle Details Description */}
            <p className="platform-desc-text" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              {item.connected
                ? `Route messages, photos, and customer logs from your ${item.name} channel directly to Inbox.`
                : `Connect ${item.name} API webhooks to track customer conversations in ChatHub portal.`
              }
            </p>

            {/* Bottom Toggle Control Row */}
            <div className="platform-card-bottom" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '14px',
              marginTop: '4px'
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>
                {item.connected ? 'Sync Active' : 'Offline'}
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {item.name === 'WhatsApp' && item.connected && (
                  <button
                    onClick={() => setConfigModalOpen(true)}
                    className="btn btn-secondary"
                    style={{ padding: '4px 10px', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}
                    title="Configure WhatsApp API Settings"
                  >
                    <Settings size={12} />
                    <span>Setup API</span>
                  </button>
                )}
                <button 
                  onClick={() => toggleConnection(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: item.connected ? 'var(--primary)' : 'var(--text-muted)',
                    transition: 'var(--transition)',
                    padding: '4px'
                  }}
                  title={item.connected ? 'Disconnect Channel' : 'Connect Channel'}
                >
                  {item.connected ? (
                    <ToggleRight size={36} />
                  ) : (
                    <ToggleLeft size={36} />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* WhatsApp Cloud API Connection Modal */}
      {configModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 9999 }} onClick={() => setConfigModalOpen(false)}>
          <div className="modal-content glass-panel" style={{ maxWidth: '520px', padding: '24px' }} onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setConfigModalOpen(false)}
              style={{ position: 'absolute', right: '16px', top: '16px', color: 'var(--text-secondary)' }}
            >
              <X size={20} />
            </button>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', fontWeight: '700' }}>
              WhatsApp API Connection Setup
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Configure your Meta Developer Cloud API details to send real messages to customers.
            </p>
            <form onSubmit={handleSaveConfig} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Cloud API Access Token *</label>
                <input 
                  type="text" 
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="form-input"
                  placeholder="Paste Meta Access Token..."
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Phone Number ID *</label>
                <input 
                  type="text" 
                  value={phoneNumberId}
                  onChange={(e) => setPhoneNumberId(e.target.value)}
                  className="form-input"
                  placeholder="e.g. 104231362678842"
                  required
                />
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                  Available in Meta Developer App Settings &gt; WhatsApp &gt; API Setup
                </span>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Default Test Recipient Phone Number</label>
                <input 
                  type="text" 
                  value={testRecipient}
                  onChange={(e) => setTestRecipient(e.target.value)}
                  className="form-input"
                  placeholder="e.g. 923001234567"
                />
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                  Add country code, omit leading '+' or '0'. Make sure this is registered as a test recipient in Meta Developer Dashboard.
                </span>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setConfigModalOpen(false)}
                  className="btn btn-secondary"
                  style={{ padding: '8px 16px' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ padding: '8px 18px' }}
                >
                  Save Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .platform-card:hover {
          box-shadow: var(--shadow-lg);
          border-color: var(--primary-light);
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-sync {
          animation: spin 1s linear infinite;
        }
        .mobile-sync-btn {
          display: none !important;
        }
        @media (max-width: 768px) {
          .desktop-sync-btn {
            display: none !important;
          }
          .mobile-sync-btn {
            display: flex !important;
            width: 100% !important;
            justify-content: center !important;
            margin-bottom: 8px !important;
          }
          /* Platform Grid & Cards adjustments on mobile */
          .platform-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
          .platform-card {
            padding: 10px !important;
            gap: 8px !important;
          }
          .platform-card-bottom {
            padding-top: 10px !important;
            margin-top: 2px !important;
          }
          .platform-status-badge,
          .platform-desc-text {
            display: none !important;
          }
          .platform-brand-icon-wrapper {
            width: 32px !important;
            height: 32px !important;
          }
          .platform-card-title {
            font-size: 0.82rem !important;
          }
          .platform-card-subtitle {
            font-size: 0.65rem !important;
          }
          .platform-card-bottom span {
            font-size: 0.65rem !important;
          }
          .platform-card-bottom button svg {
            width: 26px !important;
            height: 26px !important;
          }
          
          /* Stats cards on Platform Page */
          .glass-panel.stat-card {
            padding: 10px 12px !important;
            gap: 10px !important;
          }
          .glass-panel.stat-card.webhook-card,
          .glass-panel.stat-card.encryption-card {
            display: none !important;
          }
          .glass-panel.stat-card > div:first-child {
            padding: 8px !important;
            border-radius: 8px !important;
          }
          .glass-panel.stat-card svg {
            width: 18px !important;
            height: 18px !important;
          }
          .glass-panel.stat-card h3 {
            font-size: 1.15rem !important;
          }
          .glass-panel.stat-card span {
            font-size: 0.7rem !important;
          }
        }
      `}</style>
    </div>
  );
}
