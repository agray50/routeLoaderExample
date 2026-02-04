import { Link } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';

export function ErrorPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey.100',
        p: 3,
      }}
    >
      <Paper sx={{ p: 4, textAlign: 'center', maxWidth: 400 }}>
        <Typography variant="h1" sx={{ fontSize: '4rem', fontWeight: 'bold' }}>
          404
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Page not found
        </Typography>
        <Button component={Link} to="/" variant="contained">
          Back to Dashboard
        </Button>
      </Paper>
    </Box>
  );
}
