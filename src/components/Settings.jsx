import React from 'react';

const Settings = ({ darkMode, setDarkMode, onLogout }) => {
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
                        <input type="text" className="settings-input" defaultValue="User" />
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
                        <button className="action-btn" onClick={() => alert("Privacy Zones manager opening... 🔒")}>Manage Zones</button>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                    className="action-btn"
                    style={{ background: 'rgba(255, 107, 107, 0.1)', color: '#ff6b6b', border: '1px solid rgba(255, 107, 107, 0.2)' }}
                    onClick={onLogout}
                >
                    🚪 Logout
                </button>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="action-btn" style={{ padding: '0.8rem 2rem' }} onClick={() => window.location.reload()}>Discard</button>
                    <button className="action-btn add-to-segment" style={{ padding: '0.8rem 2.5rem' }} onClick={() => alert("Settings saved successfully! ✅")}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
