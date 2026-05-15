export interface DailyWeatherResponse {
  current: {
    time: Date
    precipitation: string
    temperature_2m: string
    relative_humidity_2m: string
    weather_code: string
    wind_speed_10m: string
    apparent_temperature: string
  }
}
export interface WeeklyWeatherResponse {
  weatherData: {
    tempArray: number[]
    codeArray: number[]
    rainArray: number[]
    snowArray: number[]
    precipitationHourArray: number[]
    precipitationProbArray: number[]
  }
}
