import Link from 'next/link';

interface SettingsHeaderProps {
  title: string;
  label?: string;
  link?: string;
}

export default function SettingsHeader({
  title,
  label,
  link,
}: SettingsHeaderProps) {
  return (
    <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
      <div>
        <p className='text-theme-orange uppercase tracking-[0.3em] text-sm'>
          Inställningar
        </p>
        <h1 className='text-white text-4xl font-semibold'>{title}</h1>
      </div>

      {link && label ? (
        <Link
          href={link}
          className='inline-flex items-center justify-center rounded-full bg-theme-blue-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-theme-blue-500'
        >
          {label}
        </Link>
      ) : null}
    </div>
  );
}
