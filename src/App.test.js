import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders loading screen', () => {
    //Arrange
    render(<App />);

    //Assert
    const linkElement = screen.getByText(/Searching.../i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders list of shows if request succeeds', async () => {
    //Arrange
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ show: { id: 1, name: "Mock", summary:"<p>This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in their 20s.</p>" } }]),
      })
    );
    render(<App />);

    //Assert
    const listItemElements = await screen.findAllByRole('listitem');
    expect(listItemElements).not.toHaveLength(0);
  });

  test('renders error message if request fails', async () => {
    //Arrange
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve([{ }]),
      })
    );
    render(<App />);
    await waitFor(() => expect(screen.getByText("There was an unexpected error.")).toBeInTheDocument());

    //Assert
    const linkElement =  screen.getByText("There was an unexpected error.");
    expect(linkElement).not.toBe(null);
  });
});
