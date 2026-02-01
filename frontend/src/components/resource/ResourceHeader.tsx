import { Box, Typography } from '@mui/material';
import type { Resource } from '@api/types';

interface ResourceHeaderProps {
  resource: Resource;
}

export function ResourceHeader({ resource }: ResourceHeaderProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" component="h1">
        {resource.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
        {resource.uuid}
      </Typography>
    </Box>
  );
}
