import WeatherWidget from '@/app/@weather/_components/WeatherWidget'

export default function Hero() {
  return (
    <div className="bg-[url(/hero.svg)] bg-no-repeat bg-cover bg-center rounded-2xl h-77 text-white max-w-200">
      <WeatherWidget />
    </div>
  )
}
