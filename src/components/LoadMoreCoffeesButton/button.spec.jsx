import { render, screen } from '@testing-library/react';
import { LoadMoreCoffeesButton } from '.';
import userEvent from '@testing-library/user-event';

describe('<Button />', () => {
  it('should render button with the text "Load More"', () => {
    const fn = jest.fn();
    render(<LoadMoreCoffeesButton text="Load more" onClick={fn} />);

    expect.assertions(1);

    const button = screen.getByRole('button', { name: /load more/i });

    expect(button).toBeInTheDocument();
  });

  it('should call function on button click', () => {
    const fn = jest.fn();
    render(<LoadMoreCoffeesButton text="Load more" onClick={fn} />);

    const button = screen.getByRole('button', { name: /load more/i });

    userEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled is true', () => {
    const fn = jest.fn();
    render(<LoadMoreCoffeesButton text="Load more" onClick={fn} disabled={true} />);
    const button = screen.getByRole('button', { name: /load more/i });
    expect(button).toBeDisabled();
  });

  it('should be enabled when disabled is false', () => {
    const fn = jest.fn();
    render(<LoadMoreCoffeesButton text="Load more" disabled={false} onClick={fn} />);
    const button = screen.getByRole('button', { name: /load more/i });
    expect(button).toBeEnabled();
  });
});
