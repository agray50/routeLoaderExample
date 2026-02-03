import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Box,
  Link,
} from '@mui/material';
import { useUsers } from '@hooks/useUsers';
import type { User } from '@api/types';

export function UsersTable() {
  const navigate = useNavigate();
  const { users, loading, error } = useUsers();

  const handleNameClick = (user: User) => {
    navigate(`/users/${user.uuid}`);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'primary.main' }}>
            <TableCell sx={{ color: 'white' }}>Name</TableCell>
            <TableCell sx={{ color: 'white' }}>ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.uuid} hover>
              <TableCell>
                <Link
                  component="button"
                  variant="body1"
                  onClick={() => handleNameClick(user)}
                  sx={{ cursor: 'pointer' }}
                >
                  {user.name}
                </Link>
              </TableCell>
              <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                {user.uuid}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
