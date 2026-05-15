import getWeather from '@/app/data/weatherApi'
import WeatherAnimation from '@/app/components/WeatherAnimation'
import { formatDate } from '@/app/utils/pageUtils'

export default async function WeatherWidget() {
  const weather = await getWeather()
  const current = weather.current
  const location = 'Stockholm, Sverige'
  const date = formatDate(current.time)

  return (
    <section className="flex bg-[url(/hero.svg)] bg-no-repeat bg-cover bg-center mb-5 rounded-2xl h-77 md:max-w-240">
      {/* Get animation for current weather */}
      <div className="mr-0 ml-auto">
        <WeatherAnimation weatherCode={current.weather_code} />
      </div>
      <div className="content-center text-center mr-auto ml-0">
        {/* Show temperature */}
        <h2 className=" text-2xl sm:text-7xl">{current.temperature_2m.slice(0, 3)}°C</h2>
        {/* Show location */}
        <h2 className="m-2 sm:text-xl">{location}</h2>
        {/* Show date and time */}
        <h3 className="m-2">{date}</h3>
      </div>
    </section>
  )
}
