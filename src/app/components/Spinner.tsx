import { Loader } from 'lucide-react'

export default function Spinner() {
  return (
    <div className="flex justify-center mt-50">
      <p>Loading..</p> <Loader />
    </div>
  )
}
