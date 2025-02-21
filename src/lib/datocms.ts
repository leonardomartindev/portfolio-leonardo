import { executeQuery } from '@datocms/cda-client';

export const performRequest = (query: string, options: any) => {
  return executeQuery(query, {
    ...options,
    token: process.env.NEXT_DATOCMS_API_TOKEN,
    environment: process.env.NEXT_DATOCMS_ENVIRONMENT,
  });
}