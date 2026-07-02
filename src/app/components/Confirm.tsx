export function Confirm({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      className='flex items-center text-xl justify-center rounded-md'
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className='bg-theme-900 rounded-xl p-6 w-full max-w-sm shadow-lg'>
        <p> Är du säker? </p>
        <div className='flex gap-4 justify-end'>
          <button onClick={onCancel} className=' hover:text-theme-300'>
            Ångra
          </button>
          <button
            onClick={onConfirm}
            className='text-red-600 hover:text-red-800'
          >
            Ta bort
          </button>
        </div>
      </div>
    </div>
  );
}
