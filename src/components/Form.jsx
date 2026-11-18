import React, { useState } from 'react';

export default function Form({
  placeholder = 'Enter email',
  buttonText = 'Start free trial',
  onSubmitEmail,
}) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    if (onSubmitEmail) onSubmitEmail(email);
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form-wrapper">
      <div className="signup-form-inline">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="email-input-field"
          required
        />
        <button type="submit" className="form-submit-cta-btn">
          {buttonText}
        </button>
      </div>
      {submitted && (
        <p className="form-success-msg">
          ✓ Success! Check your inbox for your trial details.
        </p>
      )}
    </form>
  );
}
