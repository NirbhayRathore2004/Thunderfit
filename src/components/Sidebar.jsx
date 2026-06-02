import React from 'react';

const Sidebar = ({ activeTab, setActiveTab, navItems, logo }) => {
    return (
        <aside className="left-sidebar">
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
        </aside>
    );
};

export default Sidebar;
