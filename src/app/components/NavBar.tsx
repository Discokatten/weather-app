import Image from 'next/image';
import Link from 'next/link';
import MenuButton from '@/app/components/MenuButton';

export default function NavBar() {
  return (
    <nav className='md:w-fv flex flex-wrap items-center justify-around gap-4 h-24 m-3 p-2'>
      <Link href='/' className='flex items-center gap-3'>
        <Image
          src='/partly-cloudy-day.svg'
          alt='logo'
          height={70}
          width={70}
          className='object-cover'
        />
        <h1 className='text-white text-3xl font-semibold'>
          What to wear today?
        </h1>
      </Link>
      <MenuButton />
    </nav>
  );
}
