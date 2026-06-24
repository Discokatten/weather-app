import { EditClothes } from '@/app/components/EditClothes';
import { getClothesById } from '@/app/data/clothesApi';

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getClothesById(id);
  return <EditClothes item={item} />;
}
