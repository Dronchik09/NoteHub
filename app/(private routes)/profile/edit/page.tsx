'use client';
import { useRouter } from 'next/navigation';
import css from './EditProfilePage.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { editUser } from '@/lib/api/clientApi';
import Image from 'next/image';

export default function EditProfilePage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    const username = formData.get('username') as string;
    if (user) {
      try {
        const responce = await editUser(username);
        setUser(responce);
        router.push('/profile');
      } catch (error) {
        console.error('Error editing user:', error);
      }
    }
  };
  const handleBack = () => {
    router.push('/profile');
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
          src={user?.avatar || '/default-avatar.jpg'}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />
        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username: {user?.username}</label>
            <input
              id="username"
              type="text"
              className={css.input}
              name="username"
              defaultValue={user?.username}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleBack}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
