import DailyForecast from '@/app/@weather/_components/DailyForecast'
import TimeOfDay from '@/app/@weather/_components/TimeOfDay'
import WeatherDetails from '@/app/@weather/_components/WeatherDetails'
import WeatherWidget from '@/app/@weather/_components/WeatherWidget'

export default function RenderWeather() {
  return (
    <div>
      <WeatherWidget />
      <WeatherDetails />

      <TimeOfDay />
      <DailyForecast />
    </div>
  )
}
