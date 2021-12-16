import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('Customer Component', () => {
  it('should render customer table', () => {
    const { getByText } = render(<App />);

    expect(getByText(/NAME/i)).toBeInTheDocument();
  });

  it('should sort table by name', () => {
    const { getByTestId, getByText } = render(<App />);
    
    fireEvent.click(getByTestId(/NAME-0/i));

    expect(getByText(/Wyatt loof Cox/i)).toBeInTheDocument();
  });

  it('should delete one item from table', () => {
    const { getByTestId, getByText } = render(<App />);
    
    const item = getByText(/Alexis White/i);

    fireEvent.click(getByTestId(/delete-button-0/i));
    fireEvent.click(getByTestId(/confirm-delete/i));

    expect(item).not.toBeInTheDocument();
  });

  it('should close confirm dialog on cancel', () => {
    const { getByTestId, getByText } = render(<App />);
    
    const item = getByText(/Alexis White/i);

    fireEvent.click(getByTestId(/delete-button-0/i));
    fireEvent.click(getByText(/Cancel/i));

    expect(item).toBeInTheDocument();
  });

  it('should select and unselect all items from the table', () => {
    const { getByTestId } = render(<App />);

    // select all items
    fireEvent.click(getByTestId(/select-all/i).childNodes[0]);

    for (let index = 0; index < 5; index++) {
      const checkbox = getByTestId(`checkbox-${index}`).childNodes[0] as HTMLInputElement;
      expect(checkbox.checked).toEqual(true);
    }

    // unselect all items
    fireEvent.click(getByTestId(/select-all/i).childNodes[0]);

    for (let index = 0; index < 5; index++) {
      const checkbox = getByTestId(`checkbox-${index}`).childNodes[0] as HTMLInputElement;
      expect(checkbox.checked).toEqual(false);
    }
  });

  it('should select/unselect multiple items from the table', () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(/select-all/i).childNodes[0]);

    // select first 5 items
    for (let index = 0; index < 5; index++) {
      fireEvent.click(getByTestId(`checkbox-${index}`).childNodes[0]);
    }

    // unselect items
    fireEvent.click(getByTestId(`checkbox-0`).childNodes[0]);
  });

  it('should search and filter data by name', () => {
    const { getByTestId, getByPlaceholderText } = render(<App />);
    
    const customerData = getByTestId(/checkbox-1/i);
    const searchBar = getByPlaceholderText(/Search/i);

    fireEvent.change(searchBar, {target: {value: 'alexis'}});

    expect(customerData).not.toBeInTheDocument();
  });

  it('should go to next page', () => {
    const { getByTitle, getByText } = render(<App />);
    
    fireEvent.click(getByTitle(/Go to next page/i));

    expect(getByText(/6–10 of 21/i)).toBeInTheDocument();
  });
})
