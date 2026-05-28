'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NotHub - Page Not Found',
  description: 'The page you are looking for does not exist.',
  openGraph: {
    title: 'NotHub - Page Not Found',
    description: 'The page you are looking for does not exist.',
    url: 'https://notehub.app/not-found',
    images: [
      {
        url: '/page-note-found.jpeg',
        width: 1200,
        height: 630,
        alt: 'page not found',
      },
    ],
  },
};

const NotFound = () => {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      () => router.push('/');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>
        The page you are looking for does not exist. You will be redirected to
        the homepage shortly.
      </p>
      <Link href="/">Go to Homepage</Link>
    </div>
  );
};
export default NotFound;
