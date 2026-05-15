import getWeather from '@/app/data/weatherApi'

export default async function WeatherDetails() {
  const weather = await getWeather()
  const current = weather.current

  return (
    <ul className="h-60 flex justify-around wrap md:w-250">
      {/* Apparent temperature */}
      <li className="bg-theme-800 rounded-2xl md:h-50 md:w-40 content-center text-center">
        <p className="mb-2 text-2xl">Känns som:</p>
        <p className="mb-2 text-xl">{current.apparent_temperature.slice(0, 3)} °C</p>
      </li>

      {/* Relative humidity */}
      <li className="bg-theme-800 rounded-2xl md:h-50 md:w-40 content-center text-center">
        <p className="mb-2 text-2xl">Luftfuktighet</p>
        <p className="mb-2 text-xl">{current.relative_humidity_2m.slice(0, 2)}%</p>
      </li>

      {/* Windspeed */}
      <li className="bg-theme-800 rounded-2xl md:h-50 md:w-40 content-center text-center">
        <p className="mb-2 text-2xl">Vind</p>
        <p className="mb-2 text-xl">{current.wind_speed_10m.slice(0, 3)} m/s</p>
      </li>

      {/* Precipitation probability */}
      <li className="bg-theme-800 rounded-2xl md:h-50 md:w-40 content-center text-center">
        <p className="mb-2 text-2xl">Förväntad nederbörd</p>
        <p className="mb-2 text-xl">{current.precipitation.slice(0, 3)} mm</p>
      </li>
    </ul>
  )
}
