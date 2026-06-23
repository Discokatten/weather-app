import { getAllClothes } from '@/app/data/clothesApi';
import { Clothes } from '../interfaces/clothesInterfaces';
import Link from 'next/link';
import ClothesCard from '../@clothes/_components/ClothesCard';

export default async function Settings() {
  const clothes: Clothes[] = await getAllClothes();
  return (
    <div className='flex flex-col mr-auto ml-50 gap-5 mt-20'>
      <Link
        href='/settings/add'
        className='bg-gray-100 p-2 max-w-20 mr-auto ml-auto text-black rounded-full '
      >
        Lägg till
      </Link>

      <div className='grid min-w-100 min-h-100 grid-cols-1 text-2xl sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full ml-auto mr-auto text-white'>
        {clothes.map((item, i) => (
          <ClothesCard key={i} item={item.name} detailedItem={item} />
        ))}
      </div>
    </div>
  );
}
