import Image from 'next/image';
import css from './ProfilePage.module.css';
import Link from 'next/link';
import { Metadata } from 'next';
import { getServerMe } from '@/lib/api/serverApi';
export async function generateMetadata(): Promise<Metadata> {
  const { username, avatar } = await getServerMe();
  return {
    title: username,
    description: `Profile page of ${username}`,

    openGraph: {
      title: username,
      description: `profile of ${username}`,
      url: ``,
      siteName: 'NoteHub',
      images: [
        {
          url: avatar || '/default-avatar.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub App',
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: username,
      description: `profile of ${username}`,
      images: [avatar || '/default-avatar.jpg'],
    },
  };
}

export default async function ProfilePage() {
  const user = await getServerMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user?.avatar || '/default-avatar.jpg'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </main>
  );
}
