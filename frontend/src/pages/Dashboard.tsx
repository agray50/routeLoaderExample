import { Typography } from '@mui/material';
import { UsersTable } from '@components/UsersTable';

export function Dashboard() {
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Users
      </Typography>
      <UsersTable />
    </>
  );
}
