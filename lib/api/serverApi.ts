import { cookies, headers } from 'next/headers';
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
  const headersData = await headers();

  const host = headersData.get('host');
  const protocol = host?.includes('localhost') ? 'http' : 'https';
  const exactBaseUrl = `${protocol}://${host}/api`;
  const responce = await nextServer.get<User>(`/users/me`, {
    baseURL: exactBaseUrl,
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
  const headersData = await headers();
  const host = headersData.get('host');
  const protocol = host?.includes('localhost') ? 'http' : 'https';
  const exactBaseUrl = `${protocol}://${host}/api`;

  const response = await nextServer.get<FetchNotesResponse>(`/notes`, {
    baseURL: exactBaseUrl,
    params,
    headers: {
      Cookie: cookiesData.toString(),
    },
  });
  return response.data;
};
export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const cookiesData = await cookies();
  const headersData = await headers();
  const host = headersData.get('host');
  const protocol = host?.includes('localhost') ? 'http' : 'https';
  const exactBaseUrl = `${protocol}://${host}/api`;

  const response = await nextServer.get<Note>(`/notes/${id}`, {
    baseURL: exactBaseUrl,
    headers: {
      Cookie: cookiesData.toString(),
    },
  });
  return response.data;
};
