import { EditClothes } from '@/app/settings/_components/EditClothes';
import { getClothesById } from '@/app/data/clothesApi';
import SettingsHeader from '@/app/components/SettingsHeader';

export default async function EditPage({ params }: { params: { id: number } }) {
  const { id } = await params;
  const item = await getClothesById(id);
  return (
    <main className='w-full max-w-screen-2xl mx-auto px-4 py-10'>
      <section className='bg-theme-900 rounded-3xl border border-theme-700 p-6 shadow-xl'>
        <SettingsHeader title='Redigera plagg' />
        <div className='mt-8'>
          <EditClothes item={item} />
        </div>
      </section>
    </main>
  );
}
