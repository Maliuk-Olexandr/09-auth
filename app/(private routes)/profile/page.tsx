
import Link from 'next/link';
import css from './ProfilePage.module.css';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile | NoteHub',
  description: 'User profile page for NoteHub application',
  // keywords: ['profile', 'user', 'account', 'NoteHub'],
  // authors: [{ name: 'NoteHub Team', url: 'https://notehub.com' }],
  // creator: 'NoteHub Team',
  // publisher: 'NoteHub Inc.',
  // applicationName: 'NoteHub',
  alternates: {
    canonical: '/profile',
  },
  openGraph: {
    type: 'profile',
    url: '/profile',
    title: 'Profile | NoteHub',
    description: 'User profile page for NoteHub application',

  },
}

export default function ProfilePage() {
  // const user = await getServerMe();
  
  return (
  <div className={css.mainContent}>
    <div className={css.profileCard}>
      <div className={css.header}>
        <h1 className={css.formTitle}>Profile Page</h1>
        <Link href="/profile/edit" className={css.editProfileButton}>
          Edit Profile
        </Link>
      </div>
      <div className={css.avatarWrapper}>
        <Image
          src= {'/default-avatar.png'} //{user.avatar ?? '/default-avatar.png'}
          alt="User Foto"
          width={120}
          height={120}
          className={css.avatar}
        />
      </div>
      {/* <div className={css.profileInfo}>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      </div> */}
    </div>
  </div>);
}