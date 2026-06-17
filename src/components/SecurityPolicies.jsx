import React from 'react';
import { ShieldAlert, Cpu, Lock, Key, CheckCircle, ArrowLeft } from 'lucide-react';

export default function SecurityPolicies({ setViewMode }) {
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
            backgroundColor: 'rgba(16, 185, 129, 0.15)', 
            color: 'var(--success)', 
            padding: '12px', 
            borderRadius: '16px',
            marginBottom: '16px',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)'
          }}>
            <ShieldAlert size={32} />
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px', background: 'linear-gradient(45deg, var(--primary), var(--success))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Security Policies
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Last Updated: June 17, 2026 &bull; Compliance standard TLS 1.3
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
              <Cpu size={18} style={{ color: 'var(--primary)' }} />
              1. Infrastructure and Hosting Security
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
              ChatHub's servers are hosted in high-security, ISO 27001-certified enterprise data facilities. The platform maintains multi-zone server redundancies to prevent service outages, featuring automated recovery pipelines and continuous platform monitoring to guarantee 99.9% uptime.
            </p>
          </section>

          <div style={{ height: '1px', backgroundColor: 'var(--border-color)' }} />

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={18} style={{ color: 'var(--success)' }} />
              2. Data Encryption and Transport
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '12px' }}>
              All communications routing through ChatHub use maximum protocol compliance to guarantee secure transfers:
            </p>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><strong>Data in Transit:</strong> Secured via TLS 1.3 with high-strength cipher suites.</li>
              <li><strong>Data at Rest:</strong> Account settings and customer database logs are encrypted using AES-256 standard protocols.</li>
              <li><strong>API Security:</strong> Meta and Telegram connection tokens are stored as encrypted variables to prevent credential leakage.</li>
            </ul>
          </section>

          <div style={{ height: '1px', backgroundColor: 'var(--border-color)' }} />

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Key size={18} style={{ color: 'var(--secondary)' }} />
              3. Access Controls and Permissions
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
              ChatHub is built with fine-grained Workspace Role configuration (Admin, Manager, and Agent). Workspace Admins can customize team memberships and restrict access dynamically inside the Team Directory. All internal team messaging operations conform to strict authorization constraints.
            </p>
          </section>

          <div style={{ height: '1px', backgroundColor: 'var(--border-color)' }} />

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={18} style={{ color: 'var(--warning)' }} />
              4. Continuous Threat Monitoring
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
              We implement proactive threat management, including automatic rate-limiting on API endpoints to prevent DDoS attempts. Routine vulnerability sweeps are performed across dependencies and framework environments to secure our endpoints against emerging cyber threats.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
