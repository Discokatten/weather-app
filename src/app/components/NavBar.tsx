import Image from 'next/image';
import Link from 'next/link';
// import MenuButton from '@/app/components/MenuButton';

export default function NavBar() {
  return (
    <>
      <nav className='md:w-fv flex wrap justify-around h-10 m-3'>
        <Link href='/'>
          <Image
            src='/partly-cloudy-day.svg'
            alt='logo'
            height={70}
            width={70}
            className='object-cover'
          />
        </Link>
        {/* <MenuButton /> */}
      </nav>
    </>
  );
}
