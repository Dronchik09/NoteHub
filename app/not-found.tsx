'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

const NotFound = () => {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
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
