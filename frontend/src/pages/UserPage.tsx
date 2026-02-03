import { useLoaderData, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import type { UserDetail } from '@api/types';

export function UserPage() {
  const user = useLoaderData() as UserDetail;
  const navigate = useNavigate();

  return (
    <Box>
      <Button
        variant="text"
        onClick={() => navigate('/')}
        sx={{ mb: 2 }}
      >
        &larr; Back to Dashboard
      </Button>

      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {user.name}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body1">
              <strong>ID:</strong>{' '}
              <Typography component="span" sx={{ fontFamily: 'monospace' }}>
                {user.id}
              </Typography>
            </Typography>
            <Typography variant="body1">
              <strong>Created At:</strong>{' '}
              {new Date(user.createdAt).toLocaleString()}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
