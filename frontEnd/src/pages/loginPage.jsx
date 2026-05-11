import React, { useState, useCallback } from 'react';
import AnimatedCharacters from '../components/login/AnimatedCharacters';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateForm = useCallback(() => {
    let newErrors = { email: '', password: '' };
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrorMessage('');
    setLoginFailed(false);
    setLoginSuccess(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Login:', { email, password, rememberMe });

      if (email === '111@qq.com') {
        setLoginSuccess(true);
        setTimeout(() => setLoginSuccess(false), 6000);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (_) { // eslint-disable-line no-unused-vars
      setErrorMessage('Invalid email or password. Please try again.');
      setLoginFailed(true);
      setTimeout(() => setLoginFailed(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    try {
      console.log('Google Sign In');
      alert('Tính năng đăng nhập Google đang được phát triển');
    } catch (_) { // eslint-disable-line no-unused-vars
      setErrorMessage('Đăng nhập Google thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className="login-page">

      {/* Left Content Section with Animated Characters */}
      <div className="left-section">
        <div className="logo-section">
          <a href="/login" className="logo-link">
            <img
              src="https://i.postimg.cc/nLrDYrHW/icon.png"
              alt="CareerCompass logo"
              className="logo-image"
            />
            <span>Tickets</span>
          </a>
        </div>

        <div className="characters-section">
          <AnimatedCharacters
            isTyping={isTyping}
            showPassword={showPassword}
            passwordLength={password.length}
            loginFailed={loginFailed}
            loginSuccess={loginSuccess}
          />
        </div>

        <div className="footer-links">
          <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
          <a href="/terms" className="footer-link">Terms of Service</a>
        </div>

        {/* Decorative elements */}
        <div className="grid-overlay"></div>
        <div className="blur-circle blur-circle-1"></div>
        <div className="blur-circle blur-circle-2"></div>
      </div>

      {/* Right Login Section */}
      <div className="right-section">
        <div className="form-wrapper">
          {/* Mobile Logo --> */}
          <div className="mobile-logo">
            <img
              src="https://i.postimg.cc/nLrDYrHW/icon.png"
              alt="CareerCompass logo"
              className="logo-image"
            />
            <span>CareerCompass</span>
          </div>

          {/* Header --> */}
          <div className="form-header">
            <h1 className="form-title">Welcome back!</h1>
            <p className="form-subtitle">Please enter your details</p>
          </div>

          {/* Login Form --> */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* Email Field --> */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className="form-input"
                autoComplete="off"
                required
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            {/* Password Field --> */}
            <div className="form-group">
              <label htmlFor="password" className="form-label" >Password</label>
              <div className="password-wrapper">
                <input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="form-input"
                  required
                  onFocus={() => setIsTyping(true)}
                  onBlur={() => setIsTyping(false)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? (
                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                      <line x1="2" x2="22" y1="2" y2="22" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>

            {/* Remember & Forgot --> */}
            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="checkbox"
                />
                <span>Remember for 30 days</span>
              </label>
              <a href="/forgot-password" title="Forgot password" className="forgot-link">Forgot password?</a>
            </div>

            {/* Error Alert --> */}
            {errorMessage && (
              <div className="error-alert">
                {errorMessage}
              </div>
            )}

            {/* Submit Button --> */}
            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
            >
              <span className="button-text">{isLoading ? 'Signing in...' : 'Log in'}</span>
              <svg className="button-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </form>

          {/* Social Login --> */}
          <div className="social-login">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="google-button"
            >
              <span className="button-text">Log in with Google</span>
              <svg className="google-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.2 76.2C322.3 113.2 289.4 96 248 96c-88.8 0-160.1 71.9-160.1 160.1s71.3 160.1 160.1 160.1c98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z" />
              </svg>
            </button>
          </div>

          {/* Sign Up Link --> */}
          <div className="signup-link">
            Don't have an account? <a href="/signup">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
