import getClothes from './requests/get-clothes.js';

export const name = 'Weather';

export function preRequest() {
  pm.variables.set('baseUrl', 'http://localhost:8080');
}

export const order = [
  getClothes,
];
