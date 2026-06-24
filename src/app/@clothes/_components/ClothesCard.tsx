import ImagePlaceholder from '@/app/components/ImagePlaceholder';
import {
  Clothes,
  LAYER_LABELS,
  SEASON_LABELS,
  TYPE_LABELS,
} from '@/app/interfaces/clothesInterfaces';
import Link from 'next/link';

export default function ClothesCard({
  item,
  detailedItem,
}: {
  item: string;
  detailedItem?: Clothes;
}) {
  return (
    <div className='bg-theme-700 border-2 border-theme-600 rounded-2xl content-center text-center p-7 m-4'>
      {detailedItem && <ImagePlaceholder />}
      <p className='text-4xl mb-10'>{item}</p>
      {detailedItem && (
        <>
          <div className='border-b border-theme-600 mt-2 flex justify-between'>
            <p>Typ:</p>
            <p>{TYPE_LABELS[detailedItem.type]}</p>
          </div>
          <div className='border-b border-theme-600 mt-2 flex justify-between'>
            <p>Lager:</p>
            <p> {LAYER_LABELS[detailedItem.layer]}</p>
          </div>
          <div className='border-b border-theme-600 mt-2 flex justify-between'>
            <p>Värme:</p>
            <p> {detailedItem.warmth}</p>
          </div>
          <div className='border-b border-theme-600 flex mt-2 justify-between'>
            <p>Säsong:</p>
            <p>
              {detailedItem.season?.map((s) => SEASON_LABELS[s]).join(', ')}
            </p>
          </div>
          <div className='border-b border-theme-600 flex mt-2 mb-15 justify-between'>
            <p>Storlek: </p>
            <p>{detailedItem.size}</p>
          </div>
          <Link
            className=' bg-theme-600 border border-theme-800 p-5 rounded-2xl'
            href={`/settings/${detailedItem.id}`}
          >
            Redigera
          </Link>
        </>
      )}
    </div>
  );
}
