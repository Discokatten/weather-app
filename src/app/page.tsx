import { getClothes } from "./data/clothesApi";

export default async function Home() {
  getClothes()
  return (
    <>
      <h1 className="text-white text-6xl text-center mb-10">
        What to wear today?
      </h1>
    </>
  );
}
