'use client';

import css from './signUpPage.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register, UserRequest } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData.entries()) as UserRequest;
      const res = await register(formValues);
      if (res) {
        setUser(res);
        router.push('/profile');
      } else {
        setError('Failed to register user');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Something went wrong. Please try again.');
    }
  };
  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form action={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>
      </form>
      {error && <p className={css.error}>{error}</p>}
    </main>
  );
}
