import { EditProfile } from '@/app/settings/profile/_components/EditProfile';
import SettingsHeader from '@/app/components/SettingsHeader';
import { getProfileById } from '@/app/data/profilesApi';

export default async function EditProfilePage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;
  const profile = await getProfileById(id);
  return (
    <main className='w-full max-w-screen-2xl mx-auto px-4 py-10'>
      <section className='bg-theme-900 rounded-3xl border border-theme-700 p-6 shadow-xl'>
        <SettingsHeader title='Redigera plagg' />
        <div className='mt-8'>
          <EditProfile profile={profile} />
        </div>
      </section>
    </main>
  );
}
