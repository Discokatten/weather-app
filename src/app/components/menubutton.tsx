'use client';
import { Settings, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
export default function MenuButton() {
  const router = useRouter();

  const handleClick = () => {
    router.replace('/settings');
  };
  return (
    // Not functional yet
    <button
      className='bg-theme-800 rounded-lg p-1 text-white flex gap-1 text-sm items-center'
      onClick={handleClick}
    >
      <Settings className='h-5' />
      Hantera kläder
      <ChevronDown className='h-5' />
    </button>
    // <Link
    //   className='bg-theme-800 rounded-lg p-1 text-white flex gap-1 text-sm items-center'
    //   href='/settings'
    // >
    //   <Settings className='h-5' />
    //   Hantera kläder
    //   <ChevronDown className='h-5' />
    // </Link>;
  );
}
