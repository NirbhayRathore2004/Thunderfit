import React from 'react';

const Settings = ({ darkMode, setDarkMode }) => {
    return (
        <div className="settings-container">
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    Settings ⚙️
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                    Manage your account preferences and application settings.
                </p>
            </div>

            <div className="settings-section">
                <h3 className="settings-section-title">Profile Settings</h3>
                <div className="settings-group">
                    <div className="settings-item">
                        <div className="settings-item-info">
                            <label>Display Name</label>
                            <p>How you appear to other athletes.</p>
                        </div>
                        <input type="text" className="settings-input" defaultValue="John Doe" />
                    </div>
                    <div className="settings-item">
                        <div className="settings-item-info">
                            <label>Email Address</label>
                            <p>Your primary contact email.</p>
                        </div>
                        <input type="email" className="settings-input" defaultValue="john.doe@example.com" />
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h3 className="settings-section-title">Display Preferences</h3>
                <div className="settings-group">
                    <label className="settings-item toggle-item">
                        <div className="settings-item-info">
                            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Dark Mode</div>
                            <p>Use a dark color scheme for the application.</p>
                        </div>
                        <div className="toggle-switch">
                            <input
                                type="checkbox"
                                id="dark-mode-toggle"
                                checked={darkMode}
                                onChange={() => setDarkMode(!darkMode)}
                            />
                            <span className="toggle-slider"></span>
                        </div>
                    </label>
                    <div className="settings-item">
                        <div className="settings-item-info">
                            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Unit System</div>
                            <p>Choose between metric and imperial units.</p>
                        </div>
                        <select className="settings-select">
                            <option>Metric (km, kg, m)</option>
                            <option>Imperial (mi, lb, ft)</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h3 className="settings-section-title">Account Safety</h3>
                <div className="settings-group">
                    <div className="settings-item">
                        <div className="settings-item-info">
                            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Privacy Zones</div>
                            <p>Hide your home or office location on maps.</p>
                        </div>
                        <button className="action-btn">Manage Zones</button>
                    </div>
                    <div className="settings-item">
                        <div className="settings-item-info">
                            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Data Export</div>
                            <p>Download a copy of all your activity data.</p>
                        </div>
                        <button className="action-btn">Request Export</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
