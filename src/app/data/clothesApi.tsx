import {
  Clothes,
  ClothesSize,
  ValidSeasons,
  ValidWeather,
} from '../interfaces/clothesInterfaces';
// function buildUrl(filters: Filters) {
//   const params = new URLSearchParams();
//   if (filters.size) params.set('clothes', String(filters.size));
//   if (filters.season) params.set('clothes', String(filters.season));
//   return `/api/products?${params}`;
// }
export class ApiError extends Error {
  errors: string[];
  constructor(errors: string[]) {
    super('API error');
    this.errors = errors;
  }
}

const BASEURL = `http://localhost:8080/api/clothes`;

export const getAllClothes = async (
  size?: ClothesSize,
  season?: ValidSeasons,
  weather?: ValidWeather,
) => {
  const params = new URLSearchParams();

  if (size) params.set('size', String(size));
  if (season) params.set('season', String(season));
  if (season) params.set('weather', String(weather));

  const res = await fetch(`${BASEURL}?${params}`);
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

  const data = await res.json();

  return data.clothes;
};
export const getClothesById = async (id: number): Promise<Clothes> => {
  const res = await fetch(`${BASEURL}/${id}`);

  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

  const data = await res.json();
  return data.clothes;
};
export const createClothes = async (data: Clothes): Promise<void> => {
  const res = await fetch(BASEURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json();
    throw new ApiError(body.errors ?? [`Något gick fel ${res.status}`]);
  }
  return res.json();
};

export const updateClothes = async (
  id: number,
  data: Clothes,
): Promise<void> => {
  const res = await fetch(`${BASEURL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json();
    throw new ApiError(body.errors ?? [`Något gick fel ${res.status}`]);
  }
  return res.json();
};
export const deleteClothes = async (id: number): Promise<void> => {
  const res = await fetch(`${BASEURL}/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    const body = await res.json();
    throw new ApiError(body.errors ?? [`Något gick fel ${res.status}`]);
  }

  return res.json();
};
