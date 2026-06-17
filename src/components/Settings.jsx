import React from 'react';
import { Save, Shield, Bell, Database, Globe, Key } from 'lucide-react';

export default function Settings({ settings, setSettings, showToast }) {
  const [businessName, setBusinessName] = React.useState(settings.businessName || 'ChatHub');
  const [timezone, setTimezone] = React.useState(settings.timezone || 'GMT+5');
  const [language, setLanguage] = React.useState(settings.language || 'English');
  const [dateFormat, setDateFormat] = React.useState(settings.dateFormat || 'DD/MM/YYYY');
  
  // Notification States
  const [notifyEmail, setNotifyEmail] = React.useState(true);
  const [notifySound, setNotifySound] = React.useState(true);
  const [notifyDesktop, setNotifyDesktop] = React.useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    setSettings({
      businessName,
      timezone,
      language,
      dateFormat
    });
    
    // Fire global toast notification!
    showToast("Workspace configuration saved successfully!", "success");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.3s ease' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: '700' }}>Workspace Settings</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Modify brand details, timezone variables, notification metrics, and APIs</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '220px 1fr',
        gap: '30px'
      }} className="settings-layout">
        
        {/* Left Side: Sub tabs list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', border: 'none', backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
            <Globe size={16} />
            <span>General Setup</span>
          </button>
          <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', border: 'none', backgroundColor: 'transparent' }} onClick={() => alert('Opening Notification Settings...')}>
            <Bell size={16} />
            <span>Notifications</span>
          </button>
          <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', border: 'none', backgroundColor: 'transparent' }} onClick={() => alert('Opening API Keys Portal...')}>
            <Key size={16} />
            <span>API & Developer Keys</span>
          </button>
        </div>

        {/* Right Side: Inputs form */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-md)' }}>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>General Preferences</h3>

            {/* Form row 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Business Name</label>
                <input 
                  type="text" 
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>System Timezone</label>
                <select 
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="form-input"
                >
                  <option value="GMT+5">GMT+05:00 (Pakistan, Karachi)</option>
                  <option value="GMT+0">GMT+00:00 (London, UTC)</option>
                  <option value="GMT-5">GMT-05:00 (New York, EST)</option>
                  <option value="GMT+8">GMT+08:00 (Singapore, SGT)</option>
                </select>
              </div>
            </div>

            {/* Form row 2 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Default Language</label>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="form-input"
                >
                  <option value="English">English</option>
                  <option value="Urdu">Urdu (اردو)</option>
                  <option value="Spanish">Spanish (Español)</option>
                  <option value="German">German (Deutsch)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Date Format</label>
                <select 
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                  className="form-input"
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY (e.g. 05/06/2026)</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY (e.g. 06/05/2026)</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD (e.g. 2026-06-05)</option>
                </select>
              </div>
            </div>

            {/* Notification settings */}
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginTop: '10px' }}>Alert Metrics</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: '600' }}>Desktop Push Alerts</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Show browser popups when messages arrive</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifyDesktop}
                  onChange={(e) => setNotifyDesktop(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: '600' }}>Incoming Sound Alerts</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Play a notification sound for new conversations</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifySound}
                  onChange={(e) => setNotifySound(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: '600' }}>Email Digest Reports</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Send daily email summary of unresolved chats</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
              </div>
            </div>

            {/* Save Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ padding: '10px 20px', gap: '8px' }}
              >
                <Save size={16} />
                <span>Save Workspace Changes</span>
              </button>
            </div>

          </form>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .settings-layout {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
