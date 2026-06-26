import { EditClothes } from '@/app/components/EditClothes';
import SettingsHeader from '@/app/components/SettingsHeader';

export default function Add() {
  return (
    <main className='w-full max-w-screen-2xl mx-auto px-4 py-10'>
      <section className='bg-theme-900 rounded-3xl border border-theme-700 p-6 shadow-xl'>
        <SettingsHeader title='Lägg till nytt plagg' />
        <div className='mt-8'>
          <EditClothes />
        </div>
      </section>
    </main>
  );
}
