import SettingsHeader from '@/app/components/SettingsHeader';
import { EditProfile } from '@/app/settings/profile/_components/EditProfile';

export default async function EditUserPage() {
  return (
    <main className='w-full max-w-screen-2xl mx-auto px-4 py-10'>
      <section className='bg-theme-900 rounded-3xl border border-theme-700 p-6 shadow-xl'>
        <SettingsHeader title='Lägg till ny användare' />
        <div className='mt-8'>
          <EditProfile />
        </div>
      </section>
    </main>
  );
}
