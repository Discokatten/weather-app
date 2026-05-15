import getWeather from '@/app/data/weatherApi'
import WeatherCard from '@/app/@weather/_components/WeatherCard'
import { formatDate } from '@/app/utils/pageUtils'
export default async function DailyForecast() {
  const weather = await getWeather()
  const forecast = weather.daily

  const day = weather.daily.time.map((time) => {
    return formatDate(time, 'weekday')
  })
  const tempArray = Array.from(forecast.temperature_2m_mean!)
  const codeArray = Array.from(forecast.weather_code!)

  return (
    <ul className="h-72 flex justify-between wrap md:w-250 content-center">
      {tempArray.map((temp, index) => (
        <WeatherCard key={index} day={day[index]} temp={temp.toFixed(1)} code={codeArray[index]} />
      ))}
    </ul>
  )
}
