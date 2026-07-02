'use client';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { capitalize } from '@/app/utils/pageUtils';
import { Profile } from '@/app/interfaces/profileInterfaces';
import {
  ApiError,
  createProfile,
  deleteProfile,
  updateProfile,
} from '@/app/data/profilesApi';
import ImagePlaceholder from '@/app/components/ImagePlaceholder';
import { Confirm } from '@/app/components/Confirm';

export const EditProfile = ({ profile }: { profile?: Profile }) => {
  const router = useRouter();

  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const userName = capitalize(profile?.name);

  const handleDelete = async () => {
    if (!profile?.id) return;

    try {
      await deleteProfile(profile.id);

      setMessage('Borttaget!');
      setConfirmDelete(false);
      setTimeout(() => {
        router.replace('/settings/profile');
      }, 4000);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Profile>({
    mode: 'onChange',
    defaultValues: {
      name: userName,
    },
  });

  const onSubmit = async (data: Profile) => {
    // Clear errors
    setApiErrors([]);

    // Update if existing, else create
    try {
      if (profile?.id) {
        await updateProfile(profile.id, data);
      } else {
        await createProfile(data);
      }

      setMessage('Sparat!');

      // Redirect after 4s
      setTimeout(() => {
        router.replace('/settings/profile');
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
          Namn
        </label>
        <input
          className='w-full rounded-3xl border border-theme-600 bg-theme-800 p-4 text-2xl text-white placeholder:text-theme-300 focus:border-theme-blue-500 focus:outline-none focus:ring-2 focus:ring-theme-blue-500'
          type='text'
          id='name'
          placeholder='Namn'
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
        {profile?.id && (
          <button
            className='rounded-3xl border mt-5  border-red-500 bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500'
            type='button'
            onClick={() => setConfirmDelete(true)}
          >
            Ta bort
          </button>
        )}
      </div>
      {confirmDelete && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <Confirm
            onCancel={() => setConfirmDelete(false)}
            onConfirm={handleDelete}
          />
        </div>
      )}
    </div>
  );
};
