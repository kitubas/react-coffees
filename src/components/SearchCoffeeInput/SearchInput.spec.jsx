import { render, screen } from '@testing-library/react';
import { SearchCoffeeInput } from '.';
import userEvent from '@testing-library/user-event';

describe('<SearchCoffeeInput />', () => {
  it('should have a value of searchValue', () => {
    const fn = jest.fn();
    render(<SearchCoffeeInput handleSearchButtonChange={fn} searchValue={'testando'} />);

    const input = screen.getByPlaceholderText(/procure o café pelo nome/i);
    expect(input.value).toBe('testando');
  });

  it('should call handleChange function on each key pressed', () => {
    const fn = jest.fn();
    render(<SearchCoffeeInput handleSearchButtonChange={fn} searchValue="um valor" />);

    const input = screen.getByPlaceholderText(/procure o café pelo nome/i);
    const value = 'outro valor';

    userEvent.type(input, value);

    expect(input.value).toBe('um valor');
    expect(fn).toHaveBeenCalledTimes(value.length);
  });

  it('should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<SearchCoffeeInput handleSearchButtonChange={fn} searchValue="um valor" />);
    expect(container).toMatchSnapshot();
  });
});
