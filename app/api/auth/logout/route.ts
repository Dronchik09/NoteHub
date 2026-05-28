import { api } from '../../api';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
export async function POST() {
  const cookieStore = await cookies();
  try {
    await api.post(
      '/auth/logout',
      {},
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    );
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    return NextResponse.json({ message: 'Successfully logged out' });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}
