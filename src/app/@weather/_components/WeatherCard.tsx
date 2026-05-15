import WeatherAnimation from '@/app/components/WeatherAnimation'
interface CardProps {
  temp: string
  code: number
  feels?: string
  title?: string
  day?: string
}
export default function WeatherCard({ temp, code, feels, title, day }: CardProps) {
  return (
    <li className="bg-theme-800 p-2 border-theme-600 rounded-2xl content-center text-center m-2">
      <h2 className="mb-2 mt-2 text-2xl">{title} </h2>
      {day && <h2 className="mb-2 mt-2 text-xl">{day} </h2>}{' '}
      <p className="mb-2 mt-2 text-xl">{temp} °C</p>
      {feels && <p className="mt-2 text-s">Känns som: {feels} °C</p>}
      <WeatherAnimation weatherCode={code.toString()} />
    </li>
  )
}
