import React from 'react';
import {
  MessageSquare, Users, Zap, FileText, BarChart3, Database,
  ArrowRight, ShieldCheck, Star, Play, CheckCircle2, ChevronRight,
  Sparkles, Send, ShoppingBag, Home, X
} from 'lucide-react';
import { BrandIcon } from './BrandIcons';
export default function LandingPage({ setViewMode, integrations, setIntegrations, openSignup }) {
  const [billingPeriod, setBillingPeriod] = React.useState('monthly');
  const [emailInput, setEmailInput] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);
  const [inputText, setInputText] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [focusedFeatureId, setFocusedFeatureId] = React.useState(null);
  const [activeSolutionCase, setActiveSolutionCase] = React.useState(null);

  const caseStudies = {
    1: {
      title: 'eCommerce & Retail Success Story',
      metric: '45% Sales Boost',
      challenge: 'High cart abandonment rates and slow replies on Instagram and WhatsApp DMs.',
      solution: 'Integrating Shopify store with ChatHub to send automated cart recovery codes and instant answers to product stock queries.',
      result: 'Recovered 30% of abandoned carts, resulting in a net 45% increase in month-over-month sales.'
    },
    2: {
      title: 'Customer Service Success Story',
      metric: '3x Faster Replies',
      challenge: 'Support agents drowning in browser tabs, resulting in a slow 15-minute response average.',
      solution: 'Unified inbox with automated keyword routing rules, canned templates, and team internal notes.',
      result: 'Response times plummeted to under 5 minutes (a 3x improvement) with a 40% increase in agent efficiency.'
    },
    3: {
      title: 'Real Estate Success Story',
      metric: '24/7 Autopilot',
      challenge: 'Losing hot property leads over weekends and evenings when agents were offline.',
      solution: 'Deploying custom automated chat flows to collect buyer budget, location, and contact details 24/7.',
      result: 'Captured 80% more qualified weekend leads and auto-scheduled open house appointments instantly.'
    },
    4: {
      title: 'Marketing Agency Success Story',
      metric: '100% Client Retention',
      challenge: 'Managing client social profiles securely without sharing direct passwords with junior staff.',
      solution: 'Utilizing ChatHub granular team permissions and multi-brand client workspaces with custom analytics exporting.',
      result: 'Zero security incidents, 100% client retention rate, and a 50% decrease in manual client reporting times.'
    }
  };

  const containerRef = React.useRef(null);
  const conversation = [
    { user: 'Can you share the latest campaign status?', response: 'Sure! Sending the update now.' },
    { user: 'Thanks for the quick response!', response: 'You\'re welcome! Happy to help.' }
  ];

  React.useEffect(() => {
    let currentIndex = 0;
    let charIndex = 0;
    let timeout;

    const typeInInput = () => {
      const userMsg = conversation[currentIndex].user;
      if (charIndex < userMsg.length) {
        setInputText(userMsg.substring(0, charIndex + 1));
        charIndex++;
        timeout = setTimeout(typeInInput, 60);
      } else {
        // Finished typing, now send the message
        timeout = setTimeout(() => {
          setMessages(prev => [...prev, { type: 'user', text: userMsg }]);
          setInputText('');

          // Show response after 1 second
          timeout = setTimeout(() => {
            setMessages(prev => [...prev, { type: 'response', text: conversation[currentIndex].response }]);

            // Move to next conversation and reset after 2 seconds
            timeout = setTimeout(() => {
              currentIndex = (currentIndex + 1) % conversation.length;
              charIndex = 0;
              if (currentIndex === 0) {
                setMessages([]);
              }
              typeInInput();
            }, 2000);
          }, 800);
        }, 600);
      }
    };

    typeInInput();

    return () => clearTimeout(timeout);
  }, []);

  const toggleIntegration = (id) => {
    setIntegrations(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, connected: !item.connected };
      }
      return item;
    }));
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - var(--navbar-height))', transition: 'var(--transition)' }}>
      {/* 01. HERO SECTION */}
      <header className="container hero-container" style={{
        paddingTop: '60px',
        paddingBottom: '60px',
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '40px',
        alignItems: 'center'
      }} id="hero">
        <div className="hero-text-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            borderRadius: '99px',
            fontSize: '0.85rem',
            fontWeight: '600',
            alignSelf: 'flex-start'
          }}>
            <Sparkles size={14} />
            <span>Introducing ChatHub AI Agent 2.0</span>
          </div>

          <h1 style={{
            fontSize: '3.6rem',
            lineHeight: '1.1',
            fontWeight: '800',
            letterSpacing: '-0.04em'
          }}>
            All Your Messages.<br />
            <span style={{
              background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>One Inbox.</span><br />
            <span style={{
              background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Zero Hassle.</span>
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-secondary)',
            maxWidth: '520px',
            lineHeight: '1.6'
          }}>
            Connect all your social media and messaging apps in one smart inbox.
          </p>

          <div className="hero-buttons-container" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '8px' }}>
            <button
              onClick={openSignup}
              className="btn btn-primary hero-btn-primary"
              style={{ padding: '14px 28px', fontSize: '1rem', borderRadius: 'var(--radius-sm)', fontWeight: '600', boxShadow: '0 6px 20px rgba(99, 102, 241, 0.3)', width: 'auto' }}
            >
              Get Started Free
            </button>
            <button
              onClick={() => {
                alert("Simulating demo: Launching our interactive app sandbox directly!");
                setViewMode('app');
              }}
              className="btn btn-secondary hero-btn-secondary"
              style={{ padding: '14px 28px', fontSize: '1rem', borderRadius: 'var(--radius-sm)', fontWeight: '600', width: 'auto' }}
            >
              <span>Book a Demo</span>
            </button>
          </div>

          <div className="hero-subtext" style={{ display: 'flex', gap: '20px', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} style={{ color: 'var(--success)' }} /> No Credit Card Required
            </span>
            <span className="desktop-only">•</span>
            <span className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Star size={16} style={{ color: 'var(--warning)', fill: 'var(--warning)' }} /> 14-day Free Trial
            </span>
          </div>

          <hr className="hero-divider" style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '8px 0', opacity: 0.4 }} />

          {/* Partner Brands */}
          <div className="hero-partners-container" style={{ marginTop: '8px' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Trusted by 2,000+ businesses
            </p>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', opacity: 0.75, alignItems: 'center' }} className="hero-partners-logos">
              {/* Circular Logo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: '700', fontSize: '0.95rem' }}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 17V7h4a3 3 0 0 1 0 6H9.5l3.5 4" stroke="var(--bg-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                <span>Remote</span>
              </div>
              {/* Shopify */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: '700', fontSize: '0.95rem' }}>
                <svg viewBox="0 0 448 512" width="18" height="18" fill="currentColor">
                  <path d="M433.9 129.9l-28.9-86.6c-4.8-14.4-18.2-24.1-33.4-24.1H76.4c-15.2 0-28.6 9.7-33.4 24.1L14.1 129.9c-2.3 6.9-2.1 14.4 .6 21.2l96 240c4.7 11.8 16.1 19.5 28.8 19.5h217c12.7 0 24.1-7.7 28.8-19.5l96-240c2.7-6.8 2.9-14.3 .6-21.2zM224 96c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z" />
                </svg>
                <span>shopify</span>
              </div>
              {/* Microsoft */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: '700', fontSize: '0.95rem' }}>
                <svg viewBox="0 0 23 23" width="18" height="18">
                  <path d="M0 0h11v11H0z" fill="#f25022" /><path d="M12 0h11v11H12z" fill="#7fba00" /><path d="M0 12h11v11H0z" fill="#00a4ef" /><path d="M12 12h11v11H12z" fill="#ffb900" />
                </svg>
                <span>Microsoft</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image Mockup (Laptop View Frame) */}
        <div className="desktop-only" style={{ display: 'flex', justifyContent: 'center', position: 'relative', pointerEvents: 'none', userSelect: 'none' }}>
          <div style={{
            width: '100%',
            aspectRatio: '16/10',
            backgroundColor: '#181829',
            borderRadius: '16px',
            border: '8px solid #334155',
            boxShadow: 'var(--shadow-lg)',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Laptop Screen Header */}
            <div style={{ height: '28px', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', padding: '0 12px', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
              <div style={{ margin: '0 auto', fontSize: '0.7rem', color: '#64748b' }}>app.chathub.com/inbox</div>
            </div>
            {/* Screen Inner Mockup */}
            <div style={{ flex: 1, backgroundColor: '#0f0f1a', display: 'flex', padding: '12px', gap: '10px' }}>
              <div style={{ width: '30%', borderRight: '1px solid #1e293b', paddingRight: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ height: '24px', backgroundColor: '#1e293b', borderRadius: '4px' }}></div>
                <div style={{ height: '36px', backgroundColor: '#334155', borderRadius: '6px' }}></div>
                <div style={{ height: '36px', backgroundColor: '#1e293b', borderRadius: '6px' }}></div>
                <div style={{ height: '36px', backgroundColor: '#1e293b', borderRadius: '6px' }}></div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ height: '30px', backgroundColor: '#1e293b', borderRadius: '6px', display: 'flex', alignItems: 'center', padding: '0 8px' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#a855f7' }}></div>
                </div>
                <div style={{ flex: 1, border: '1px dashed #334155', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'flex-end', overflow: 'hidden' }}>
                  {messages.map((msg, idx) => (
                    <div key={idx} style={{
                      alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                      padding: '8px 12px',
                      backgroundColor: msg.type === 'user' ? '#7c3aed' : '#1e293b',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      color: '#ffffff',
                      maxWidth: '75%',
                      wordWrap: 'break-word',
                      animation: 'slideIn 0.4s ease',
                      border: msg.type === 'response' ? '1px solid #334155' : 'none'
                    }}>
                      {msg.text}
                    </div>
                  ))}
                </div>
                <div style={{ height: '36px', display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <div style={{
                    flex: 1,
                    height: '100%',
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    padding: '0 10px',
                    color: inputText ? '#e2e8f0' : '#94a3b8',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative'
                  }}>
                    {inputText}<span style={{ opacity: 0.7, marginLeft: '2px', animation: 'blink 0.8s infinite' }}>▍</span>
                  </div>
                  <button
                    type="button"
                    style={{
                      width: '36px',
                      height: '36px',
                      backgroundColor: '#7c3aed',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6d28d9'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#7c3aed'}
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative Floating Card */}
          <div className="glass-panel pulse-active" style={{
            position: 'absolute',
            bottom: '-10px',
            left: '-10px',
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div style={{ backgroundColor: 'var(--success)', padding: '10px', borderRadius: '50%', display: 'flex', color: '#fff' }}>
              <CheckCircle2 size={16} />
            </div>

          </div>
        </div>
      </header>

      {/* 02. FEATURES SECTION */}
      <section id="features" className="glass-panel" style={{
        paddingTop: '80px',
        paddingBottom: '80px',
        borderLeft: 'none',
        borderRight: 'none',
        backgroundColor: 'var(--bg-secondary)',
        transition: 'var(--transition)'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--primary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Capabilities</span>
            <h2 className="features-section-title" style={{ fontSize: '2.5rem', fontWeight: '800' }}>Powerful Features Built to Simplify Communication</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              Everything you need to orchestrate chat channels, empower agents, and automate repetitive client interactions.
            </p>
          </div>

          <div className="features-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {[
              {
                id: 1,
                title: 'Unified Inbox',
                desc: 'All incoming messages from different social channels stream into a single clean column. No tab switching needed. Keep track of conversations in real-time, respond instantly, and improve your customer support workflow.',
                icon: <MessageSquare size={24} />,
                bgColor: 'var(--primary-light)',
                color: 'var(--primary)'
              },
              {
                id: 2,
                title: 'Team Collaboration',
                desc: 'Assign individual chats to different support representatives, write internal notes, and transfer client sessions seamlessly. Collaborate on customer queries to resolve issues faster and keep team communication synchronized.',
                icon: <Users size={24} />,
                bgColor: 'rgba(236, 72, 153, 0.15)',
                color: 'var(--secondary)'
              },
              {
                id: 3,
                title: 'Smart Automations',
                desc: 'Create automated welcome greetings, out-of-office autoreplies, and message routing maps without editing single code string. Save time by automating repetitive workflows and standard query responses.',
                icon: <Zap size={24} />,
                bgColor: 'rgba(16, 185, 129, 0.15)',
                color: 'var(--success)'
              },
              {
                id: 4,
                title: 'Message Templates',
                desc: 'Save pre-configured reply strings for standard queries. Send detailed templates with dynamic keyboard shortcuts. Improve agent speed and ensure brand consistency across all customer communications.',
                icon: <FileText size={24} />,
                bgColor: 'rgba(245, 158, 11, 0.15)',
                color: 'var(--warning)'
              },
              {
                id: 5,
                title: 'Advanced Analytics',
                desc: 'Monitor volume trends, average response latency, and agent workloads through premium analytical charts. Make data-driven decisions to optimize team performance and track customer satisfaction trends.',
                icon: <BarChart3 size={24} />,
                bgColor: 'rgba(99, 102, 241, 0.15)',
                color: 'var(--primary)'
              },
              {
                id: 6,
                title: 'Contact Management (CRM)',
                desc: 'Build customer profiles with channel preferences, detailed contact parameters, and tag classifications. Understand customer history and build personalized experiences for every client.',
                icon: <Database size={24} />,
                bgColor: 'rgba(236, 72, 153, 0.15)',
                color: 'var(--secondary)'
              }
            ].map((feat) => (
              <div
                key={feat.id}
                className="glass-panel feature-card"
                style={{ padding: '30px', borderRadius: 'var(--radius-md)', transition: 'var(--transition)' }}
              >
                <div className="icon-wrapper" style={{ backgroundColor: feat.bgColor, color: feat.color }}><div style={{ display: 'flex' }}>{feat.icon}</div></div>
                <h3 style={{ margin: '16px 0 8px' }}>{feat.title}</h3>
                <p className="feature-desc" style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                  {feat.desc}
                </p>
                <div className="mobile-only-view-more" style={{ display: 'none' }}>
                  <button
                    onClick={() => setFocusedFeatureId(feat.id)}
                    style={{
                      color: 'var(--primary)',
                      fontWeight: '600',
                      fontSize: '0.85rem',
                      marginTop: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    View More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Focus Modal Overlay for Mobile */}
          {focusedFeatureId !== null && (
            <div
              onClick={() => setFocusedFeatureId(null)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.8)',
                zIndex: 100000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}
            >
              {(() => {
                const list = [
                  { id: 1, title: 'Unified Inbox', desc: 'All incoming messages from different social channels stream into a single clean column. No tab switching needed. Keep track of conversations in real-time, respond instantly, and improve your customer support workflow.', icon: <MessageSquare size={24} />, bgColor: 'var(--primary-light)', color: 'var(--primary)' },
                  { id: 2, title: 'Team Collaboration', desc: 'Assign individual chats to different support representatives, write internal notes, and transfer client sessions seamlessly. Collaborate on customer queries to resolve issues faster and keep team communication synchronized.', icon: <Users size={24} />, bgColor: 'rgba(236, 72, 153, 0.15)', color: 'var(--secondary)' },
                  { id: 3, title: 'Smart Automations', desc: 'Create automated welcome greetings, out-of-office autoreplies, and message routing maps without editing single code string. Save time by automating repetitive workflows and standard query responses.', icon: <Zap size={24} />, bgColor: 'rgba(16, 185, 129, 0.15)', color: 'var(--success)' },
                  { id: 4, title: 'Message Templates', desc: 'Save pre-configured reply strings for standard queries. Send detailed templates with dynamic keyboard shortcuts. Improve agent speed and ensure brand consistency across all customer communications.', icon: <FileText size={24} />, bgColor: 'rgba(245, 158, 11, 0.15)', color: 'var(--warning)' },
                  { id: 5, title: 'Advanced Analytics', desc: 'Monitor volume trends, average response latency, and agent workloads through premium analytical charts. Make data-driven decisions to optimize team performance and track customer satisfaction trends.', icon: <BarChart3 size={24} />, bgColor: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary)' },
                  { id: 6, title: 'Contact Management (CRM)', desc: 'Build customer profiles with channel preferences, detailed contact parameters, and tag classifications. Understand customer history and build personalized experiences for every client.', icon: <Database size={24} />, bgColor: 'rgba(236, 72, 153, 0.15)', color: 'var(--secondary)' }
                ];
                const feat = list.find(f => f.id === focusedFeatureId);
                if (!feat) return null;
                return (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="glass-panel"
                    style={{
                      width: '100%',
                      maxWidth: '360px',
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: 'var(--radius-md)',
                      padding: '24px',
                      textAlign: 'center',
                      border: '2px solid var(--primary)',
                      boxShadow: 'var(--shadow-lg)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '16px',
                      animation: 'fadeIn 0.3s ease'
                    }}
                  >
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '12px',
                      backgroundColor: feat.bgColor,
                      color: feat.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <div style={{ display: 'flex' }}>{feat.icon}</div>
                    </div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--text-primary)' }}>{feat.title}</h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                      {feat.desc}
                    </p>
                    <button
                      onClick={() => setFocusedFeatureId(null)}
                      className="btn btn-primary"
                      style={{ width: '100%', padding: '10px 0', marginTop: '10px' }}
                    >
                      Close Details
                    </button>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </section>

      {/* 02.5 SOLUTIONS SECTION */}
      <section id="solutions" style={{
        paddingTop: '80px',
        paddingBottom: '80px',
        borderBottom: '1px solid var(--border-color)',
        transition: 'var(--transition)'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--primary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Solutions Overview</span>
            <h2 className="solutions-section-title" style={{ fontSize: '2.5rem', fontWeight: '800' }}>Industries That Win with ChatHub</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              From fast-growing retail brands to professional agencies, discover how teams use ChatHub to dominate their customer relationships.
            </p>
          </div>

          <div className="solutions-grid">
            {[
              {
                id: 1,
                title: 'eCommerce & Retail',
                desc: 'Turn chat requests into immediate checkouts. Connect WhatsApp, Instagram, and web chat to recover abandoned shopping carts, answer product stock questions, and process orders on the fly.',
                icon: <ShoppingBag size={24} />,
                bgColor: 'var(--primary-light)',
                color: 'var(--primary)',
                metric: '45% Sales Boost'
              },
              {
                id: 2,
                title: 'Customer Service Teams',
                desc: 'Ditch the tab-switching browser chaos. Assign incoming sessions to specific agents, write invisible internal team notes, and track resolution speeds using real-time dashboard analytics.',
                icon: <Users size={24} />,
                bgColor: 'rgba(236, 72, 153, 0.15)',
                color: 'var(--secondary)',
                metric: '3x Faster Replies'
              },
              {
                id: 3,
                title: 'Real Estate & Properties',
                desc: 'Capture and reply to listing inquiries 24/7. Use smart keywords to route hot leads to agents, send digital walk-through videos, and coordinate open-house appointments automatically.',
                icon: <Home size={24} />,
                bgColor: 'rgba(16, 185, 129, 0.15)',
                color: 'var(--success)',
                metric: '24/7 Autopilot'
              },
              {
                id: 4,
                title: 'Marketing & Ad Agencies',
                desc: 'Manage dozens of client social profiles inside one neat workspace. Create discrete team permissions, automate greeting campaigns, and export clean, unified customer reports.',
                icon: <Zap size={24} />,
                bgColor: 'rgba(245, 158, 11, 0.15)',
                color: 'var(--warning)',
                metric: '100% Client Retention'
              }
            ].map((sol) => (
              <div
                key={sol.id}
                className="glass-panel solution-card"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="icon-wrapper" style={{ backgroundColor: sol.bgColor, color: sol.color }}>
                    <div style={{ display: 'flex' }}>{sol.icon}</div>
                  </div>
                  <span className="solution-metric">{sol.metric}</span>
                </div>
                <h3 style={{ margin: '8px 0 4px', fontSize: '1.25rem', fontWeight: '700' }}>{sol.title}</h3>
                <p className="solution-desc" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5', flexGrow: 1 }}>
                  {sol.desc}
                </p>
                <div 
                  onClick={() => setActiveSolutionCase(caseStudies[sol.id])}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer', marginTop: '12px' }} 
                  className="solution-action"
                >
                  <span>See How They Win</span>
                  <ChevronRight size={14} className="solution-arrow" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03. INTEGRATIONS SECTION */}
      <section id="integrations" className="container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--primary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Channels ecosystem</span>
          <h2 className="integrations-section-title" style={{ fontSize: '2.5rem', fontWeight: '800' }}>Connect Your Favorite Platforms</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Integrate chat networks in just one click to sync conversations. Run multiple channels in a single screen.
          </p>
        </div>

        <div className="integrations-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '20px'
        }}>
          {integrations.map((item) => (
            <div key={item.id} className="glass-panel integration-card" style={{
              padding: '24px 16px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              textAlign: 'center',
              border: item.connected ? '1.5px solid var(--success)' : '1px solid var(--border-color)',
              transition: 'var(--transition)'
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }} className="brand-logo-container integration-logo">
                <BrandIcon name={item.name} style={{ width: '100%', height: '100%', borderRadius: '50%', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
              </div>
              <div>
                <h4 className="integration-name" style={{ fontSize: '1rem', fontWeight: '600' }}>{item.name}</h4>
                <p className="integration-status" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.connected ? 'Connected' : 'Disconnected'}</p>
              </div>
              <button
                onClick={() => toggleIntegration(item.id)}
                className="btn integration-btn"
                style={{
                  padding: '4px 12px',
                  fontSize: '0.75rem',
                  borderRadius: '99px',
                  backgroundColor: item.connected ? 'rgba(16, 185, 129, 0.1)' : 'var(--primary-light)',
                  color: item.connected ? 'var(--success)' : 'var(--primary)',
                  fontWeight: '600',
                  border: 'none',
                  width: '100%'
                }}
              >
                {item.connected ? 'Connected' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 04. PRICING SECTION */}
      <section id="pricing" className="glass-panel" style={{
        paddingTop: '80px',
        paddingBottom: '80px',
        borderLeft: 'none',
        borderRight: 'none',
        backgroundColor: 'var(--bg-secondary)',
        transition: 'var(--transition)'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--primary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Simple, Transparent Pricing</span>
            <h2 className="pricing-section-title" style={{ fontSize: '2.5rem', fontWeight: '800' }}>Choose the Plan That's Right for You</h2>

            {/* Toggle Switch */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: 'var(--bg-tertiary)',
              padding: '4px',
              borderRadius: '99px',
              border: '1px solid var(--border-color)',
              marginTop: '16px'
            }}>
              <button
                onClick={() => setBillingPeriod('monthly')}
                style={{
                  padding: '6px 18px',
                  borderRadius: '99px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  backgroundColor: billingPeriod === 'monthly' ? 'var(--bg-secondary)' : 'transparent',
                  color: billingPeriod === 'monthly' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  boxShadow: billingPeriod === 'monthly' ? 'var(--shadow)' : 'none',
                  transition: 'var(--transition)'
                }}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                style={{
                  padding: '6px 18px',
                  borderRadius: '99px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  backgroundColor: billingPeriod === 'yearly' ? 'var(--bg-secondary)' : 'transparent',
                  color: billingPeriod === 'yearly' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  boxShadow: billingPeriod === 'yearly' ? 'var(--shadow)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'var(--transition)'
                }}
              >
                <span>Yearly Save 20%</span>
              </button>
            </div>
          </div>

          <div className="pricing-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            maxWidth: '1000px',
            margin: '0 auto',
            alignItems: 'stretch'
          }}>
            {/* Starter Plan */}
            <div className="glass-panel pricing-card" style={{
              padding: '36px 24px',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'var(--transition)'
            }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Starter</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', margin: '20px 0' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: '800' }}>
                    ${billingPeriod === 'monthly' ? '19' : '15'}
                  </span>
                  <span style={{ color: 'var(--text-muted)', marginLeft: '4px' }}>/ month</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>Perfect for small businesses getting started.</p>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['3 Social Channels', '1 Team Member', 'Basic Templates', 'Basic Analytics'].map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--success)' }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={openSignup}
                className="btn btn-secondary"
                style={{ width: '100%', marginTop: '30px' }}
              >
                Get Started
              </button>
            </div>

            {/* Growth Plan (Popular) */}
            <div className="glass-panel pricing-card" style={{
              padding: '36px 24px',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--primary)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              boxShadow: 'var(--shadow-lg)',
              transition: 'var(--transition)'
            }}>
              <div style={{
                position: 'absolute',
                top: '-14px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'var(--primary)',
                color: '#ffffff',
                padding: '4px 12px',
                borderRadius: '99px',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Most Popular
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: '600' }}>Growth</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', margin: '20px 0' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: '800' }}>
                    ${billingPeriod === 'monthly' ? '49' : '39'}
                  </span>
                  <span style={{ color: 'var(--text-muted)', marginLeft: '4px' }}>/ month</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>Ideal for growing support operations.</p>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['10 Social Channels', '5 Team Members', 'Unlimited Templates', 'Advanced Analytics', 'Automation Triggers'].map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--success)' }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={openSignup}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '30px', boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)' }}
              >
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="glass-panel pricing-card" style={{
              padding: '36px 24px',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'var(--transition)'
            }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Pro</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', margin: '20px 0' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: '800' }}>
                    ${billingPeriod === 'monthly' ? '99' : '79'}
                  </span>
                  <span style={{ color: 'var(--text-muted)', marginLeft: '4px' }}>/ month</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>For large enterprises demanding scale.</p>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['Unlimited Channels', 'Unlimited Team Members', 'Priority 24/7 Support', 'Custom Integrations', 'Dedicated Account Manager'].map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--success)' }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={openSignup}
                className="btn btn-secondary"
                style={{ width: '100%', marginTop: '30px' }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 05. FOOTER */}
      <footer style={{
        backgroundColor: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-color)',
        paddingTop: '60px',
        paddingBottom: '30px',
        transition: 'var(--transition)'
      }}>
        <div className="container footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 0.6fr 0.6fr 0.6fr 1.2fr',
          gap: '30px',
          marginBottom: '40px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ padding: '2px', display: 'flex' }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                  <path d="M18 7c0-2.76-2.24-5-5-5S8 4.24 8 7c0 1.13.38 2.16 1.01 3L8 14l4.5-1.5c.16.03.33.05.5.05 2.76 0 5-2.24 5-5z" fill="url(#footerLogoGrad)" />
                  <path d="M12 11c0 2.21-1.79 4-4 4-.4 0-.78-.06-1.14-.17L3 17l1.05-3.15C3.39 12.98 3 12.03 3 11c0-2.21 1.79-4 4-4s4 1.79 4 4z" fill="#ec4899" fillOpacity="0.85" />
                </svg>
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: '700', fontFamily: 'var(--font-heading)' }}>ChatHub</span>
            </div>
            <p className="footer-brand-desc" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              All your messages. One inbox. Simplify communications and scale client happiness.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '16px' }}>Product</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <a href="#features" className="hover-link">Features</a>
              <a href="#integrations" className="hover-link">Integrations</a>
              <a href="#pricing" className="hover-link">Pricing</a>
              <a href="#" className="hover-link">Changelog</a>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '16px' }}>Resources</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <a href="#" className="hover-link">Blog</a>
              <a href="#" className="hover-link">Guides</a>
              <a href="#" className="hover-link">Help Center</a>
              <a href="#" className="hover-link">API Docs</a>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '16px' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <a href="#" className="hover-link">About Us</a>
              <a href="#" className="hover-link">Contact Us</a>
              <a href="#" className="hover-link">Careers</a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setViewMode('privacy'); }} 
                className="hover-link"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-primary)' }}>Stay Updated</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Subscribe to our newsletter for latest product tips and marketing guides.</p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                className="form-input"
                style={{ fontSize: '0.85rem' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px' }}>
                {subscribed ? 'Subscribed!' : <ArrowRight size={16} />}
              </button>
            </form>
          </div>
        </div>

        <div className="container" style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <span className="footer-copyright">&copy; {new Date().getFullYear()} ChatHub Inc. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '20px' }} className="footer-bottom-links">
            <a href="#" className="hover-link">Terms of Service</a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setViewMode('privacy'); }} 
              className="hover-link"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setViewMode('security'); }} 
              className="hover-link"
            >
              Security Policies
            </a>
          </div>
        </div>
      </footer>

      {activeSolutionCase && (
        <div className="modal-overlay" onClick={() => setActiveSolutionCase(null)}>
          <div 
            className="modal-content glass-panel" 
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '500px', padding: '30px', position: 'relative' }}
          >
            <button 
              onClick={() => setActiveSolutionCase(null)} 
              style={{ position: 'absolute', top: '16px', right: '16px', color: 'var(--text-muted)' }}
            >
              <X size={20} />
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ 
                  fontSize: '0.8rem', 
                  fontWeight: '700', 
                  padding: '4px 10px', 
                  backgroundColor: 'var(--primary-light)', 
                  color: 'var(--primary)', 
                  borderRadius: '99px',
                  textTransform: 'uppercase'
                }}>{activeSolutionCase.metric}</span>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>{activeSolutionCase.title}</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '700', marginBottom: '4px' }}>The Challenge</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{activeSolutionCase.challenge}</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '700', marginBottom: '4px' }}>The Solution</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{activeSolutionCase.solution}</p>
                </div>
                <div style={{ padding: '12px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', borderLeft: '3px solid var(--success)' }}>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--success)', fontWeight: '700', marginBottom: '4px' }}>The Result</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', fontWeight: '500' }}>{activeSolutionCase.result}</p>
                </div>
              </div>
              
              <button 
                className="btn btn-primary" 
                onClick={() => setActiveSolutionCase(null)}
                style={{ width: '100%', padding: '10px 0', marginTop: '10px' }}
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inline styles for Landing page responsiveness */}
      <style>{`
        .icon-wrapper {
          width: 46px;
          height: 46px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .solutions-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .solution-card {
          padding: 30px 24px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: var(--transition);
          position: relative;
          background: var(--bg-glass);
          border: 1px solid var(--border-glass);
          box-shadow: var(--shadow);
          overflow: hidden;
        }
        .solution-card:hover {
          border-color: var(--primary);
          box-shadow: var(--shadow-lg);
        }
        .solution-metric {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 10px;
          background-color: var(--primary-light);
          color: var(--primary);
          border-radius: 99px;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }
        [data-theme="dark"] .solution-metric {
          background-color: rgba(168, 85, 247, 0.15);
          color: #d8b4fe;
        }
        .solution-arrow {
          transition: transform 0.2s ease;
        }
        .feature-card:hover {
          border-color: var(--primary);
          box-shadow: var(--shadow-lg);
        }
        .glass-panel:hover .brand-logo-container {
          transform: scale(1.12) rotate(4deg);
        }
        .pricing-card:hover {
          box-shadow: var(--shadow-lg);
        }
        .hover-link:hover {
          color: var(--primary);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.2; }
        }
        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr 1fr !important;
          }
          header {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          header div {
            align-items: center !important;
            align-self: center !important;
          }
          header p {
            margin: 0 auto;
          }
        }
        @media (max-width: 1170px) {
          .solutions-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 1000px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-only {
            display: block !important;
          }
          header.hero-container {
            text-align: left !important;
            padding-top: 30px !important;
            padding-bottom: 30px !important;
          }
          header.hero-container .hero-text-container {
            align-items: flex-start !important;
            text-align: left !important;
          }
          header.hero-container h1 {
            font-size: 2.6rem !important;
            text-align: left !important;
          }
          header.hero-container p {
            margin: 0 !important;
            text-align: left !important;
            font-size: 1.15rem !important;
          }
          .hero-buttons-container {
            flex-direction: column !important;
            width: 100% !important;
            gap: 12px !important;
          }
          .hero-btn-primary, .hero-btn-secondary {
            width: auto !important;
            min-width: 220px !important;
            max-width: 280px !important;
            padding: 12px 24px !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            align-self: flex-start !important;
          }
          .hero-btn-secondary {
            background-color: rgba(255, 255, 255, 0.03) !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            color: var(--text-primary) !important;
          }
          .hero-subtext {
            justify-content: center !important;
            width: 100% !important;
            margin-top: 8px !important;
          }
          .hero-divider {
            display: none !important;
          }
          .hero-partners-container {
            display: none !important;
          }
          .features-section-title, .solutions-section-title {
            font-size: 1.4rem !important;
          }
          .features-grid, .solutions-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          .solution-card {
            padding: 20px 16px !important;
            border-radius: var(--radius-sm) !important;
            min-height: auto !important;
          }
          .feature-card {
            padding: 16px 10px !important;
            border-radius: var(--radius-sm) !important;
            text-align: center !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: space-between !important;
            min-height: 230px !important;
          }
          .feature-card h3 {
            font-size: 0.9rem !important;
            margin: 8px 0 4px !important;
            text-align: center !important;
          }
          .feature-card p.feature-desc {
            font-size: 0.72rem !important;
            line-height: 1.35 !important;
            text-align: center !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 4 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
            margin-bottom: 6px !important;
          }
          .feature-card .icon-wrapper {
            width: 36px !important;
            height: 36px !important;
            margin: 0 auto !important;
          }
          .feature-card .icon-wrapper svg {
            width: 18px !important;
            height: 18px !important;
          }
          .mobile-only-view-more {
            display: block !important;
            text-align: center !important;
            width: 100% !important;
          }
          .pricing-section-title {
            font-size: 1.4rem !important;
          }
          #pricing {
            padding-top: 40px !important;
            padding-bottom: 40px !important;
          }
          .pricing-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
            max-width: 100% !important;
          }
          .pricing-grid .pricing-card:last-child {
            grid-column: 1 / -1 !important;
            max-width: 50% !important;
            margin: 0 auto !important;
            width: 100% !important;
          }
          .pricing-card {
            padding: 20px 14px !important;
          }
          .pricing-card h3 {
            font-size: 1.1rem !important;
          }
          .pricing-card > div > div > span:first-child {
            font-size: 1.8rem !important;
          }
          .pricing-card > div > p {
            font-size: 0.78rem !important;
            margin-bottom: 14px !important;
          }
          .pricing-card > div > div[style*='flex-direction: column'] > div {
            font-size: 0.78rem !important;
            gap: 6px !important;
          }
          .pricing-card button {
            margin-top: 16px !important;
            padding: 8px 12px !important;
            font-size: 0.85rem !important;
          }
          .integrations-section-title {
            font-size: 1.4rem !important;
          }
          #integrations {
            display: none !important;
          }
          #integrations > div:first-child {
            margin-bottom: 24px !important;
          }
          .integrations-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
          .integration-card {
            padding: 14px 10px !important;
            gap: 8px !important;
          }
          .integration-logo {
            width: 36px !important;
            height: 36px !important;
          }
          .integration-name {
            font-size: 0.82rem !important;
            font-weight: 600 !important;
          }
          .integration-status {
            font-size: 0.68rem !important;
          }
          .integration-btn {
            padding: 3px 8px !important;
            font-size: 0.7rem !important;
          }
        }
        @media (max-width: 1000px) and (min-width: 701px) {
          .hero-buttons-container {
            flex-direction: row !important;
            width: 100% !important;
            justify-content: flex-start !important;
            align-items: center !important;
            display: flex !important;
          }
        }
        @media (max-width: 576px) {
          .solutions-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .footer-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 20px !important;
          }
          .footer-grid > div:nth-child(5) {
            display: none !important;
          }
          .footer-bottom-links {
            display: none !important;
          }
          .footer-brand-desc {
            font-size: 0.72rem !important;
            line-height: 1.4 !important;
          }
          .footer-copyright {
            display: block !important;
            text-align: center !important;
            width: 100% !important;
          }
          h1 {
            font-size: 2.0rem !important;
          }
          #pricing {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
