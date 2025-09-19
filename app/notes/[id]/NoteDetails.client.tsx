'use client';

import css from './NoteDetails.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';


export default function NoteDetails() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { data: note, isLoading, error } = useQuery({
    queryKey: ['notes', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error || !note) return <div>Error loading note</div>;

  return (
    <div className={css.container}>
      <button onClick={() => router.back()} className={css.backLink}>
        Back to notes
      </button>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
}