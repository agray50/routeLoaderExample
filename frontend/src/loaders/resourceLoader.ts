import type { LoaderFunctionArgs } from 'react-router-dom';
import axios from 'axios';
import { resourceClient } from '@api/client';
import type { Resource } from '@api/types';

export async function resourceLoader({ params }: LoaderFunctionArgs): Promise<Resource> {
  const { uuid } = params;

  if (!uuid) {
    throw new Response('UUID is required', { status: 400 });
  }

  try {
    return await resourceClient.get(uuid);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || 'Failed to load resource';
      throw new Response(message, { status });
    }
    throw new Response('An unexpected error occurred', { status: 500 });
  }
}
