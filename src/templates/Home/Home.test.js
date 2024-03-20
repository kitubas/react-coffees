import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.';
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get('*api-demov3.sensedia.com/dev/4testing/v1*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          title: 'Black',
          description: 'Black coffee is...',
          ingredients: ['Coffee'],
          image: 'img1.jpg',
          id: 1,
        },
        {
          title: 'Latte',
          description: 'As the most popular coffee',
          ingredients: ['Espresso', 'Steamed Milk'],
          image: 'img2.jpg',
          id: 2,
        },
        {
          title: 'Cappuccino',
          description: 'Cappuccino is a latte made...',
          ingredients: ['Espresso', 'Steamed Milk', 'Foam'],
          image: 'img3.jpg',
          id: 3,
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  it('should render search, posts and load more', async () => {
    render(<Home />);
    const noCoffees = screen.getByText('Café não encontrado =(');

    await waitForElementToBeRemoved(noCoffees);

    expect.assertions(3);

    const search = screen.getByPlaceholderText(/procure o café pelo nome/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should search for coffees', async () => {
    render(<Home />);
    const noCoffees = screen.getByText('Café não encontrado =(');

    expect.assertions(10);

    await waitForElementToBeRemoved(noCoffees);

    const search = screen.getByPlaceholderText(/procure o café pelo nome/i);

    expect(screen.getByRole('heading', { name: 'Black' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Latte' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Cappuccino' })).not.toBeInTheDocument();

    userEvent.type(search, 'Black');
    expect(screen.getByRole('heading', { name: 'Black' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Latte' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Cappuccino' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Search value: Black' })).toBeInTheDocument();

    userEvent.clear(search);
    expect(screen.getByRole('heading', { name: 'Black' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Latte' })).toBeInTheDocument();

    userEvent.type(search, 'coffee does not exist');
    expect(screen.getByText('Café não encontrado =(')).toBeInTheDocument();
  });

  it('should load more coffees', async () => {
    render(<Home />);
    const noCoffees = screen.getByText('Café não encontrado =(');

    await waitForElementToBeRemoved(noCoffees);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
    userEvent.click(button);

    await waitFor(() => expect(button).toBeDisabled());
    expect(screen.getByRole('heading', { name: 'Cappuccino' })).toBeInTheDocument();
  });
});
