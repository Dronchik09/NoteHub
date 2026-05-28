import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteByIdServer } from '@/lib/api/serverApi';
import NoteDetailsClient from './NotesDetails.client';

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}
export async function generateMetadata({ params }: NoteDetailsProps) {
  const { id } = await params;
  const note = await fetchNoteByIdServer(id);

  return {
    title: ` ${note.title}`,
    description: `Деталі нотатки: ${note.title}`,
    openGraph: {
      title: `Нотатка - ${note.title}`,
      description: `Деталі нотатки: ${note.title}.`,
      url: `https://notehub.app/notes/${id}`,
      images: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
    },
  };
}
export default async function NoteDetails({ params }: NoteDetailsProps) {
  const { id } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteByIdServer(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
