import Image from 'next/image'
// import MenuButton from "@/app/components/MenuButton"

export default function NavBar() {
  return (
    <div className="md:w-fv flex wrap justify-around h-10 m-3">
      <Image
        src="/partly-cloudy-day.svg"
        alt="logo"
        height={70}
        width={70}
        className="object-cover"
      />
      {/* <MenuButton/> */}
    </div>
  )
}
