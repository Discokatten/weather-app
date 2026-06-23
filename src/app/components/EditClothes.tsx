'use client';
import { useForm } from 'react-hook-form';
import { LAYERS, SEASONS, TYPES, WARMTH, WEATHER } from '../lib/consts';
import { Clothes } from '../interfaces/clothesInterfaces';
import {
  ApiError,
  createClothes,
  deleteClothes,
  updateClothes,
} from '../data/clothesApi';
import { useRouter } from 'next/navigation';
import ImagePlaceholder from './ImagePlaceholder';
import { useState } from 'react';

export const EditClothes = ({ item }: { item?: Clothes }) => {
  const router = useRouter();

  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    if (item?.item_id)
      try {
        await deleteClothes(item.item_id);

        setMessage('Borttaget!');
      } catch (error) {
        console.error('Error:', error);
      }
    else return;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Clothes>({
    mode: 'onChange',
    defaultValues: {
      name: item?.name,
      type: item?.type,
      layer: item?.layer,
      warmth: item?.warmth !== undefined ? String(item.warmth) : undefined,
      size: item?.size,
      season: item?.season || [],
      weather: item?.weather || [],
      size_system: item?.size_system,
    },
  });

  const onSubmit = async (data: Clothes) => {
    // Clear errors
    setApiErrors([]);

    // Convert from number to string
    const sizeValue = data.size as string;

    // Convert from string to number
    data.warmth = Number(data.warmth);

    // If size is empty set size null, else set alpha if string and numeric if number
    if (!sizeValue || sizeValue.trim() === '') {
      data.size = null;
      data.size_system = null;
    } else {
      data.size_system = isNaN(Number(data.size)) ? 'alpha' : 'numeric';
    }

    // Update if existring, else create
    try {
      if (item?.item_id) {
        await updateClothes(item.item_id, data);
      } else {
        await createClothes(data);
      }

      setMessage('Sparat!');

      // Redirect after 4s
      setTimeout(() => {
        router.replace('/settings');
      }, 4000);
    } catch (error) {
      if (error instanceof ApiError) {
        setApiErrors(error.errors);
      } else {
        setApiErrors(['Något gick fel, försök igen']);
      }
    }
  };

  return (
    <>
      <div className='mt-20'>
        <ImagePlaceholder />
      </div>
      <div className='bg-theme-700 mb-10 border border-theme-600 text-white rounded-2xl pt-10 flex min-w-85 justify-evenly max-w-200 m-auto  text-2xl'>
        <form onSubmit={handleSubmit(onSubmit)} className='grid gap-2 '>
          <label htmlFor='name' className='sr-only'>
            Namn på plagget
          </label>
          <input
            className='border p-2 text-3xl'
            type='text'
            id='name'
            placeholder='Ge plagget ett namn'
            {...register('name', {
              required: true,
              minLength: 2,
              maxLength: 99,
            })}
          />
          {errors.name && <span>Namnet är obligatoriskt</span>}

          <label htmlFor='type' className='mt-15 text-3xl'>
            Välj klädestyp:
          </label>
          <select id='type' className='bg-theme-600' {...register('type')}>
            {TYPES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <label htmlFor='layer' className='mt-10 text-3xl'>
            Vilket lager?
          </label>
          <select id='layer' className=' bg-theme-600' {...register('layer')}>
            {LAYERS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <label htmlFor='season' className='mt-10 text-3xl'>
            Säsong?
          </label>
          <div className='border-b mt-1 border-theme-800'>
            {SEASONS.map((season) => (
              <label
                key={season.id}
                className='flex items-center gap-4 mb-2 cursor-pointer'
              >
                <input
                  type='checkbox'
                  value={season.id}
                  {...register('season')}
                />
                {season.name}
              </label>
            ))}
          </div>
          <label htmlFor='weather' className='mt-10 text-3xl'>
            Väder?
          </label>
          <div className=' border-b mt-1 mb-1 border-theme-800'>
            {WEATHER.map((weather, i) => (
              <label
                key={i}
                className='flex items-center gap-4 mb-2 cursor-pointer'
              >
                <input
                  type='checkbox'
                  value={weather.id}
                  {...register('weather')}
                />
                {weather.name}
              </label>
            ))}
          </div>
          <div className='mb-5'>
            <label htmlFor='size' className='mt-10 mr-10 text-3xl'>
              Storlek?
            </label>
            <input
              id='size'
              type='text'
              className='border border-theme-800 rounded-lg bg-theme-600 max-w-30 p-2'
              placeholder='36 / S/M'
              {...register('size')}
            />
          </div>

          <fieldset>
            <legend className='mt-10 text-3xl'>Hur varmt? (1-4)</legend>
            <div className='flex gap-4'>
              {WARMTH.map((warmth, i) => (
                <label
                  key={i}
                  className='flex items-center gap-2 cursor-pointer'
                >
                  <input
                    type='radio'
                    className='m-5'
                    value={warmth}
                    {...register('warmth', { required: true })}
                  />
                  {warmth}
                </label>
              ))}
            </div>
            {errors.warmth && <span>Välj en värmenivå</span>}
          </fieldset>
          {apiErrors.length > 0 && (
            <ul className='text-red-400 text-xl mt-2'>
              {apiErrors.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          )}

          <div className='text-green-300 text-4xl flex justify-center mt-5'>
            {message}
          </div>
          <button
            className='rounded-2xl mt-5 mb-10 disabled:bg-theme-300 enabled:bg-theme-blue-700 p-2 cursor-pointer'
            type='submit'
            disabled={!isValid}
          >
            Spara
          </button>
        </form>
        <div>
          {item?.item_id && (
            <button
              className='absolute mr-0 mt-0 rounded-4xl border border-theme-900 enabled:bg-theme-blue-400 p-4 cursor-pointer'
              type='button'
              onClick={handleDelete}
            >
              X
            </button>
          )}
        </div>
      </div>
    </>
  );
};
