import React from 'react';
import { Plus, Zap, AlertCircle, ToggleLeft, ToggleRight, Save, Trash2, X } from 'lucide-react';

export default function Automations({ automations, setAutomations }) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [formName, setFormName] = React.useState('');
  const [formKeyword, setFormKeyword] = React.useState('');
  const [formText, setFormText] = React.useState('');

  const handleToggle = (id) => {
    setAutomations(prev => prev.map(auto => {
      if (auto.id === id) {
        return { ...auto, active: !auto.active };
      }
      return auto;
    }));
  };

  const handleTextChange = (id, nextText) => {
    setAutomations(prev => prev.map(auto => {
      if (auto.id === id) {
        return { ...auto, triggerText: nextText };
      }
      return auto;
    }));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formText.trim()) {
      if (typeof window.showAlert === 'function') {
        window.showAlert("Name and Trigger Reply are required!", "Validation Error");
      } else {
        alert("Name and Trigger Reply are required!");
      }
      return;
    }

    const newAuto = {
      id: Date.now(),
      name: formName,
      active: true,
      keyword: formKeyword || null,
      triggerText: formText
    };

    setAutomations(prev => [...prev, newAuto]);
    setFormName('');
    setFormKeyword('');
    setFormText('');
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (typeof window.showConfirm === 'function') {
      window.showConfirm("Are you sure you want to delete this custom automation?", () => {
        setAutomations(prev => prev.filter(auto => auto.id !== id));
      }, "Delete Automation");
    } else if (window.confirm("Are you sure you want to delete this custom automation?")) {
      setAutomations(prev => prev.filter(auto => auto.id !== id));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.3s ease' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '700' }}>Smart Automations</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Configure instant responses, keyword handlers, and work schedules</p>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className="btn btn-primary"
          style={{ boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)' }}
        >
          <Plus size={16} />
          <span>Create Automation</span>
        </button>
      </div>

      {/* Info notice */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        backgroundColor: 'var(--primary-light)',
        color: 'var(--primary)',
        borderRadius: '8px',
        fontSize: '0.85rem',
        fontWeight: '500'
      }}>
        <AlertCircle size={18} />
        <span>Active automations will automatically reply to user messages in the <strong>Unified Inbox</strong> when matching triggers!</span>
      </div>

      {/* List of Automations */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '20px'
      }}>
        {automations.map((auto) => (
          <div key={auto.id} className="glass-panel" style={{
            padding: '24px',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            border: auto.active ? '1px solid var(--primary)' : '1px solid var(--border-color)',
            transition: 'var(--transition)'
          }}>
            {/* Row 1: Header & Toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  backgroundColor: auto.active ? 'var(--primary-light)' : 'var(--bg-tertiary)',
                  color: auto.active ? 'var(--primary)' : 'var(--text-muted)',
                  padding: '8px',
                  borderRadius: '8px'
                }}>
                  <Zap size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>{auto.name}</h3>
                  {auto.keyword ? (
                    <span style={{ fontSize: '0.7rem', color: 'var(--secondary)', fontWeight: '600' }}>
                      Trigger keyword: "{auto.keyword}"
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Global Event rule</span>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button 
                  onClick={() => handleToggle(auto.id)}
                  style={{ color: auto.active ? 'var(--primary)' : 'var(--text-muted)' }}
                >
                  {auto.active ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
                </button>
                {/* Delete button if it is a custom rule (id > 4) */}
                {auto.id > 4 && (
                  <button 
                    onClick={() => handleDelete(auto.id)}
                    style={{ color: 'var(--danger)', padding: '4px' }}
                    title="Delete automation"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Row 2: Editable text message */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Auto-Reply Text Message</label>
              <textarea 
                rows="3"
                value={auto.triggerText}
                onChange={(e) => handleTextChange(auto.id, e.target.value)}
                placeholder="Type the message to send back..."
                className="form-input"
                style={{ fontSize: '0.85rem', resize: 'vertical' }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Create Automation Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              onClick={() => setModalOpen(false)}
              style={{ position: 'absolute', right: '16px', top: '16px', color: 'var(--text-secondary)' }}
            >
              <X size={20} />
            </button>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', fontWeight: '700' }}>
              Create Custom Automation
            </h3>
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Automation Rule Name *</label>
                <input 
                  type="text" 
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="form-input"
                  placeholder="e.g. Refund Inquiry Handler"
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Keyword Trigger (Optional)</label>
                <input 
                  type="text" 
                  value={formKeyword}
                  onChange={(e) => setFormKeyword(e.target.value)}
                  className="form-input"
                  placeholder="e.g. refund (replies when customer types this word)"
                />
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Leave blank to run on all initial chats.</span>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Trigger Auto-Reply Message *</label>
                <textarea 
                  rows="3"
                  value={formText}
                  onChange={(e) => setFormText(e.target.value)}
                  className="form-input"
                  placeholder="Hi there! For refund questions, please email billing@domain.com. Thanks!"
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setModalOpen(false)}
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
                  Create Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
