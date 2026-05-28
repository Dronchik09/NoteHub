import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { api } from '../../api';
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const cookieStore = await cookies();
  const { id } = await params;
  try {
    const { data } = await api.get(`/notes/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch note' },
      { status: 500 },
    );
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const cookieStore = await cookies();
  const { id } = await params;
  try {
    await api.delete(`/notes/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(
      { message: 'Note deleted successfully' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete note' },
      { status: 500 },
    );
  }
}
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const cookieStore = await cookies();
  const { id } = await params;
  const body = await request.json();
  try {
    const { data } = await api.patch(`/notes/${id}`, body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update note' },
      { status: 500 },
    );
  }
}
