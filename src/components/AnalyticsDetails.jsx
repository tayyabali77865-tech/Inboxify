import React from 'react';
import { BarChart3, TrendingUp, Download, Calendar, ArrowUpRight } from 'lucide-react';

export default function AnalyticsDetails() {
  const [dateRange, setDateRange] = React.useState('7d');

  // Interactive bar chart mock data (sent vs received)
  const barData = [
    { label: 'Mon', sent: 45, received: 60 },
    { label: 'Tue', sent: 55, received: 70 },
    { label: 'Wed', sent: 68, received: 85 },
    { label: 'Thu', sent: 72, received: 95 },
    { label: 'Fri', sent: 80, received: 110 },
    { label: 'Sat', sent: 35, received: 45 },
    { label: 'Sun', sent: 28, received: 35 }
  ];

  const handleExport = (type) => {
    alert(`Successfully generated and downloaded analytics reports in ${type.toUpperCase()} format!`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.3s ease' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '700' }}>Analytical Dashboard</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Deeper statistics, response ratios, and channel metrics</p>
        </div>

        {/* Date Selector and export */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ display: 'flex', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', padding: '2px', border: '1px solid var(--border-color)' }}>
            <button 
              onClick={() => setDateRange('7d')}
              className="btn"
              style={{ padding: '6px 12px', fontSize: '0.8rem', backgroundColor: dateRange === '7d' ? 'var(--bg-secondary)' : 'transparent', borderRadius: '6px' }}
            >
              7 Days
            </button>
            <button 
              onClick={() => setDateRange('30d')}
              className="btn"
              style={{ padding: '6px 12px', fontSize: '0.8rem', backgroundColor: dateRange === '30d' ? 'var(--bg-secondary)' : 'transparent', borderRadius: '6px' }}
            >
              30 Days
            </button>
          </div>

          <button 
            onClick={() => handleExport('csv')}
            className="btn btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.8rem' }}
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Grid: 3 Smaller KPI cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-md)' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 'bold' }}>Average Resolution Time</span>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '800', margin: '8px 0 4px' }}>4m 12s</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '2px' }}>
            <ArrowUpRight size={14} /> 12.5% faster response than last week
          </span>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-md)' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 'bold' }}>Customer Satisfaction (CSAT)</span>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '800', margin: '8px 0 4px' }}>96.8%</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '2px' }}>
            <ArrowUpRight size={14} /> 2.1% improvement from Q1
          </span>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-md)' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 'bold' }}>Automation Deflection Rate</span>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '800', margin: '8px 0 4px' }}>38.4%</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '2px' }}>
            <ArrowUpRight size={14} /> 5.4% more chats deflected by bots
          </span>
        </div>
      </div>

      {/* Bar Chart (Sent vs Received) */}
      <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Message Volume Ratio</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Comparison between sent outgoing and incoming messages</p>
        </div>

        {/* Bar Chart Renderer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ height: '240px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--border-color)' }}>
            {barData.map((item, idx) => {
              // Heights out of max 120
              const sentHeight = (item.sent / 120) * 100;
              const rcvHeight = (item.received / 120) * 100;
              return (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%' }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '6px', width: '100%', justifyContent: 'center' }}>
                    {/* Sent Bar */}
                    <div 
                      style={{
                        width: '12px',
                        height: `${sentHeight}%`,
                        backgroundColor: 'var(--primary)',
                        borderRadius: '4px 4px 0 0',
                        position: 'relative'
                      }}
                      title={`Sent: ${item.sent}`}
                    />
                    {/* Received Bar */}
                    <div 
                      style={{
                        width: '12px',
                        height: `${rcvHeight}%`,
                        backgroundColor: 'var(--secondary)',
                        borderRadius: '4px 4px 0 0',
                        position: 'relative'
                      }}
                      title={`Received: ${item.received}`}
                    />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '500', color: 'var(--text-muted)' }}>{item.label}</span>
                </div>
              );
            })}
          </div>

          {/* Legends */}
          <div style={{ display: 'flex', gap: '24px', fontSize: '0.8rem', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'var(--primary)' }}></div>
              <span>Outgoing Sent Messages</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'var(--secondary)' }}></div>
              <span>Incoming Received Messages</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
