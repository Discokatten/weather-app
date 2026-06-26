import SettingsHeader from '@/app/components/SettingsHeader';
import { getAllProfiles } from '@/app/data/profilesApi';
import { Profile } from '@/app/interfaces/profileInterfaces';

export default async function ProfilePage() {
  const profiles: Profile[] = await getAllProfiles();
  return (
    <main className='w-full max-w-screen-2xl mx-auto px-4 py-10'>
      <section className='bg-theme-900 rounded-3xl border border-theme-700 p-6 shadow-xl'>
        <SettingsHeader
          title='Hantera användare'
          label='Lägg till användare'
          link='/settings/profile/add'
        />
        <div className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {profiles.map((profile) => (
            <a
              key={profile.id}
              href={`/settings/profile/${profile.id}`}
              className='block rounded-3xl border border-theme-700 bg-theme-800 p-8 text-center transition hover:border-theme-blue-500'
            >
              <p className='text-4xl mb-4'>{profile.name}</p>
              <span className='rounded-full bg-theme-blue-700 px-4 py-2 text-sm font-semibold'>
                Redigera användare
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
