import { redirect, type LoaderFunctionArgs } from 'react-router-dom';
import axios from 'axios';
import { resourceClient } from '@api/client';
import type { Resource } from '@api/types';

export async function resourceStrictLoader({ params }: LoaderFunctionArgs): Promise<Resource> {
  const { uuid } = params;

  if (!uuid) {
    throw redirect('/?error=' + encodeURIComponent('UUID is required'));
  }

  try {
    return await resourceClient.getStrict(uuid);
  } catch (error) {
    let message = 'An unexpected error occurred';
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || 'Failed to load resource';
    }
    throw redirect('/?error=' + encodeURIComponent(message));
  }
}
