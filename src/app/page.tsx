import RenderWeather from './@weather/page';
import RenderClothes from './@clothes/page';

export default async function Home() {
  return (
    <div className='flex wrap gap-4 text-white justify-center'>
      <RenderWeather />
      <RenderClothes />
    </div>
  );
}
