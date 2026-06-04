import React from 'react';

const Sidebar = ({ activeTab, setActiveTab, navItems, logo, user }) => {
    return (
        <aside className="left-sidebar" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 4rem)' }}>
            <div style={{ flex: 1 }}>
                <div className="logo-container">
                    <img src={logo} className="logo" alt="ThunderFit" />
                    <span className="app-title">THUNDERFIT</span>
                </div>
                <ul className="nav-menu">
                    {navItems.map((item) => (
                        <li
                            key={item.name}
                            className={`nav-item ${activeTab === item.name ? 'active' : ''}`}
                            onClick={() => setActiveTab(item.name)}
                        >
                            <span className="icon">{item.icon}</span>
                            <span>{item.name}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {user && (
                <div
                    className={`sidebar-profile ${activeTab === 'Settings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Settings')}
                    style={{
                        padding: '1rem',
                        borderTop: '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginTop: 'auto',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        backgroundColor: activeTab === 'Settings' ? 'rgba(252, 76, 2, 0.05)' : 'transparent',
                        borderLeft: activeTab === 'Settings' ? '4px solid var(--primary)' : 'none'
                    }}
                >
                    <div className="user-avatar" style={{
                        width: '40px',
                        height: '40px',
                        fontSize: '0.85rem',
                        backgroundColor: user.avatar_color
                    }}>
                        {user.avatar}
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: activeTab === 'Settings' ? 'var(--primary)' : 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {user.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Pro Athlete</div>
                    </div>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
