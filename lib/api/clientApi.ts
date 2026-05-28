import { Note } from '@/types/note';
import { nextServer } from './api';
import { User } from '@/types/user';

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NewNoteData {
  title: string;
  content: string;
  tag: string;
}
export type UserRequest = {
  email: string;
  password: string;
};
export type CheckSessionRequest = {
  success: boolean;
};

export const fetchNotes = async (
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

  const response = await nextServer.get<FetchNotesResponse>(
    `${baseURL}/notes`,
    {
      params,
    },
  );
  return response.data;
};
export const createNote = async (newNoteData: NewNoteData): Promise<Note> => {
  const response = await nextServer.post<Note>(`${baseURL}/notes`, newNoteData);
  return response.data;
};
export const deleteNote = async (noteId: number): Promise<void> => {
  const response = await nextServer.delete(`${baseURL}/notes/${noteId}`);
  return response.data;
};
export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`${baseURL}/notes/${id}`);
  return response.data;
};
export const register = async (data: UserRequest): Promise<User> => {
  const response = await nextServer.post<User>(
    `${baseURL}/auth/register`,
    data,
  );
  return response.data;
};
export const login = async (data: UserRequest): Promise<User> => {
  const response = await nextServer.post<User>(`${baseURL}/auth/login`, data);
  return response.data;
};
export const checkSession = async () => {
  const response = await nextServer.get<CheckSessionRequest>(
    `${baseURL}/auth/session`,
  );
  return response.data.success;
};
export const getMe = async () => {
  const { data } = await nextServer.get<User>(`${baseURL}/auth/me`);
  return data;
};
export const logout = async (): Promise<void> => {
  const response = await nextServer.post(`${baseURL}/auth/logout`);
  return response.data;
};
export const editUser = async (username: string): Promise<User> => {
  const response = await nextServer.patch<User>(`${baseURL}/users/me`, {
    username,
  });
  return response.data;
};
