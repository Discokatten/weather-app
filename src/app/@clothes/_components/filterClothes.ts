import clothes from '@/app/data/clothes.json'
import { getLayers } from '@/app/utils/clothesUtils'
import { getSeason } from '@/app/utils/weatherUtils'

export const filterClothes = (temp: number, condition: string | undefined) => {
  const map = new Map()
  const season = getSeason(temp)
  const layers = getLayers(temp)

  clothes
    .filter((item) => {
      const layerMatch = layers.includes(item.layer)
      const weatherMatch = !condition || item.weather.includes(condition)
      const seasonMatch = item.season.includes(season)

      return layerMatch && weatherMatch && seasonMatch
    })
    // More specific season wins
    .sort((a, b) => a.season.length - b.season.length)
    //Warmer wins
    .forEach((item) => {
      if (!map.has(item.type)) {
        map.set(item.type, item)
      }
    })

  return Array.from(map.values())
}
