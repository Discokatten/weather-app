import { Profile } from '../interfaces/profileInterfaces';

export class ApiError extends Error {
  errors: string[];
  constructor(errors: string[]) {
    super('API error');
    this.errors = errors;
  }
}

const BASEURL = `http://127.0.0.1:8080/api/profile`;

export const getAllProfiles = async () => {
  const res = await fetch(`${BASEURL}`);
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  const data = await res.json();
  return data.users;
};
export const getProfileById = async (id: number): Promise<Profile> => {
  const res = await fetch(`${BASEURL}/${id}`);
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  const data = await res.json();
  return data.user;
};
export const createProfile = async (profile: Profile): Promise<void> => {
  const res = await fetch(BASEURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new ApiError(data.errors ?? [`Något gick fel ${res.status}`]);
  }
  return res.json();
};

export const updateProfile = async (
  id: number,
  profile: Profile,
): Promise<void> => {
  const res = await fetch(`${BASEURL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new ApiError(data.errors ?? [`Något gick fel ${res.status}`]);
  }
  return res.json();
};
export const deleteProfile = async (id: number): Promise<void> => {
  const res = await fetch(`${BASEURL}/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    const data = await res.json();
    throw new ApiError(data.errors ?? [`Något gick fel ${res.status}`]);
  }

  return res.json();
};
