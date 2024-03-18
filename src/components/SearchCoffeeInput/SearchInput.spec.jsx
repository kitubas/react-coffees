import { render, screen } from "@testing-library/react";
import { SearchCoffeeInput } from ".";
import userEvent from "@testing-library/user-event";

describe("<SearchCoffeeInput />", () => {
  it("should have a value of searchValue", () => {
    const fn = jest.fn();
    render(<SearchCoffeeInput handleSearchButtonChange={fn} searchValue={"testando"} />);

    const input = screen.getByPlaceholderText(/procure o café pelo nome/i);
    expect(input.value).toBe("testando");
  });

  it("should call handleChange function on each key pressed", () => {
    const fn = jest.fn();
    render(<SearchCoffeeInput handleSearchButtonChange={fn} />);

    const input = screen.getByPlaceholderText(/procure o café pelo nome/i);
    const value = "o valor";

    userEvent.type(input, value);

    expect(input.value).toBe(value);
    expect(fn).toHaveBeenCalledTimes(value.length);
  });

  it("should match snapshot", () => {
    const fn = jest.fn();
    const { container } = render(<SearchCoffeeInput handleSearchButtonChange={fn} />);
    expect(container).toMatchSnapshot();
  });
});
