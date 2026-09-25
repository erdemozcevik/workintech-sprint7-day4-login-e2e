import { useState } from 'react';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

export default function Login({ onSuccess }) {
  const [form, setForm] = useState({ email: '', password: '', terms: false });
  const [touched, setTouched] = useState({ email: false, password: false });
  const emailValid = emailPattern.test(form.email);
  const passwordValid = passwordPattern.test(form.password);
  const isValid = emailValid && passwordValid && form.terms;

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    if (name !== 'terms') setTouched({ ...touched, [name]: true });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (isValid) onSuccess();
  }

  return (
    <main>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} aria-invalid={touched.email && !emailValid} aria-describedby={touched.email && !emailValid ? 'email-error' : undefined} />
        {touched.email && !emailValid && <p id="email-error" role="alert" className="error">Please enter a valid email address</p>}

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" value={form.password} onChange={handleChange} aria-invalid={touched.password && !passwordValid} aria-describedby={touched.password && !passwordValid ? 'password-error' : undefined} />
        {touched.password && !passwordValid && <p id="password-error" role="alert" className="error">Password must be at least 8 characters and include uppercase, lowercase, number and special character</p>}

        <label className="terms" htmlFor="terms">
          <input id="terms" name="terms" type="checkbox" checked={form.terms} onChange={handleChange} />
          I agree to terms of service and privacy policy
        </label>
        <button type="submit" disabled={!isValid}>Sign In</button>
      </form>
    </main>
  );
}
