import { TCar } from "@/entities/car/types"

interface CardProps {
  car: TCar
}

const Card = (props: CardProps) => {
  const { car } = props

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure><img src={car.images.image[0]} alt='car-card' /></figure>
      {/* <Image src={car.images.image[0]} alt='car-card' fill /> */}
      <div className="card-body">
        <h2 className="card-title">{car.mark_id} {car.folder_id}</h2>
        <p>{car.price}</p>
      </div>
    </div>
  )
}

export default Card