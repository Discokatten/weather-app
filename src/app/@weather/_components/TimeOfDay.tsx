import getWeather from '@/app/data/weatherApi'
import { TIMEOFDAY } from '@/app/lib/consts'
import WeatherCard from '@/app/@weather/_components/WeatherCard'

export default async function TimeOfDay() {
  const weather = await getWeather()
  const hourly = weather.hourly
  const tempArray = Array.from(hourly.temperature_2m!)
  const codeArray = Array.from(hourly.weather_code!)
  const feelsArray = Array.from(hourly.apparent_temperature!)

  return (
    <ul className="h-80 bg-theme-800 rounded-2xl p-3 mb-5 flex justify-around content-center">
      {TIMEOFDAY.map((item, index) => {
        return (
          <div key={index} className="rounded-2xl h-50 w-50 p-2 content-center text-center">
            <WeatherCard
              key={index}
              temp={tempArray[item.time].toFixed(1)}
              code={codeArray[index]}
              feels={feelsArray[item.time].toFixed(1)}
              title={item.title}
            />
          </div>
        )
      })}
    </ul>
  )
}
