'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { SearchIcon } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className='flex justify-center w-full my-10'>
      <div className='relative w-full max-w-md'>
        <input
          type='text'
          placeholder='Sök efter kläder...'
          defaultValue={searchParams.get('query')?.toString() || ''}
          onChange={(e) => handleSearch(e.target.value)}
          className='w-full rounded-full bg-gray-100 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300'
        />
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <SearchIcon className='h-5 w-5 text-gray-400' />
        </div>
      </div>
    </div>
  );
}
