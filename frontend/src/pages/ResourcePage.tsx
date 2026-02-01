import { useLoaderData } from 'react-router-dom';
import type { Resource } from '@api/types';
import { ResourceHeader, ResourceTabs } from '@components/resource';

export function ResourcePage() {
  const resource = useLoaderData() as Resource;

  return (
    <>
      <ResourceHeader resource={resource} />
      <ResourceTabs />
    </>
  );
}
