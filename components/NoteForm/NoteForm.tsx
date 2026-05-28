'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote, NewNoteData } from '../../lib/api/api';
import css from './NoteForm.module.css';
import { useNoteStore } from '@/lib/store/noteStore';
import { useRouter } from 'next/navigation';
export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };
  const handleCancel = () => {
    router.back();
  };

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.push('/notes/filter/All');
    },
  });
  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as NewNoteData;
    createNoteMutation.mutate(values);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className={css.input}
          required
          min={3}
          onChange={handleChange}
          defaultValue={draft.title}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          className={css.textarea}
          maxLength={500}
          defaultValue={draft.content}
          onChange={handleChange}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          required
          onChange={handleChange}
          defaultValue={draft.tag}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>
      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={createNoteMutation.isPending}
        >
          {createNoteMutation.isPending ? 'Creating...' : 'Create Note'}
        </button>
      </div>
    </form>
  );
}
