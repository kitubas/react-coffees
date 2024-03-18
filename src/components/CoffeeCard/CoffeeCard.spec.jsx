import { render, screen } from "@testing-library/react";
import { CoffeeCard } from ".";
import { coffee as coffeeMock }  from "./mockCoffeeCard";

describe("<CoffeeCard />", () => {
  it('should render CoffeeCard correctly', () => {
    render(<CoffeeCard coffee={coffeeMock} />);

    expect(screen.getByAltText(coffeeMock.title))
    .toHaveAttribute('src', 'img/img.png');

    expect(screen.getByRole('heading', { name: coffeeMock.title })).toBeInTheDocument();
    expect(screen.getByText(coffeeMock.description)).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const {container} = render(<CoffeeCard coffee={coffeeMock} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
