import Card from "../Card/Card"
import { TCar } from "@/entities/car/types"

interface CardListProps {
  cars: TCar[] | null
}

const CardList = (props: CardListProps) => {
  const { cars } = props

  return (
    <div className={'flex flex-wrap justify-center-safe gap-4'}>
      {(cars ?? []).map((car) => (
        <div key={car.unique_id}>
          <Card car={car} />
        </div>
      ))}
    </div>
  )
}

export default CardList