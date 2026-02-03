import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UsersTable } from '@components/UsersTable';

export function Dashboard() {
  const navigate = useNavigate();

  const handleTestError = () => {
    // Navigate to a non-existent user to test error handling
    navigate('/users/00000000-0000-0000-0000-000000000000');
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">
          Users
        </Typography>
        <Button variant="outlined" color="error" onClick={handleTestError}>
          Test Error Handling
        </Button>
      </Box>
      <UsersTable />
    </>
  );
}
