import { render, screen } from '@testing-library/react';
import Home from '../app/page';
import { expect, test } from 'vitest';

test('Home renders correctly', () => {
  render(<Home />);
  expect(screen.getByText(/SkillSync/i)).toBeDefined();
});
