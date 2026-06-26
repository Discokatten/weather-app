export function Confirm({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      className='flex items-center justify-center bg-black/50'
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className='bg-white dark:bg-neutral-900 rounded-xl p-6 w-full max-w-sm shadow-lg'>
        <p> Är du säker? </p>
        <div className='flex gap-2 justify-end'>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm} className='text-red-600'>
            Ta bort
          </button>
        </div>
      </div>
    </div>
  );
}
