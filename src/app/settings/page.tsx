import { getAllClothes } from '@/app/data/clothesApi';
import { Clothes } from '../interfaces/clothesInterfaces';
import ClothesCard from '../@clothes/_components/ClothesCard';
import SettingsHeader from '@/app/components/SettingsHeader';

export default async function Settings() {
  const clothes: Clothes[] = await getAllClothes();
  return (
    <main className='w-full max-w-screen-2xl mx-auto px-4 py-10'>
      <section className='bg-theme-900 rounded-3xl border border-theme-700 p-6 shadow-xl'>
        <SettingsHeader
          title='Hantera kläder'
          label='Lägg till kläder'
          link='/settings/add'
        />
        <div className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {clothes.map((item, i) => (
            <ClothesCard key={i} item={item.name} detailedItem={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
