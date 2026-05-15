import Image from 'next/image'
import overcast from '@bybas/weather-icons/design/fill/animation-ready/overcast.svg'
import clearDay from '@bybas/weather-icons/design/fill/animation-ready/clear-day.svg'
import overcastDay from '@bybas/weather-icons/design/fill/animation-ready/overcast-day.svg'
import overcastDayRain from '@bybas/weather-icons/design/fill/animation-ready/rain.svg'
import overcastSnow from '@bybas/weather-icons/design/fill/animation-ready/snow.svg'
import overcastDayHail from '@bybas/weather-icons/design/fill/animation-ready/hail.svg'
import extremeRain from '@bybas/weather-icons/design/fill/animation-ready/rain.svg'
import extremeSnow from '@bybas/weather-icons/design/fill/animation-ready/snow.svg'
import overcastRain from '@bybas/weather-icons/design/fill/animation-ready/rain.svg'
import overcastSleet from '@bybas/weather-icons/design/fill/animation-ready/sleet.svg'
import partlyCloudyDay from '@bybas/weather-icons/design/fill/animation-ready/partly-cloudy-day.svg'
import fogDay from '@bybas/weather-icons/design/fill/animation-ready/fog.svg'
import partlyCloudyDayDrizzle from '@bybas/weather-icons/design/fill/animation-ready/partly-cloudy-day-drizzle.svg'
import partlyCloudyDaySleet from '@bybas/weather-icons/design/fill/animation-ready/partly-cloudy-day-sleet.svg'
import partlyCloudyDayRain from '@bybas/weather-icons/design/fill/animation-ready/partly-cloudy-day-rain.svg'
import partlyCloudyDaySnow from '@bybas/weather-icons/design/fill/animation-ready/partly-cloudy-day-snow.svg'
import overcastDayDrizzle from '@bybas/weather-icons/design/fill/animation-ready/drizzle.svg'
import overcastDrizzle from '@bybas/weather-icons/design/fill/animation-ready/drizzle.svg'
import thunderstormsDay from '@bybas/weather-icons/design/fill/animation-ready/thunderstorms-day.svg'
import thunderstormsSnow from '@bybas/weather-icons/design/fill/animation-ready/thunderstorms-snow.svg'
import umbrella from '@bybas/weather-icons/design/fill/animation-ready/umbrella.svg'
import snowflake from '@bybas/weather-icons/design/fill/animation-ready/snowflake.svg'

export default function WeatherAnimation({ weatherCode }: { weatherCode: string }) {
  type TCode = { [code: string]: string }

  //   map weather code to animation
  const weatherCodes: TCode = {
    '0': clearDay,
    '1': partlyCloudyDay,
    '2': overcastDay,
    '3': overcast,
    '45': fogDay,
    '48': fogDay,
    '51': partlyCloudyDayDrizzle,
    '53': overcastDayDrizzle,
    '55': overcastDrizzle,
    '56': partlyCloudyDaySleet,
    '57': overcastSleet,
    '61': partlyCloudyDayRain,
    '63': overcastDayRain,
    '65': overcastRain,
    '66': partlyCloudyDaySleet,
    '67': overcastSleet,
    '71': partlyCloudyDaySnow,
    '73': partlyCloudyDaySnow,
    '75': overcastSnow,
    '77': overcastDayHail,
    '80': partlyCloudyDayRain,
    '81': overcastRain,
    '82': extremeRain,
    '85': partlyCloudyDaySnow,
    '86': extremeSnow,
    '95': thunderstormsDay,
    '96': thunderstormsSnow,
    '99': thunderstormsSnow,
    umbrella: umbrella,
    snowflake: snowflake,
  }

  return <Image src={weatherCodes[weatherCode]} alt="weather animation" loading="eager" width={300} height={300} />
}
