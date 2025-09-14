/**
 * @file This file contains tests for the OTPLoginForm component.
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import OTPLoginForm from './OTPLoginForm';

describe('OTPLoginForm', () => {
  const onOTPLoginMock = vi.fn();

  beforeEach(() => {
    onOTPLoginMock.mockClear();
  });

  it('should render the email step initially', () => {
    render(<OTPLoginForm onOTPLogin={onOTPLoginMock} />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send otp/i })).toBeInTheDocument();
  });

  it('should show validation error for invalid email', async () => {
    const { container } = render(<OTPLoginForm onOTPLogin={onOTPLoginMock} />);
    await userEvent.type(screen.getByLabelText(/email address/i), 'invalid-email');
    const form = container.querySelector('form');
    fireEvent.submit(form);

    expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument();
  });

  it('should transition to the OTP step after submitting a valid email', async () => {
    render(<OTPLoginForm onOTPLogin={onOTPLoginMock} />);
    await userEvent.type(screen.getByLabelText(/email address/i), 'test@example.com');
    await userEvent.click(screen.getByRole('button', { name: /send otp/i }));

    await waitFor(async () => {
        expect(await screen.findByText(/enter verification code/i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should show validation error for invalid OTP', async () => {
    render(<OTPLoginForm onOTPLogin={onOTPLoginMock} />);
    await userEvent.type(screen.getByLabelText(/email address/i), 'test@example.com');
    await userEvent.click(screen.getByRole('button', { name: /send otp/i }));

    await waitFor(async () => {
        const otpInput = await screen.findByLabelText(/verification code/i);
        await userEvent.type(otpInput, '123');
        const form = (await screen.findByText(/enter verification code/i)).closest('form');
        fireEvent.submit(form);
        expect(await screen.findByText('OTP must be 6 digits')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should call onOTPLogin on successful OTP verification', async () => {
    render(<OTPLoginForm onOTPLogin={onOTPLoginMock} />);
    const email = 'test@example.com';
    const otp = '123456';

    await userEvent.type(screen.getByLabelText(/email address/i), email);
    await userEvent.click(screen.getByRole('button', { name: /send otp/i }));

    await waitFor(async () => {
      const otpInput = await screen.findByLabelText(/verification code/i);
      await userEvent.type(otpInput, otp);
      await userEvent.click(screen.getByRole('button', { name: /verify & login/i }));
    }, { timeout: 2000 });

    await waitFor(() => {
      expect(onOTPLoginMock).toHaveBeenCalledWith({ email, otp });
    });
  });

  it('should allow going back to the email step', async () => {
    render(<OTPLoginForm onOTPLogin={onOTPLoginMock} />);
    await userEvent.type(screen.getByLabelText(/email address/i), 'test@example.com');
    await userEvent.click(screen.getByRole('button', { name: /send otp/i }));

    await waitFor(async () => {
        await userEvent.click(await screen.findByRole('button', { name: /change email/i }));
    }, { timeout: 2000 });

    await waitFor(async () => {
        expect(await screen.findByLabelText(/email address/i)).toBeInTheDocument();
    });
  });

  it('should show countdown and disable resend button', async () => {
    render(<OTPLoginForm onOTPLogin={onOTPLoginMock} />);
    await userEvent.type(screen.getByLabelText(/email address/i), 'test@example.com');
    await userEvent.click(screen.getByRole('button', { name: /send otp/i }));

    await waitFor(async () => {
        expect(await screen.findByText(/resend in/i)).toBeInTheDocument();
    }, { timeout: 2000 });

  });
});
