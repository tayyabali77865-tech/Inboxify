import React from 'react';
import { Scale, FileText, ShieldAlert, UserCheck, RefreshCw, ArrowLeft } from 'lucide-react';

export default function TermsOfService({ setViewMode }) {
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
            <Scale size={32} />
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px', background: 'linear-gradient(45deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Terms of Service
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Last Updated: June 18, 2026 &bull; Version 1.0
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
              <UserCheck size={18} style={{ color: 'var(--primary)' }} />
              1. Acceptance of Terms
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
              By creating an account or using ChatHub (referred to as the "Service"), you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not register for or use the Service.
            </p>
          </section>

          <div style={{ height: '1px', backgroundColor: 'var(--border-color)' }} />

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} style={{ color: 'var(--secondary)' }} />
              2. Description of Service
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
              ChatHub is a multi-channel unified inbox and customer relationships platform. We provide tools to integrate third-party messaging services (including WhatsApp Business, Instagram, Telegram, Messenger, and others) into a single collaborative panel.
            </p>
          </section>

          <div style={{ height: '1px', backgroundColor: 'var(--border-color)' }} />

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={18} style={{ color: 'var(--danger)' }} />
              3. User Conduct and Security
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '12px' }}>
              You are responsible for maintaining the confidentiality of your credentials and credentials/tokens linked to connected social media platforms. You agree to:
            </p>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Not use the Service to broadcast spam, unauthorized marketing messages, or malicious content.</li>
              <li>Comply with all developer terms and policies set by third-party services you connect (e.g. Meta Developer Policies).</li>
              <li>Ensure all messaging logs transmitted through our API routing conform to active digital communication laws.</li>
            </ul>
          </section>

          <div style={{ height: '1px', backgroundColor: 'var(--border-color)' }} />

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RefreshCw size={18} style={{ color: 'var(--success)' }} />
              4. Changes and Modifications
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
              We reserve the right to update or modify these Terms at any time. When we make revisions, we will update the "Last Updated" date at the top of this page. Your continued use of the Service after changes constitute acceptance of the new Terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
