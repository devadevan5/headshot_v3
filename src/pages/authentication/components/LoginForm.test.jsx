import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('should clear general error message on input change', () => {
    const handleLogin = vi.fn();
    const handleForgotPassword = vi.fn();

    render(<LoginForm onLogin={handleLogin} onForgotPassword={handleForgotPassword} />);

    // Simulate a failed login attempt
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    // Check that the general error message is displayed
    expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();

    // Simulate user typing in the email field
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'user@headshot.com' },
    });

    // The bug is that the general error message is not removed.
    // This assertion will fail before the fix.
    expect(screen.queryByText(/invalid email or password/i)).not.toBeInTheDocument();
  });
});
