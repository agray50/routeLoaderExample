import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';

export function ErrorPage() {
  const error = useRouteError();

  let status = 500;
  let message = 'An unexpected error occurred';

  if (isRouteErrorResponse(error)) {
    status = error.status;
    message = error.data || error.statusText;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'error.main',
        p: 3,
      }}
    >
      <Paper sx={{ p: 4, textAlign: 'center', maxWidth: 400 }}>
        <Typography variant="h1" sx={{ fontSize: '4rem', fontWeight: 'bold' }}>
          {status}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {message}
        </Typography>
        <Button component={Link} to="/" variant="contained">
          Back to Dashboard
        </Button>
      </Paper>
    </Box>
  );
}
