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
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 401 },
    );
  }
}
export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  try {
    const body = await request.json();
    const { data } = await api.patch('/users/me', body, {
      headers: {
        Cookie: cookieStore.toString(),
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(
      'Деталі помилки від бекенду:',
      error?.response?.data || error.message,
    );

    const statusCode = error?.response?.status || 400;

    return NextResponse.json(
      { error: error?.response?.data?.message || 'Failed to update user data' },
      { status: statusCode },
    );
  }
}
