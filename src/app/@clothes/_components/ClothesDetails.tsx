import { getDaily } from '@/app/data/weatherApi'
import ClothesCard from '@/app/@clothes/_components/ClothesCard'
import { getWeatherCondition } from '@/app/utils/weatherUtils'
import { filterClothes } from './filterClothes'

export default async function ClothesDetails() {
  const { weatherData } = await getDaily()

  const temp = Number(weatherData.tempArray[0].toFixed(1))
  const precipitationProb = weatherData.precipitationProbArray[0]

  const condition = getWeatherCondition(precipitationProb, weatherData.rainArray[0])
  const clothes = filterClothes(temp, condition)

  return (
    <>
      <h2 className="text-3xl m-5">Föreslagna kläder:</h2>
      <ul>
        {clothes.map((item, i) => (
          <ClothesCard key={i} item={item.name} />
        ))}
      </ul>
    </>
  )
}
