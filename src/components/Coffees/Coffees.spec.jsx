import { render, screen } from "@testing-library/react";
import { Coffees } from ".";
import { coffee as coffeeMock } from "../CoffeeCard/mockCoffeeCard";

const props = {
  coffees: [coffeeMock],
};

describe("<Coffees />", () => {
  it('should render Coffees', () => {
    render(<Coffees {...props} />);

    expect(screen.getAllByRole("heading", { name: /title/i })).toHaveLength(1);
    expect(screen.getAllByRole("img", { name: /title/i })).toHaveLength(1);
    expect(screen.getAllByText(/body/i)).toHaveLength(1);
    expect(screen.getByRole("img", { name: /title 1/i })).toHaveAttribute(
      "src",
      "img/img.png"
    );
  });

  it('should not render Coffees', () => {
    render(<Coffees />);
    expect(screen.queryByRole('heading', { name: /title/i }))
      .not.toBeInTheDocument();
  });
  
  it('should match snapshot', () => {
    const {container} = render(<Coffees {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
