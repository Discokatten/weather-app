'use client';
import { Settings, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function MenuButton() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative' ref={menuRef}>
      <button
        className='bg-theme-800 rounded-lg p-2 text-white flex gap-2 items-center text-sm md:text-base'
        onClick={() => setOpen((prev) => !prev)}
        type='button'
      >
        <Settings className='h-5 w-5' />
        Hantera kläder
        <ChevronDown
          className={`h-5 w-5 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className='absolute right-0 mt-2 w-48 rounded-xl border border-theme-700 bg-theme-900 p-2 shadow-lg'>
          <Link
            href='/settings'
            className='block rounded-md px-3 py-2 text-white hover:bg-theme-800'
            onClick={() => setOpen(false)}
          >
            Alla kläder
          </Link>
          <Link
            href='/settings/add'
            className='block rounded-md px-3 py-2 text-white hover:bg-theme-800'
            onClick={() => setOpen(false)}
          >
            Lägg till kläder
          </Link>
          <Link
            href='/settings/profile/'
            className='block rounded-md px-3 py-2 text-white hover:bg-theme-800'
            onClick={() => setOpen(false)}
          >
            Gå till profil
          </Link>
        </div>
      )}
    </div>
  );
}
