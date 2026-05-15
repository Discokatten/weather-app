import { getDaily } from '@/app/data/weatherApi'
import WeatherAnimation from '@/app/components/WeatherAnimation'
import ClothesDetails from './_components/ClothesDetails'

export default async function RenderClothes() {
  const { weatherData } = await getDaily()
  const temp = Number(weatherData.tempArray[0].toFixed(1))
  const precipitationProb = weatherData.precipitationProbArray[0]
  const precipitationHours = weatherData.precipitationHourArray[0]
  const weatherCode = weatherData.codeArray[0]
  const precipitation = weatherCode.toString()

  return (
    <div className="bg-theme-800 rounded-2xl md:w-100 mb-2">
      <ClothesDetails />
      <ul className="bg-theme-700 border border-theme-600 rounded-2xl content-center text-center p-3 m-4">
        <li>Medeltemperatur: {temp} °C</li>
        <li>Risk för nederbörd: {precipitationProb}%</li>
        <li>Under {precipitationHours} timmar</li>
        <WeatherAnimation weatherCode={precipitation} />
      </ul>
    </div>
  )
}
