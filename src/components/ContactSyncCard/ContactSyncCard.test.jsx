import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactSyncCard } from '.';

const mockedCardData = {
  icon: '',
  title: 'A title',
  description: 'A description',
};
const mockContacts = ['contact 1', 'contact 2', 'contact 3'];

describe('ContactSyncCard component', () => {
  test('it renders with the correct data', () => {
    render(
      <ContactSyncCard
        icon={mockedCardData.title}
        title={mockedCardData.title}
        description={mockedCardData.description}
        contacts={mockContacts}
      />
    );

    expect(
      screen.getByRole('heading', { name: mockedCardData.title })
    ).toBeInTheDocument();
    expect(screen.getByText(mockedCardData.description)).toBeInTheDocument();

    mockContacts.forEach((contact) => {
      expect(screen.getByRole('option', { name: contact })).toBeInTheDocument();
    });
  });

  test('it can only select if the component is expanded', async () => {
    const mockOnSelectionChange = jest.fn();

    render(
      <ContactSyncCard
        icon={mockedCardData.title}
        title={mockedCardData.title}
        description={mockedCardData.description}
        contacts={mockContacts}
        onSelectionChange={mockOnSelectionChange}
      />
    );

    expect(() =>
      userEvent.click(screen.getByRole('option', { name: mockContacts[0] }))
    ).toThrow();

    expect(mockOnSelectionChange).not.toHaveBeenCalled();

    userEvent.click(screen.getByRole('button', { name: /all contacts/i }));

    // In order to be able to click the option, we have to wait till the "inert"
    // property on the listbox is removed
    await waitFor(() => screen.queryByRole('listbox')?.getAttribute('inert'));

    userEvent.click(screen.getByText(mockContacts[0]));

    expect(mockOnSelectionChange).toHaveBeenCalledWith([mockContacts[0]]);
  });
});
