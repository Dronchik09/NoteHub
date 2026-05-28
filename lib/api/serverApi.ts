import { cookies } from 'next/headers';
import { nextServer } from './api';
import { CheckSessionRequest, FetchNotesResponse } from './clientApi';
import { User } from '@/types/user';
import { Note } from '@/types/note';

export const checkServerSession = async () => {
  const cookiesData = await cookies();

  const responce = await nextServer.get<CheckSessionRequest>(`/auth/session`, {
    headers: {
      Cookie: cookiesData.toString(),
    },
  });
  return responce;
};
export const getServerMe = async () => {
  const cookiesData = await cookies();

  const responce = await nextServer.get<User>(`/users/me`, {
    headers: {
      Cookie: cookiesData.toString(),
    },
  });
  return responce.data;
};
export const fetchNotesServer = async (
  search: string,
  page: number,
  categoryId?: string,
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page: page };
  if (search) {
    params.search = search;
  }
  if (categoryId && categoryId !== 'All') {
    params.tag = categoryId;
  }
  const cookiesData = await cookies();

  const response = await nextServer.get<FetchNotesResponse>(`/notes`, {
    params,
    headers: {
      Cookie: cookiesData.toString(),
    },
  });
  return response.data;
};
export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const cookiesData = await cookies();
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookiesData.toString(),
    },
  });
  return response.data;
};
