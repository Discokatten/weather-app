export default function ClothesCard({ item }: { item: string }) {
  return (
    <ul className="bg-theme-700 border-2 border-theme-600 rounded-2xl content-center text-center p-3 m-4">
      <li>{item}</li>
    </ul>
  )
}
