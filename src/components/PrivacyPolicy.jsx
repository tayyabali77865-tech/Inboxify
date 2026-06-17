import React from 'react';
import { Shield, Eye, Lock, FileText, Globe, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy({ setViewMode }) {
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)',
      transition: 'var(--transition)',
      padding: '40px 24px 80px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      animation: 'fadeIn 0.3s ease'
    }}>
      <div style={{
        maxWidth: '800px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px'
      }}>
        {/* Breadcrumb / Back button */}
        <div>
          <button 
            onClick={() => setViewMode('landing')}
            className="btn btn-secondary"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              fontSize: '0.88rem',
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Page Header */}
        <div style={{ textAlign: 'center', padding: '20px 0 10px 0' }}>
          <div style={{ 
            display: 'inline-flex', 
            backgroundColor: 'var(--primary-light)', 
            color: 'var(--primary)', 
            padding: '12px', 
            borderRadius: '16px',
            marginBottom: '16px',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.15)'
          }}>
            <Shield size={32} />
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px', background: 'linear-gradient(45deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Privacy Policy
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Last Updated: June 17, 2026 &bull; Version 2.1
          </p>
        </div>

        {/* Content Panel */}
        <div className="glass-panel" style={{
          padding: '40px 32px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          backgroundColor: 'var(--bg-secondary)',
          lineHeight: '1.6',
          boxShadow: 'var(--shadow-lg)'
        }}>
          
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Eye size={18} style={{ color: 'var(--primary)' }} />
              1. Information We Collect
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '12px' }}>
              To provide a fully integrated unified inbox, we collect account details and sync data from connected social and chat channels. This information includes:
            </p>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><strong>Account Credentials:</strong> Full name, company name, billing email, and encrypted passwords.</li>
              <li><strong>Channel Meta-Data:</strong> Connection access tokens, API webhook configs, and phone identifiers.</li>
              <li><strong>Messaging Logs:</strong> Simulated or live API messages routed through our hub for display purposes.</li>
            </ul>
          </section>

          <div style={{ height: '1px', backgroundColor: 'var(--border-color)' }} />

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={18} style={{ color: 'var(--secondary)' }} />
              2. How We Use and Protect Data
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '12px' }}>
              Your data is strictly utilized to sync messaging updates and optimize routing. We adhere to high security compliance:
            </p>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Access tokens and APIs are stored inside secure environment databases with standard encryption hashes.</li>
              <li>All database connections route through highly secure TLS 1.3 tunnels.</li>
              <li>No message content is sold, redistributed, or shared with third-party advertising companies.</li>
            </ul>
          </section>

          <div style={{ height: '1px', backgroundColor: 'var(--border-color)' }} />

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={18} style={{ color: 'var(--success)' }} />
              3. Channel Third-Party Policies
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
              When connecting third-party platforms (like Meta WhatsApp Business API, Telegram APIs, or Instagram Direct Message APIs), data transmission also complies with Meta's developer policies and Telegram's standard developer protocols. You are responsible for ensuring that your messaging conforms to their respective guidelines.
            </p>
          </section>

          <div style={{ height: '1px', backgroundColor: 'var(--border-color)' }} />

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} style={{ color: 'var(--warning)' }} />
              4. Cookies and Local Persistence
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
              We use secure browser cookies and localStorage mechanisms (like saving your custom themes and WhatsApp connection preferences) to persist settings locally. This ensures your dashboard session functions correctly and speeds up workspace load times.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
