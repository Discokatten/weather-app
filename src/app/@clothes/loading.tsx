import Spinner from '@/app/components/Spinner'

export default function Loading() {
  return (
    <div className="bg-theme-600 rounded-2xl h-500 md:w-100">
      <Spinner />
    </div>
  )
}
