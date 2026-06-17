import React from 'react';
import { Plus, UserCheck, Shield, Clock, X, Mail } from 'lucide-react';

export default function TeamManagement({ team, setTeam }) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [formName, setFormName] = React.useState('');
  const [formEmail, setFormEmail] = React.useState('');
  const [formRole, setFormRole] = React.useState('Agent');

  const handleInvite = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) {
      if (typeof window.showAlert === 'function') {
        window.showAlert("Please enter Name and Email!", "Validation Error");
      } else {
        alert("Please enter Name and Email!");
      }
      return;
    }

    const newMember = {
      id: Date.now(),
      name: formName,
      email: formEmail,
      role: formRole,
      status: 'Active',
      lastActive: 'Just now'
    };

    setTeam(prev => [...prev, newMember]);
    setFormName('');
    setFormEmail('');
    setFormRole('Agent');
    setModalOpen(false);
  };

  const handleRoleChange = (id, newRole) => {
    setTeam(prev => prev.map(m => {
      if (m.id === id) {
        return { ...m, role: newRole };
      }
      return m;
    }));
  };

  const handleToggleStatus = (id) => {
    setTeam(prev => prev.map(m => {
      if (m.id === id) {
        const nextStatus = m.status === 'Active' ? 'Inactive' : 'Active';
        return { ...m, status: nextStatus, lastActive: nextStatus === 'Active' ? 'Just now' : 'Offline' };
      }
      return m;
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.3s ease' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '700' }}>Team Directory</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Invite support operators and configure permissions</p>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className="btn btn-primary"
          style={{ boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)' }}
        >
          <Plus size={16} />
          <span>Invite Member</span>
        </button>
      </div>

      {/* Directory Table */}
      <div className="glass-panel" style={{
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="team-table" style={{
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
                <th style={{ padding: '14px 20px' }}>Teammate</th>
                <th style={{ padding: '14px 20px' }}>Email Address</th>
                <th style={{ padding: '14px 20px' }}>System Role</th>
                <th style={{ padding: '14px 20px' }}>Account Status</th>
                <th style={{ padding: '14px 20px' }}>Last Session</th>
              </tr>
            </thead>
            <tbody>
              {team.map(member => (
                <tr 
                  key={member.id}
                  style={{
                    borderBottom: '1px solid var(--border-color)',
                    transition: 'var(--transition)'
                  }}
                  className="table-row-hover"
                >
                  {/* Name Card */}
                  <td data-label="Teammate" style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: member.status === 'Active' ? 'var(--primary-light)' : 'var(--bg-tertiary)',
                        color: member.status === 'Active' ? 'var(--primary)' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '0.8rem'
                      }}>
                        {member.name[0]}
                      </div>
                      <div>
                        <span style={{ fontWeight: '500', display: 'block' }}>{member.name}</span>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td data-label="Email Address" style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Mail size={14} style={{ color: 'var(--text-muted)' }} />
                      {member.email}
                    </span>
                  </td>

                  {/* Role Selector inline */}
                  <td data-label="System Role" style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Shield size={14} style={{ color: 'var(--text-muted)' }} />
                      <select 
                        value={member.role}
                        onChange={(e) => handleRoleChange(member.id, e.target.value)}
                        className="form-input system-role-select"
                        style={{ border: '1px solid transparent' }}
                      >
                        <option value="Admin">Admin</option>
                        <option value="Agent">Agent</option>
                        <option value="Manager">Manager</option>
                      </select>
                    </div>
                  </td>

                  {/* Status Toggle clickable */}
                  <td data-label="Account Status" style={{ padding: '14px 20px' }}>
                    <button 
                      onClick={() => handleToggleStatus(member.id)}
                      style={{
                        padding: '2px 10px',
                        borderRadius: '99px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        backgroundColor: member.status === 'Active' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        color: member.status === 'Active' ? 'var(--success)' : 'var(--danger)',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                      title="Click to toggle status"
                    >
                      {member.status}
                    </button>
                  </td>

                  {/* Last Session */}
                  <td data-label="Last Session" style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                      <Clock size={14} style={{ color: 'var(--text-muted)' }} />
                      {member.lastActive}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Member Modal */}
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
              Invite Team Member
            </h3>
            <form onSubmit={handleInvite} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                  placeholder="e.g. agent@chathub.com"
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Workspace Role</label>
                <select 
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value)}
                  className="form-input modal-role-select"
                >
                  <option value="Admin">Admin (Full Control)</option>
                  <option value="Agent">Agent (Messaging only)</option>
                  <option value="Manager">Manager (CRM & Messaging)</option>
                </select>
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
                  Send Invite
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
        @media (max-width: 850px) {
          .team-table, 
          .team-table thead, 
          .team-table tbody, 
          .team-table th, 
          .team-table td, 
          .team-table tr {
            display: block !important;
          }
          .team-table thead {
            display: none !important;
          }
          .team-table tr {
            border-bottom: 1px solid var(--border-color) !important;
            padding: 12px 16px !important;
            background-color: var(--bg-secondary) !important;
            margin-bottom: 12px !important;
            border-radius: var(--radius-md) !important;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05) !important;
          }
          .team-table td {
            border: none !important;
            padding: 6px 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            text-align: right !important;
          }
          .team-table td::before {
            content: attr(data-label) !important;
            font-weight: 600 !important;
            color: var(--text-muted) !important;
            font-size: 0.8rem !important;
            text-align: left !important;
            margin-right: 16px !important;
          }
        }
        @media (min-width: 851px) and (max-width: 900px) {
          .team-table th,
          .team-table td {
            padding: 10px 8px !important;
            font-size: 0.8rem !important;
            white-space: nowrap !important;
          }
          .team-table th:nth-child(2),
          .team-table td:nth-child(2) {
            padding-left: 52px !important;
          }
          .team-table td div > div {
            width: 26px !important;
            height: 26px !important;
            font-size: 0.75rem !important;
          }
          .team-table td button {
            padding: 2px 6px !important;
            font-size: 0.7rem !important;
          }
        }
      `}</style>
    </div>
  );
}
