import { AxiosError } from 'axios';
import { PropsWithChildren } from 'react';

interface RestQueryStateProps extends PropsWithChildren {
  loading: boolean;
  error: any;
}

export default function RestQueryState({ loading, error, children }:RestQueryStateProps) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.response?.data?.data || "Something went wrong, please try again"}</p>;
  return <>{children}</>
}