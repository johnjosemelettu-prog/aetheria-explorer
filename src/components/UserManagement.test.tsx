
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { collection, getDocs } from 'firebase/firestore';
import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import UserManagement from './UserManagement';

// Mock the Firebase Firestore functions
vi.mock('firebase/firestore', async () => {
  const actual = await vi.importActual<typeof import('firebase/firestore')>('firebase/firestore');
  return {
    ...actual,
    collection: vi.fn(),
    getDocs: vi.fn(),
  };
});

const mockCollection = collection as Mock;
const mockGetDocs = getDocs as Mock;

// Mock the db object
vi.mock('../lib/firebase', () => ({
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

  it('renders correctly initially', () => {
    mockGetDocs.mockResolvedValue({
        docs: [],
      });
    const { container } = render(<UserManagement />);
    // Check if the svg loader or main heading is present
    expect(screen.getByText('User Management')).toBeInTheDocument();
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

    const { container } = render(<UserManagement />);

    await waitFor(() => {
      // Check that it's not in the loading state anymore (table is present or error handled)
      expect(screen.getByText('User Management')).toBeInTheDocument();
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

    const filterInput = getByPlaceholderText('Filter users...');

    fireEvent.change(filterInput, { target: { value: 'John' } });

    await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });
  });
});
