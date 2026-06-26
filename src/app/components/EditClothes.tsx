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
import { capitalize } from '../utils/pageUtils';

export const EditClothes = ({ item }: { item?: Clothes }) => {
  const router = useRouter();

  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const itemName = capitalize(item?.name);

  const handleDelete = async () => {
    if (item?.id)
      try {
        await deleteClothes(item.id);

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
      name: itemName,
      type: item?.type,
      layer: item?.layer === 'none' ? undefined : item?.layer,
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

    // Update if existing, else create
    try {
      if (item?.id) {
        await updateClothes(item.id, data);
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
    <div className='bg-theme-700 border max-w-250 border-theme-600 rounded-3xl mr-auto ml-auto p-8 text-white shadow-lg'>
      <ImagePlaceholder />

      <form onSubmit={handleSubmit(onSubmit)} className='grid gap-6 text-lg'>
        <label htmlFor='name' className='sr-only'>
          Namn på plagget
        </label>
        <input
          className='w-full rounded-3xl border border-theme-600 bg-theme-800 p-4 text-2xl text-white placeholder:text-theme-300 focus:border-theme-blue-500 focus:outline-none focus:ring-2 focus:ring-theme-blue-500'
          type='text'
          id='name'
          placeholder='Namnge plagget'
          {...register('name', {
            required: true,
            minLength: 2,
            maxLength: 99,
          })}
        />
        {errors.name && (
          <span className='text-theme-orange text-sm'>
            Namnet är obligatoriskt
          </span>
        )}

        <label htmlFor='type' className='text-xl font-semibold'>
          Välj klädestyp
        </label>
        <select
          id='type'
          className='w-full rounded-3xl border border-theme-600 bg-theme-800 p-4 text-white focus:border-theme-blue-500 focus:outline-none focus:ring-2 focus:ring-theme-blue-500'
          {...register('type')}
        >
          {TYPES.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <label htmlFor='layer' className='text-xl font-semibold'>
          Vilket lager?
        </label>
        <select
          id='layer'
          className='w-full rounded-3xl border border-theme-600 bg-theme-800 p-4 text-white focus:border-theme-blue-500 focus:outline-none focus:ring-2 focus:ring-theme-blue-500'
          {...register('layer')}
        >
          <option value=''>Välj lager</option>
          {LAYERS.filter((item) => item.id !== 'none').map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <label htmlFor='season' className='text-xl font-semibold'>
          Säsong
        </label>
        <div className='grid gap-3 rounded-3xl border border-theme-600 bg-theme-800 p-4'>
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
        <label htmlFor='weather' className='text-xl font-semibold'>
          Väder
        </label>
        <div className='grid gap-3 rounded-3xl border border-theme-600 bg-theme-800 p-4'>
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
        <div className='grid gap-3'>
          <label htmlFor='size' className='text-xl font-semibold'>
            Storlek
          </label>
          <input
            id='size'
            type='text'
            className='w-full rounded-3xl border border-theme-600 bg-theme-800 p-4 text-white placeholder:text-theme-300 focus:border-theme-blue-500 focus:outline-none focus:ring-2 focus:ring-theme-blue-500'
            placeholder='36 / S/M'
            {...register('size')}
          />
        </div>

        <fieldset className='grid gap-4 rounded-3xl border border-theme-600 bg-theme-800 p-4'>
          <legend className='text-xl font-semibold'>Hur varmt? (1-4)</legend>
          <div className='grid gap-3 sm:grid-cols-4'>
            {WARMTH.map((warmth, i) => (
              <label
                key={i}
                className='inline-flex items-center justify-center gap-3 rounded-3xl border border-theme-600 bg-theme-900 px-4 py-3 text-white transition hover:border-theme-blue-500 hover:bg-theme-800 cursor-pointer'
              >
                <input
                  type='radio'
                  className='h-5 w-5 accent-theme-blue-500'
                  value={warmth}
                  {...register('warmth', { required: true })}
                />
                <span>{warmth}</span>
              </label>
            ))}
          </div>
          {errors.warmth && (
            <span className='text-theme-orange text-sm'>Välj en värmenivå</span>
          )}
        </fieldset>
        {apiErrors.length > 0 && (
          <ul className='text-red-400 text-lg mt-2 space-y-2'>
            {apiErrors.map((e, i) => (
              <li key={i}>• {e}</li>
            ))}
          </ul>
        )}

        <div className='text-green-300 text-xl flex justify-center mt-5'>
          {message}
        </div>
        <button
          className='w-70 rounded-3xl mr-auto ml-auto bg-theme-blue-700 py-4 text-xl font-semibold transition hover:bg-theme-blue-500 disabled:bg-theme-300 disabled:text-gray-700'
          type='submit'
          disabled={!isValid}
        >
          Spara
        </button>
      </form>
      <div className='flex justify-end'>
        {item?.id && (
          <button
            className='rounded-3xl border mt-5  border-red-500 bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500'
            type='button'
            onClick={handleDelete}
          >
            Ta bort
          </button>
        )}
      </div>
    </div>
  );
};
