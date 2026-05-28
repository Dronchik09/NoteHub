'use client';
import css from './NotesPage.module.css';
import NoteList from '@/components/NoteList/NoteList';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api/clientApi';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteModal from '@/components/NoteModal/NoteModal';
import { Note } from '@/types/note';
import NoteForm from '@/components/NoteForm/NoteForm';
import Link from 'next/link';

interface NotesClientProps {
  initialResponse: {
    notes: Note[];
    totalPages: number;
  };
  tag?: string;
}

export default function NotesClient({
  initialResponse,
  tag,
}: NotesClientProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [debouncedSearchQuery] = useDebounce<string>(searchQuery, 300);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const loadNotes = useQuery({
    queryKey: ['notes', debouncedSearchQuery, currentPage, tag],
    queryFn: () =>
      fetchNotes(
        debouncedSearchQuery || '',
        currentPage,
        tag === 'all' ? '' : tag,
      ),
    placeholderData: keepPreviousData,
    initialData: initialResponse,
    refetchOnMount: false,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox searchQuery={searchQuery} onChange={handleSearch} />
        {loadNotes.isSuccess && loadNotes.data.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={loadNotes.data.totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {loadNotes?.isSuccess && loadNotes.data.notes.length > 0 && (
        <NoteList notes={loadNotes.data.notes} />
      )}
    </div>
  );
}
