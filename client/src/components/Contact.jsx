 import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', text: '' });

    try {
      // ✅ CHANGED: Removed 'http://localhost:5000' to leverage Vite's proxy rules seamlessly
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', text: '🚀 Message sent! I will be in touch shortly.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', text: data.error || 'Submission failed.' });
      }
    } catch (err) {
      setStatus({ type: 'error', text: '❌ Service unavailable. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-container contact-section">
      <h2 className="section-title">Get In Touch</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
        </div>
        <button type="submit" className="btn primary-btn" disabled={loading}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>
        {status.text && <div className={`status-message ${status.type}`}>{status.text}</div>}
      </form>
    </div>
  );
}