import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { api } from '../../api';
export async function GET() {
  const cookieStore = await cookies();
  try {
    const { data } = await api.get('/users/me', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 },
    );
  }
}
