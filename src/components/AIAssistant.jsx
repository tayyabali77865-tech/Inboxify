import React from 'react';
import { Sparkles, MessageSquare, Copy, ArrowRight, RotateCw, Check } from 'lucide-react';

export default function AIAssistant({ contacts, setTab }) {
  const [selectedCustomer, setSelectedCustomer] = React.useState('');
  const [customerQuery, setCustomerQuery] = React.useState('');
  const [aiDraft, setAiDraft] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const predefinedQueries = {
    'John Smith': "I'm looking for a premium billing plan that handles 10+ social accounts. Can you send the pricing details?",
    'Sarah Johnson': "How do I trigger an away message after hours?",
    'Mike Brown': "I have not received my invoice for May 2026. Can you resend it?",
    'Emma Wilson': "Thanks for the onboard help! Do you support API access?"
  };

  const handleSelectCustomer = (name) => {
    setSelectedCustomer(name);
    setCustomerQuery(predefinedQueries[name] || "Hello, I need help with my account setup.");
    setAiDraft('');
  };

  const generateResponse = () => {
    if (!selectedCustomer) {
      alert("Please select a customer query first!");
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      let draft = "";
      
      if (selectedCustomer === 'John Smith') {
        draft = `Hi John! Thanks for reaching out. For your team's needs, our **Growth Plan** ($49/mo) supports up to 10 social channels, and our **Pro Plan** ($99/mo) supports unlimited channels. You can review all features on our Pricing page: chathub.com/#pricing. Let me know if you'd like to schedule a quick call!`;
      } else if (selectedCustomer === 'Sarah Johnson') {
        draft = `Hi Sarah! To configure out-of-office automations, simply head over to the **Automations** tab in your dashboard, select the 'Away Message' rule, edit the auto-reply message text, and toggle the rule to Active. It will auto-respond during off-hours.`;
      } else if (selectedCustomer === 'Mike Brown') {
        draft = `Hi Mike! Apologies for the invoice delay. I've located your invoice for May 2026 and have re-sent a copy in PDF format to your email address (mike.b@example.com). Please check your spam folder if it doesn't appear in 5 minutes!`;
      } else if (selectedCustomer === 'Emma Wilson') {
        draft = `Hi Emma! It was a pleasure helping you onboard. Yes! ChatHub supports robust REST API developer endpoints on all Growth and Pro tiers. You can read our technical specifications under the General Settings billing docs. Let me know if you need token keys!`;
      } else {
        draft = `Hi! Thanks for getting in touch. I'd be happy to assist you with your account setup. Could you please specify which step you're currently working on?`;
      }

      setAiDraft(draft);
    }, 1200);
  };

  const handleCopy = () => {
    if (!aiDraft) return;
    navigator.clipboard.writeText(aiDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.3s ease' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={24} style={{ color: 'var(--primary)' }} />
          <span>Smart AI Copilot</span>
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Draft customer replies instantly using intelligent machine learning models</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.2fr',
        gap: '24px'
      }} className="ai-layout">
        
        {/* Left Side: Input selection */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '12px' }}>1. Select Customer Query</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {Object.keys(predefinedQueries).map(name => (
                <button
                  key={name}
                  onClick={() => handleSelectCustomer(name)}
                  className="btn btn-secondary"
                  style={{
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    borderColor: selectedCustomer === name ? 'var(--primary)' : 'var(--border-color)',
                    backgroundColor: selectedCustomer === name ? 'var(--primary-light)' : 'var(--bg-secondary)',
                    color: selectedCustomer === name ? 'var(--primary)' : 'var(--text-primary)'
                  }}
                >
                  <MessageSquare size={16} />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: '600', fontSize: '0.85rem' }}>{name}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '240px' }}>
                      {predefinedQueries[name]}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedCustomer && (
            <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: '600' }}>Active Customer Request:</h4>
              <p style={{
                padding: '14px',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-tertiary)',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.5',
                borderLeft: '4px solid var(--primary)'
              }}>
                "{customerQuery}"
              </p>
              
              <button 
                onClick={generateResponse}
                className="btn btn-primary"
                disabled={isGenerating}
                style={{ width: '100%', marginTop: '10px', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)' }}
              >
                {isGenerating ? (
                  <>
                    <RotateCw size={16} className="spin" />
                    <span>Analyzing Request...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>Generate AI Suggestion</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Output response drafts */}
        <div className="glass-panel" style={{
          padding: '24px',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '340px'
        }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '16px' }}>2. AI Generated Response Draft</h3>
            
            {aiDraft ? (
              <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <textarea 
                  rows="8"
                  value={aiDraft}
                  onChange={(e) => setAiDraft(e.target.value)}
                  className="form-input"
                  style={{
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    backgroundColor: 'var(--bg-tertiary)',
                    fontFamily: 'inherit',
                    resize: 'none'
                  }}
                />
                
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    onClick={handleCopy}
                    className="btn btn-secondary"
                    style={{ flex: 1, padding: '10px' }}
                  >
                    {copied ? <Check size={16} style={{ color: 'var(--success)' }} /> : <Copy size={16} />}
                    <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      alert(`Opening Unified Inbox! Copy paste this answer to your chat window: \n\n"${aiDraft}"`);
                      setTab('inbox');
                    }}
                    className="btn btn-primary"
                    style={{ flex: 1.2, padding: '10px', gap: '6px' }}
                  >
                    <span>Insert Draft to Inbox</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: 'var(--text-muted)',
                padding: '40px 20px',
                border: '2px dashed var(--border-color)',
                borderRadius: '8px'
              }}>
                <Sparkles size={36} style={{ marginBottom: '12px', opacity: 0.4 }} />
                <p style={{ fontSize: '0.85rem' }}>AI suggested reply text will render here. Choose a query and hit generate.</p>
              </div>
            )}
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '6px', marginTop: '20px' }}>
            <span>💡</span>
            <span>Tip: You can modify the generated draft reply before copying it to your clip clipboard.</span>
          </div>
        </div>

      </div>

      <style>{`
        .spin {
          animation: spin 1s infinite linear;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .ai-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
