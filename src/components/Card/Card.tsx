import { TCar } from "@/entities/car/types"

interface CardProps {
  car: TCar
}

const Card = (props: CardProps) => {
  const { car } = props

  return (
    <div className="card bg-base-100 shadow-xl w-full xl:block xl:w-96 rounded-xl">
      <figure><img src={car.images.image[0]} alt='car-card' className="xl:h-full rounded-tl-xl rounded-tr-xl" /></figure>
      {/* <Image src={car.images.image[0]} alt='car-card' fill /> */}
      <div className="card-body px-2.5 h-20 max-h-20 text-xs sm:text-sm md:text-md lg:text-lg flex flex-col-reverse justify-center">
        <h2 className="card-title">{car.mark_id} {car.folder_id}</h2>
        <p>{car.price} ₽</p>
      </div>
    </div>
  )
}

export default Card