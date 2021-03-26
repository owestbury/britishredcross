import React from 'react';
import App from './App';
import {Currency} from './components/Currency/Currency';
import { render, screen, cleanup, fireEvent } from "./testing/custom-render";

window.fetch = jest.fn(() => {
  const currency = { 'code': 'gb', 'symbol': '£', 'rate': 1 };

  return Promise.resolve({
    json: () => Promise.resolve(currency),
  });
});

const jsdomScroll = window.scroll;
beforeAll(() => {
  // Mock window.scroll - otherwise, Jest/JSDOM will print a not-implemented error.
  window.scroll = () => {};
});

afterAll(() => {
  window.scroll = jsdomScroll;
});

afterEach(cleanup)

describe("<App /> headline title", () => {
  it("Renders <App /> component correctly", () => {
    render(<App />);
    expect(
        screen.getByText(/Stockopedia - Available subscription plans/i)
    ).toBeInTheDocument();
  });
});

describe("<App /> Match h4 title", () => {
  it('should equal to 0', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('subscription')).toHaveTextContent('Subscription')
  });
});

