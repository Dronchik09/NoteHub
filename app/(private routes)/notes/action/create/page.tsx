import { Metadata } from 'next';
import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';

export const metadata: Metadata = {
  title: 'Notehub - Create Note',
  description: 'Create a new note to organize your tasks.',
  openGraph: {
    title: 'Notehub - Create Note',
    description: 'Create a new note to organize your tasks.',
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
