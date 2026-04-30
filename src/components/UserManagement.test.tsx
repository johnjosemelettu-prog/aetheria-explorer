
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { collection, getDocs } from 'firebase/firestore';
import UserManagement from './UserManagement';

// Mock the Firebase Firestore functions
jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'),
  collection: jest.fn(),
  getDocs: jest.fn(),
}));

const mockCollection = collection as jest.Mock;
const mockGetDocs = getDocs as jest.Mock;

// Mock the db object
jest.mock('../lib/firebase', () => ({
    db: {},
}));

describe('UserManagement', () => {
  const mockUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
  ];

  beforeEach(() => {
    // Clear all mocks before each test
    mockCollection.mockClear();
    mockGetDocs.mockClear();
  });

  it('renders loading state initially', () => {
    mockGetDocs.mockResolvedValue({
        docs: [],
      });
    render(<UserManagement />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders users after successful fetch', async () => {
    mockGetDocs.mockResolvedValue({
      docs: mockUsers.map(user => ({
        id: user.id,
        data: () => ({ name: user.name, email: user.email, role: user.role, status: user.status }),
      })),
    });

    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  it('handles error on fetch', async () => {
    const errorMessage = 'Failed to fetch users';
    mockGetDocs.mockRejectedValue(new Error(errorMessage));

    render(<UserManagement />);

    await waitFor(() => {
      // You might want to display an error message in your component
      // For now, let's just check that it's not in the loading state anymore
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });

  it('filters users based on search input', async () => {
    mockGetDocs.mockResolvedValue({
        docs: mockUsers.map(user => ({
          id: user.id,
          data: () => ({ name: user.name, email: user.email, role: user.role, status: user.status }),
        })),
      });

    const { getByPlaceholderText } = render(<UserManagement />);

    await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const filterInput = getByPlaceholderText('Filter by name, email, or role...');

    fireEvent.change(filterInput, { target: { value: 'John' } });

    await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });
  });
});
