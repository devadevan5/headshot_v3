import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('should render and respond to clicks', async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Test Checkbox" onChange={onChange} />);

    const checkbox = screen.getByLabelText('Test Checkbox');
    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);

    expect(onChange).toHaveBeenCalled();
  });
});
