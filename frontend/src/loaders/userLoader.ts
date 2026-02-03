import { redirect, type LoaderFunctionArgs } from 'react-router-dom';
import axios from 'axios';
import { userClient } from '@api/client';
import type { UserDetail } from '@api/types';

export async function userLoader({ params }: LoaderFunctionArgs): Promise<UserDetail> {
  const { id } = params;

  if (!id) {
    throw redirect('/?error=' + encodeURIComponent('User ID is required'));
  }

  try {
    return await userClient.get(id);
  } catch (error) {
    let message = 'An unexpected error occurred';
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || 'Failed to load user';
    }
    throw redirect('/?error=' + encodeURIComponent(message));
  }
}
