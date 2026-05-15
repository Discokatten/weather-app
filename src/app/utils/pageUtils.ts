export const formatDate = (time: string | number | Date, format: 'full' | 'weekday' = 'full') => {
  const date = new Date(time)
  const weekday = date.toLocaleString('sv-SE', { weekday: 'long' })
  const capitalized = weekday.charAt(0).toUpperCase() + weekday.slice(1)

  if (format === 'weekday') return capitalized

  const rest = date.toLocaleString('sv-SE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  })

  return `${capitalized}, ${rest}`
}
