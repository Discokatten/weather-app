export const capitalize = (value?: string) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : value;

export const formatDate = (
  time: string | number | Date,
  format: 'full' | 'weekday' = 'full',
) => {
  const date = new Date(time);
  const weekday = date.toLocaleString('sv-SE', { weekday: 'long' });

  if (format === 'weekday') return capitalize(weekday);

  const rest = date.toLocaleString('sv-SE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  });

  return `${weekday}, ${rest}`;
};
