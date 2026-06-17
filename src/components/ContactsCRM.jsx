import React from 'react';
import { Plus, Search, Edit2, Trash2, Filter, Mail, Phone, Tag, X, UserPlus } from 'lucide-react';
import { BrandIcon } from './BrandIcons';

export default function ContactsCRM({ contacts, setContacts }) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [tagFilter, setTagFilter] = React.useState('All');
  const [channelFilter, setChannelFilter] = React.useState('All');
  
  // Modal states
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingContact, setEditingContact] = React.useState(null);
  
  // Form states
  const [formName, setFormName] = React.useState('');
  const [formEmail, setFormEmail] = React.useState('');
  const [formPhone, setFormPhone] = React.useState('');
  const [formChannel, setFormChannel] = React.useState('WhatsApp');
  const [formTag, setFormTag] = React.useState('Lead');
  const [selectedTagOption, setSelectedTagOption] = React.useState('Lead');

  const openAddModal = () => {
    setEditingContact(null);
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormChannel('WhatsApp');
    setFormTag('Lead');
    setModalOpen(true);
  };

  const openEditModal = (contact) => {
    setEditingContact(contact);
    setFormName(contact.name);
    setFormEmail(contact.email || '');
    setFormPhone(contact.phone || '');
    setFormChannel(contact.channel || 'WhatsApp');
    setFormTag(contact.tag || '');
    setSelectedTagOption(['Lead', 'Customer', 'VIP'].includes(contact.tag) ? contact.tag : (contact.tag ? 'Other' : 'Lead'));
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (typeof window.showConfirm === 'function') {
      window.showConfirm("Are you sure you want to delete this contact?", () => {
        setContacts(prev => prev.map(c => c.id === id ? { ...c, deletedFromCRM: true, tag: '' } : c));
      }, "Delete Contact");
    } else if (window.confirm("Are you sure you want to delete this contact?")) {
      setContacts(prev => prev.map(c => c.id === id ? { ...c, deletedFromCRM: true, tag: '' } : c));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) {
      if (typeof window.showAlert === 'function') {
        window.showAlert("Name and Email are required!", "Validation Error");
      } else {
        alert("Name and Email are required!");
      }
      return;
    }

    if (editingContact) {
      // Edit mode
      setContacts(prev => prev.map(c => {
        if (c.id === editingContact.id) {
          return {
            ...c,
            name: formName,
            email: formEmail,
            phone: formPhone,
            channel: formChannel,
            tag: formTag
          };
        }
        return c;
      }));
    } else {
      // Add mode
      const newContact = {
        id: Date.now(),
        name: formName,
        email: formEmail,
        phone: formPhone,
        channel: formChannel,
        tag: formTag,
        lastMsg: "Connected just now",
        time: "Just now",
        unreadCount: 0
      };
      setContacts(prev => [newContact, ...prev]);
    }

    setModalOpen(false);
  };

  // Filter contacts
  const filteredContacts = contacts.filter(contact => {
    if (contact.deletedFromCRM) return false;
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          contact.phone.includes(searchQuery);
    const matchesTag = tagFilter === 'All' ? true : contact.tag === tagFilter;
    const matchesChannel = channelFilter === 'All' ? true : contact.channel === channelFilter;
    
    return matchesSearch && matchesTag && matchesChannel;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.3s ease' }}>
      
      {/* Action Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '700' }}>Contact Relationships (CRM)</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Manage your user directory, channels, and statuses</p>
        </div>
        <button 
          onClick={openAddModal}
          className="btn btn-primary crm-desktop-add-btn"
          style={{ boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)' }}
        >
          <Plus size={16} />
          <span>Add Contact</span>
        </button>
      </div>

      {/* Mobile-only Add Contact button ABOVE filters panel (before glass-panel) */}
      <div className="crm-mobile-add-btn-container">
        <button 
          onClick={openAddModal}
          className="btn btn-primary"
          style={{ boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)' }}
        >
          <Plus size={16} />
          <span>Add Contact</span>
        </button>
      </div>

      {/* Filters Area */}
      <div className="glass-panel crm-filters-panel" style={{
        padding: '16px',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        {/* Search */}
        <div className="crm-search-wrapper" style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <input 
            type="text" 
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '36px', fontSize: '0.88rem' }}
          />
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>

        {/* Tag Filter */}
        <div className="crm-filter-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Tag:</span>
          <select 
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="form-input"
            style={{ padding: '6px 12px', fontSize: '0.85rem', width: 'auto', minWidth: '120px' }}
          >
            <option value="All">All Tags</option>
            <option value="Lead">Lead</option>
            <option value="Customer">Customer</option>
            <option value="Partner">Partner</option>
            <option value="VIP">VIP</option>
          </select>
        </div>

        {/* Channel Filter */}
        <div className="crm-filter-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Channel:</span>
          <select 
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className="form-input"
            style={{ padding: '6px 12px', fontSize: '0.85rem', width: 'auto', minWidth: '120px' }}
          >
            <option value="All">All Channels</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Instagram">Instagram</option>
            <option value="Telegram">Telegram</option>
            <option value="Messenger">Messenger</option>
          </select>
        </div>
      </div>

      {/* CRM Table */}
      <div className="glass-panel" style={{
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="crm-table" style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            fontSize: '0.9rem'
          }}>
            <thead>
              <tr style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderBottom: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontWeight: '600'
              }}>
                <th style={{ padding: '14px 20px' }}>Customer Name</th>
                <th style={{ padding: '14px 20px' }}>Primary Channel</th>
                <th style={{ padding: '14px 20px' }}>Phone Number</th>
                <th style={{ padding: '14px 20px' }}>Tags</th>
                <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.length > 0 ? (
                filteredContacts.map(contact => (
                  <tr 
                    key={contact.id}
                    style={{
                      borderBottom: '1px solid var(--border-color)',
                      transition: 'var(--transition)'
                    }}
                    className="table-row-hover"
                  >
                    {/* Name */}
                    <td data-label="Customer Name" style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--primary-light)',
                          color: 'var(--primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          fontSize: '0.8rem'
                        }}>
                          {contact.name[0]}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                          <span style={{ fontWeight: '500' }}>{contact.name}</span>
                          {contact.channel?.toLowerCase() === 'gmail' && (
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{contact.email}</span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Channel */}
                    <td data-label="Primary Channel" style={{ padding: '14px 20px' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.85rem'
                      }}>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                          borderRadius: '4px',
                          flexShrink: 0
                        }}>
                          <BrandIcon name={contact.channel} />
                        </div>
                        <span>{contact.channel}</span>
                      </span>
                    </td>

                    {/* Phone */}
                    <td data-label="Phone Number" style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Phone size={14} style={{ color: 'var(--text-muted)' }} />
                        {contact.phone || 'N/A'}
                      </span>
                    </td>

                    {/* Tag */}
                    <td data-label="Tags" style={{ padding: '14px 20px' }}>
                      <span className={`badge badge-${contact.tag.toLowerCase()}`}>
                        {contact.tag}
                      </span>
                    </td>

                    {/* Actions */}
                    <td data-label="Actions" style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button 
                          onClick={() => openEditModal(contact)}
                          style={{ padding: '6px', color: 'var(--primary)', borderRadius: '4px' }}
                          className="btn-secondary"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => handleDelete(contact.id)}
                          style={{ padding: '6px', color: 'var(--danger)', borderRadius: '4px' }}
                          className="btn-secondary"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No contacts match the current filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Contact Modal Dialog */}
      {modalOpen && !editingContact && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel">
            <button 
              onClick={() => setModalOpen(false)}
              style={{ position: 'absolute', right: '16px', top: '16px', color: 'var(--text-secondary)' }}
            >
              <X size={20} />
            </button>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', fontWeight: '700' }}>
              Register New Contact
            </h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Full Name *</label>
                <input 
                  type="text" 
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="form-input"
                  placeholder="e.g. John Doe"
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Email Address *</label>
                <input 
                  type="email" 
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="form-input"
                  placeholder="e.g. name@domain.com"
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Phone Number</label>
                <input 
                  type="text" 
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="form-input"
                  placeholder="e.g. +1 555-0199"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Primary Channel</label>
                  <select 
                    value={formChannel}
                    onChange={(e) => setFormChannel(e.target.value)}
                    className="form-input"
                  >
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Telegram">Telegram</option>
                    <option value="Messenger">Messenger</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Tag Status</label>
                  <select 
                    value={formTag}
                    onChange={(e) => setFormTag(e.target.value)}
                    className="form-input"
                  >
                    <option value="Lead">Lead</option>
                    <option value="Customer">Customer</option>
                    <option value="Partner">Partner</option>
                    <option value="VIP">VIP</option>
                  </select>
                </div>
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
                  Add Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Contact (Tag Picker Modal matches Inbox Style) */}
      {modalOpen && editingContact && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content glass-panel" style={{
            width: '320px',
            maxWidth: 'calc(100vw - 32px)',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: 'var(--shadow-lg)',
            position: 'relative',
            animation: 'fadeIn 0.25s ease'
          }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setModalOpen(false)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                color: 'var(--text-muted)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={16} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '12px' }}>
              <div style={{
                display: 'inline-flex',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                color: 'var(--primary)',
                padding: '10px',
                borderRadius: '10px',
                marginBottom: '8px'
              }}>
                <Tag size={18} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Add to CRM</h3>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <p style={{
                fontSize: '0.76rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.5',
                textAlign: 'center',
                margin: 0
              }}>
                Assign status tags to organize your contacts in the CRM registry. Custom tags help filter and track user engagement status—whether they are prospective leads, active customers, or VIP clients. Tags apply globally across your workspace pipelines.
              </p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              setContacts(prev => prev.map(c => {
                if (c.id === editingContact.id) {
                  return { ...c, tag: formTag.trim() };
                }
                return c;
              }));
              setModalOpen(false);
            }} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  color: 'var(--text-secondary)',
                  display: 'block',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Tag
                </label>

                <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
                  {['Lead', 'Customer', 'VIP'].map(tagOpt => {
                    const isActive = selectedTagOption === tagOpt;
                    return (
                      <button
                        key={tagOpt}
                        type="button"
                        onClick={() => {
                          setSelectedTagOption(tagOpt);
                          setFormTag(tagOpt);
                        }}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '0.78rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'var(--transition)',
                          border: isActive ? '1.5px solid var(--primary)' : '1.5px solid var(--border-color)',
                          backgroundColor: isActive ? 'var(--primary-light)' : 'var(--bg-tertiary)',
                          color: isActive ? 'var(--primary)' : 'var(--text-secondary)'
                        }}
                      >
                        {tagOpt}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTagOption('Other');
                      setFormTag('');
                    }}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'var(--transition)',
                      border: selectedTagOption === 'Other' ? '1.5px solid var(--primary)' : '1.5px solid var(--border-color)',
                      backgroundColor: selectedTagOption === 'Other' ? 'var(--primary-light)' : 'var(--bg-tertiary)',
                      color: selectedTagOption === 'Other' ? 'var(--primary)' : 'var(--text-secondary)'
                    }}
                  >
                    Other
                  </button>
                </div>

                {selectedTagOption === 'Other' && (
                  <input
                    required
                    type="text"
                    placeholder="Enter custom tag manually..."
                    value={formTag}
                    onChange={(e) => setFormTag(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem'
                    }}
                    className="form-input"
                  />
                )}
              </div>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={formTag === editingContact?.tag || !formTag.trim()}
                  style={{ padding: '8px 18px', fontSize: '0.85rem', opacity: (formTag === editingContact?.tag || !formTag.trim()) ? 0.5 : 1, cursor: (formTag === editingContact?.tag || !formTag.trim()) ? 'not-allowed' : 'pointer' }}
                >
                  Save Tag
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table custom styles */}
      <style>{`
        .table-row-hover:hover {
          background-color: var(--bg-tertiary) !important;
        }
        .crm-desktop-add-btn {
          display: inline-flex !important;
        }
        .crm-mobile-add-btn-container {
          display: none !important;
        }
        @media (max-width: 768px) {
          .crm-table, 
          .crm-table thead, 
          .crm-table tbody, 
          .crm-table th, 
          .crm-table td, 
          .crm-table tr {
            display: block !important;
          }
          .crm-table thead {
            display: none !important;
          }
          .crm-table tr {
            border-bottom: 1px solid var(--border-color) !important;
            padding: 12px 16px !important;
            background-color: var(--bg-secondary) !important;
            margin-bottom: 12px !important;
            border-radius: var(--radius-md) !important;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05) !important;
          }
          .crm-table td {
            border: none !important;
            padding: 6px 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            text-align: right !important;
          }
          .crm-table td::before {
            content: attr(data-label) !important;
            font-weight: 600 !important;
            color: var(--text-muted) !important;
            font-size: 0.8rem !important;
            text-align: left !important;
            margin-right: 16px !important;
          }
        }
        @media (max-width: 697px) {
          .crm-desktop-add-btn {
            display: none !important;
          }
          .crm-mobile-add-btn-container {
            display: flex !important;
            justify-content: flex-end !important;
            width: 100% !important;
            margin-bottom: 4px !important;
          }
          .crm-filters-panel {
            gap: 12px !important;
          }
          .crm-search-wrapper {
            flex: 1 1 100% !important;
            width: 100% !important;
          }
          .crm-filter-item {
            flex: 1 1 auto !important;
          }
        }
      `}</style>
    </div>
  );
}
