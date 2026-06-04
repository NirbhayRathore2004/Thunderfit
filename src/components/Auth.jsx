import React, { useState } from 'react';

const Auth = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:8000/api');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const endpoint = isLogin ? '/login' : '/signup';
            const res = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                onLogin(data);
                localStorage.setItem('user', JSON.stringify(data));
            } else {
                setError(data.detail || 'Authentication failed');
            }
        } catch (err) {
            setError('Network error. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
            padding: '2rem'
        }}>
            <div className="auth-card animate-slide-up" style={{
                width: '100%',
                maxWidth: '450px',
                background: 'var(--bg-card)',
                borderRadius: '24px',
                padding: '3rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                border: '1px solid var(--border-color)',
                backdropFilter: 'blur(10px)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: '900',
                        marginBottom: '0.5rem',
                        background: 'linear-gradient(to right, var(--primary), #ff7b00)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        ThunderFit
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                        {isLogin ? 'Welcome back, Athlete! ⚡' : 'Start your journey today! 🏃‍♂️'}
                    </p>
                </div>

                {error && (
                    <div style={{
                        padding: '1rem',
                        background: 'rgba(255, 107, 107, 0.1)',
                        border: '1px solid #ff6b6b',
                        borderRadius: '12px',
                        color: '#ff6b6b',
                        marginBottom: '1.5rem',
                        fontSize: '0.9rem',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required={!isLogin}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid var(--border-color)',
                                    color: 'white',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                    )}
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>Email Address</label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            required
                            style={{
                                width: '100%',
                                padding: '1rem',
                                borderRadius: '12px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--border-color)',
                                color: 'white',
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                            required
                            style={{
                                width: '100%',
                                padding: '1rem',
                                borderRadius: '12px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--border-color)',
                                color: 'white',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="action-btn add-to-segment"
                        style={{
                            width: '100%',
                            padding: '1.2rem',
                            borderRadius: '12px',
                            fontSize: '1.1rem',
                            fontWeight: '800',
                            marginBottom: '1.5rem'
                        }}
                    >
                        {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Create Account')}
                    </button>
                </form>

                <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--primary)',
                            fontWeight: '700',
                            cursor: 'pointer',
                            fontSize: '0.95rem'
                        }}
                    >
                        {isLogin ? 'Sign Up' : 'Log In'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
