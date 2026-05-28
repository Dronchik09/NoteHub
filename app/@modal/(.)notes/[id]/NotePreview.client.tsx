'use client';
import { useRouter, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import NoteModal from '@/components/NoteModal/NoteModal';
import css from './NotePreview.module.css';

const NotePreviewClient = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const handleClose = () => {
    router.back();
  };

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error || !note) {
    return <p>Something went wrong.</p>;
  }
  return (
    <NoteModal onClose={handleClose}>
      <div className={css.container}>
        {note && (
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            {note.tag && <p className={css.tag}>Tag: {note.tag}</p>}
          </div>
        )}
      </div>
    </NoteModal>
  );
};
export default NotePreviewClient;
