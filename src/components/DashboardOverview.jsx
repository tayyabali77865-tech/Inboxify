import React from 'react';
import { 
  MessageSquare, UserCheck, Users, Clock, 
  ArrowUpRight, ArrowDownRight, TrendingUp,
  Share2, ArrowRight
} from 'lucide-react';

export default function DashboardOverview({ setTab, contacts, integrations }) {
  const [hoveredPoint, setHoveredPoint] = React.useState(null);
  const [hoveredDonut, setHoveredDonut] = React.useState(null);

  // Hardcoded chart data for interactive SVG Area Chart
  const chartData = [
    { label: 'May 1', value: 120, x: 50, y: 160 },
    { label: 'May 7', value: 195, x: 120, y: 130 },
    { label: 'May 14', value: 150, x: 190, y: 148 },
    { label: 'May 21', value: 290, x: 260, y: 90 },
    { label: 'May 28', value: 245, x: 330, y: 108 },
    { label: 'Jun 1', value: 354, x: 400, y: 60 }
  ];

  // Donut chart segment data
  const donutSegments = [
    { name: 'WhatsApp', value: 45, color: '#10b981', startAngle: 0, endAngle: 162 },
    { name: 'Instagram', value: 25, color: '#ec4899', startAngle: 162, endAngle: 252 },
    { name: 'Telegram', value: 18, color: '#3b82f6', startAngle: 252, endAngle: 316.8 },
    { name: 'Messenger', value: 12, color: '#a855f7', startAngle: 316.8, endAngle: 360 }
  ];

  // Helper for SVG polar coordinates to cartesian (for donut segments if needed, but we can do pre-calculated arcs or simple CSS stroke-dasharray)
  // Let's use clean SVG path arcs for the donut chart segments!
  const getCoordinatesForPercent = (percent) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  const getDonutPath = (startPercent, endPercent) => {
    const [startX, startY] = getCoordinatesForPercent(startPercent);
    const [endX, endY] = getCoordinatesForPercent(endPercent);
    const largeArcFlag = endPercent - startPercent > 0.5 ? 1 : 0;
    
    // Scale up coordinates (radius 50, center 60,60)
    const sx = startX * 40 + 60;
    const sy = startY * 40 + 60;
    const ex = endX * 40 + 60;
    const ey = endY * 40 + 60;

    return `M ${sx} ${sy} A 40 40 0 ${largeArcFlag} 1 ${ex} ${ey}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.3s ease' }}>
      
      {/* Overview Cards Grid */}
      <div className="overview-cards-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px'
      }}>
        {/* Card 1 */}
        <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Total Conversations</span>
            <div style={{ color: 'var(--primary)' }}>
              <MessageSquare size={22} className="card-icon" />
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '700' }}>1,245</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--success)', marginTop: '4px' }}>
              <ArrowUpRight size={14} />
              <span>+18.2% vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Open Conversations</span>
            <div style={{ color: 'var(--success)' }}>
              <UserCheck size={22} className="card-icon" />
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '700' }}>354</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--success)', marginTop: '4px' }}>
              <ArrowUpRight size={14} />
              <span>+5.2% vs last week</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Reached Contacts</span>
            <div style={{ color: 'var(--secondary)' }}>
              <Users size={22} className="card-icon" />
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '700' }}>891</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--danger)', marginTop: '4px' }}>
              <ArrowDownRight size={14} />
              <span>-12.4% vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Response Time</span>
            <div style={{ color: 'var(--warning)' }}>
              <Clock size={22} className="card-icon" />
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '700' }}>2m 45s</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--success)', marginTop: '4px' }}>
              <ArrowUpRight size={14} />
              <span>-4.4% faster resolution</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.6fr 1fr',
        gap: '24px'
      }} className="charts-grid">
        
        {/* Interactive Line Chart */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
            <div style={{ minWidth: 0 }}>
              <h3 className="chart-title" style={{ fontSize: '1.1rem', fontWeight: '600' }}>Conversations Over Time</h3>
              <p className="chart-subtitle" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Daily volume tracking for current month</p>
            </div>
            <div className="chart-stat" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: '600', color: 'var(--primary)', whiteSpace: 'nowrap', flexShrink: 0 }}>
              <TrendingUp size={14} className="chart-stat-icon" />
              <span>Average: 225/day</span>
            </div>
          </div>

          {/* SVG Area/Line Chart */}
          <div style={{ position: 'relative', width: '100%', height: '220px', display: 'flex', alignItems: 'flex-end' }}>
            <svg viewBox="0 0 450 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="420" y2="20" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="40" y1="70" x2="420" y2="70" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="40" y1="120" x2="420" y2="120" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="40" y1="170" x2="420" y2="170" stroke="var(--border-color)" strokeWidth="0.5" />

              {/* Area Gradient Path */}
              <path
                d="M 50 170 L 50 160 L 120 130 L 190 148 L 260 90 L 330 108 L 400 60 L 400 170 Z"
                fill="url(#chartGradient)"
                opacity="0.2"
              />

              {/* Chart Line */}
              <path
                d="M 50 160 L 120 130 L 190 148 L 260 90 L 330 108 L 400 60"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* SVG Gradients definition */}
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Data Points */}
              {chartData.map((pt, idx) => (
                <g key={idx}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={hoveredPoint === idx ? '6' : '4'}
                    fill="var(--bg-secondary)"
                    stroke="var(--primary)"
                    strokeWidth="2.5"
                    style={{ cursor: 'pointer', transition: 'r 0.15s ease' }}
                    onMouseEnter={() => setHoveredPoint(idx)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  {/* Chart X labels */}
                  <text x={pt.x} y="190" textAnchor="middle" fontSize="10" fill="var(--text-muted)" fontWeight="500">
                    {pt.label}
                  </text>
                </g>
              ))}
            </svg>

            {/* Interactive Tooltip popup */}
            {hoveredPoint !== null && (
              <div style={{
                position: 'absolute',
                left: `${(chartData[hoveredPoint].x / 450) * 100}%`,
                bottom: `${((200 - chartData[hoveredPoint].y) / 200) * 100 + 5}%`,
                transform: 'translateX(-50%)',
                backgroundColor: 'var(--text-primary)',
                color: 'var(--bg-secondary)',
                padding: '6px 10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                boxShadow: 'var(--shadow-lg)',
                pointerEvents: 'none',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                minWidth: '80px'
              }}>
                <span>{chartData[hoveredPoint].label}</span>
                <span style={{ color: 'var(--secondary)' }}>{chartData[hoveredPoint].value} chats</span>
              </div>
            )}
          </div>
        </div>

        {/* Donut Chart (Channel Distribution) */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Channel Share</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Conversations breakdown by social app</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', height: '180px' }}>
            {/* SVG Donut */}
            <div style={{ position: 'relative', width: '120px', height: '120px' }}>
              <svg viewBox="0 0 120 120" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                {donutSegments.map((seg, idx) => {
                  // Precalculated strokes or dasharrays
                  // Let's use path arcs to avoid complex dash calculations
                  const startPercent = seg.startAngle / 360;
                  const endPercent = seg.endAngle / 360;
                  return (
                    <path
                      key={idx}
                      d={getDonutPath(startPercent, endPercent)}
                      fill="none"
                      stroke={seg.color}
                      strokeWidth={hoveredDonut === idx ? '16' : '12'}
                      style={{ cursor: 'pointer', transition: 'stroke-width 0.2s ease' }}
                      onMouseEnter={() => setHoveredDonut(idx)}
                      onMouseLeave={() => setHoveredDonut(null)}
                    />
                  );
                })}
              </svg>
              {/* Inner Label */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none'
              }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
                  {hoveredDonut !== null ? donutSegments[hoveredDonut].name : 'Total'}
                </span>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  {hoveredDonut !== null ? `${donutSegments[hoveredDonut].value}%` : '100%'}
                </span>
              </div>
            </div>

            {/* Legends list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              {donutSegments.map((seg, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    backgroundColor: hoveredDonut === idx ? 'var(--bg-tertiary)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                  onMouseEnter={() => setHoveredDonut(idx)}
                  onMouseLeave={() => setHoveredDonut(null)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: seg.color }}></div>
                    <span style={{ fontSize: '0.8rem', fontWeight: '500' }}>{seg.name}</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)' }}>{seg.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CRM Overview / Quick action */}
      <div className="glass-panel recent-activity-card" style={{ padding: '16px', borderRadius: 'var(--radius-md)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <h3 className="activity-title" style={{ fontSize: '0.95rem', fontWeight: '600' }}>Recent Customer Activity</h3>
            <p className="activity-subtitle" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Latest interactions across your channels</p>
          </div>
          <button 
            onClick={() => setTab('inbox')}
            className="btn btn-secondary activity-btn"
            style={{ padding: '4px 10px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <span>Open Inbox</span>
            <ArrowRight size={12} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {contacts.filter(c => !c.deletedFromCRM).slice(0, 3).map((contact, index) => (
            <div 
              key={contact.id} 
              className="activity-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                transition: 'var(--transition)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div 
                  className="activity-avatar"
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary)',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem'
                  }}
                >
                  {contact.name[0]}
                </div>
                <div>
                  <h4 className="activity-name" style={{ fontSize: '0.8rem', fontWeight: '600' }}>{contact.name}</h4>
                  <p className="activity-channel" style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>Joined through {contact.channel}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className={`badge badge-${contact.tag.toLowerCase()} activity-badge`} style={{ fontSize: '0.65rem', padding: '2px 6px' }}>{contact.tag}</span>
                <span className="activity-time" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{index === 0 ? 'Just now' : index === 1 ? '15m ago' : '1h ago'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline styles for charts grid responsiveness and requested adjustments */}
      <style>{`
        @media (max-width: 900px) {
          .charts-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .overview-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
          .overview-cards-grid > div {
            padding: 12px 10px !important;
            gap: 6px !important;
          }
          .overview-cards-grid > div h3 {
            font-size: 1.3rem !important;
          }
          .overview-cards-grid > div span {
            font-size: 0.75rem !important;
          }
          .overview-cards-grid > div div span {
            font-size: 0.65rem !important;
          }
          .card-icon {
            width: 18px !important;
            height: 18px !important;
          }
          .chart-title {
            font-size: 0.85rem !important;
          }
          .chart-subtitle {
            font-size: 0.62rem !important;
          }
          .chart-stat {
            font-size: 0.62rem !important;
            white-space: nowrap !important;
          }
          .chart-stat-icon {
            width: 12px !important;
            height: 12px !important;
          }
          .recent-activity-card {
            padding: 10px !important;
          }
          .activity-title {
            font-size: 0.8rem !important;
          }
          .activity-subtitle {
            font-size: 0.6rem !important;
          }
          .activity-btn {
            font-size: 0.65rem !important;
            padding: 3px 6px !important;
          }
          .activity-btn svg {
            width: 10px !important;
            height: 10px !important;
          }
          .activity-row {
            padding: 6px 8px !important;
            gap: 6px !important;
          }
          .activity-avatar {
            width: 24px !important;
            height: 24px !important;
            font-size: 0.65rem !important;
          }
          .activity-name {
            font-size: 0.72rem !important;
          }
          .activity-channel {
            font-size: 0.6rem !important;
          }
          .activity-badge {
            font-size: 0.58rem !important;
            padding: 1px 4px !important;
          }
          .activity-time {
            font-size: 0.6rem !important;
          }
        }
      `}</style>
    </div>
  );
}
