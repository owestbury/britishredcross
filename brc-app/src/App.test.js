import React from 'react';
import {Currency} from './components/Currency/Currency';
import { render, screen, cleanup} from '@testing-library/react';
import Enzyme, { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });
const { shallow } = Enzyme;

import App from './App';

const jsdomScroll = window.scroll;
beforeAll(() => {
  // Mock window.scroll - otherwise, Jest/JSDOM will print a not-implemented error.
  window.scroll = () => {};
});

afterAll(() => {
  window.scroll = jsdomScroll;
});

describe('App', () => {
  test('renders App component', () => {
    render(<App />);

    screen.debug();
  });
});

describe('true is truthy and false is falsy', () => {
  test('true is truthy', () => {
    expect(true).toBe(true);
  });

  test('false is falsy', () => {
    expect(false).toBe(false);
  });
});

describe("<App /> headline title", () => {
  it("Renders <App /> component correctly", () => {
    render(<App />);

    expect(
        screen.getByText(/British Red Cross - Available subscription plans/i)
    ).toBeInTheDocument();
  });
});

afterEach(cleanup)
