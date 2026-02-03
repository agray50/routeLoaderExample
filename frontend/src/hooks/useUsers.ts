import { useState, useEffect } from 'react';
import { usersClient } from '@api/client';
import type { User } from '@api/types';

interface UseUsersResult {
  users: User[];
  loading: boolean;
  error: string | null;
}

export function useUsers(): UseUsersResult {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await usersClient.getAll();
        setUsers(data);
      } catch {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return { users, loading, error };
}
