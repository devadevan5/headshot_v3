import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RegisterForm from './RegisterForm';

describe('RegisterForm', () => {
  const onRegisterMock = vi.fn();

  beforeEach(() => {
    onRegisterMock.mockClear();
  });

  it('should render all form fields', () => {
    render(<RegisterForm onRegister={onRegisterMock} />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/i agree to the terms/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  it('should show validation errors for empty fields on submit', async () => {
    const { container } = render(<RegisterForm onRegister={onRegisterMock} />);
    const form = container.querySelector('form');
    fireEvent.submit(form);

    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(await screen.findByText('Password is required')).toBeInTheDocument();
    expect(await screen.findByText('Please confirm your password')).toBeInTheDocument();
    expect(await screen.findByText('You must accept the terms and conditions')).toBeInTheDocument();
    expect(onRegisterMock).not.toHaveBeenCalled();
  });

  it('should show validation error for invalid email', async () => {
    const { container } = render(<RegisterForm onRegister={onRegisterMock} />);
    await userEvent.type(screen.getByLabelText(/email address/i), 'invalid-email');
    const form = container.querySelector('form');
    fireEvent.submit(form);

    expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument();
    expect(onRegisterMock).not.toHaveBeenCalled();
  });

  it('should show validation error for short password', async () => {
    const { container } = render(<RegisterForm onRegister={onRegisterMock} />);
    await userEvent.type(screen.getByPlaceholderText(/enter your password/i), '123');
    const form = container.querySelector('form');
    fireEvent.submit(form);

    expect(await screen.findByText('Password must be at least 8 characters')).toBeInTheDocument();
    expect(onRegisterMock).not.toHaveBeenCalled();
  });

  it('should show validation error for password mismatch', async () => {
    const { container } = render(<RegisterForm onRegister={onRegisterMock} />);
    await userEvent.type(screen.getByPlaceholderText(/enter your password/i), 'password123');
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'password456');
    const form = container.querySelector('form');
    fireEvent.submit(form);

    expect(await screen.findByText('Passwords do not match')).toBeInTheDocument();
    expect(onRegisterMock).not.toHaveBeenCalled();
  });

  it('should call onRegister with form data on successful submission', async () => {
    render(<RegisterForm onRegister={onRegisterMock} />);
    const email = 'test@example.com';
    const password = 'password123';

    await userEvent.type(screen.getByLabelText(/email address/i), email);
    await userEvent.type(screen.getByPlaceholderText(/enter your password/i), password);
    await userEvent.type(screen.getByLabelText(/confirm password/i), password);
    await userEvent.click(screen.getByLabelText(/i agree to the terms/i));
    await userEvent.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
        expect(onRegisterMock).toHaveBeenCalledWith({
          email,
          password,
          confirmPassword: password,
          acceptTerms: true,
        });
    });
  });

  it('should generate a password when "Generate" is clicked', async () => {
    render(<RegisterForm onRegister={onRegisterMock} />);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    expect(passwordInput.value).toBe('');
    expect(confirmPasswordInput.value).toBe('');

    await userEvent.click(screen.getByRole('button', { name: /generate/i }));

    expect(passwordInput.value).not.toBe('');
    expect(passwordInput.value).toBe(confirmPasswordInput.value);
    expect(passwordInput.value.length).toBe(12);
  });

  it('should clear error message on input change', async () => {
    const { container } = render(<RegisterForm onRegister={onRegisterMock} />);
    const form = container.querySelector('form');
    fireEvent.submit(form);
    expect(await screen.findByText('Email is required')).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText(/email address/i), 't');
    await waitFor(() => {
        expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
    });
  });
});
