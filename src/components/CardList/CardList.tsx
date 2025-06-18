import Card from "../Card/Card"
import { TCar } from "@/entities/car/types"

interface CardListProps {
  cars: TCar[] | null
}

const CardList = (props: CardListProps) => {
  const { cars } = props

  return (
    <div className={'justify-center xl:flex xl:flex-wrap :xl:justify-center-safe grid grid-cols-2 gap-4'}>
      {(cars ?? []).map((car) => (
        <div key={car.unique_id} className="w-full xl:w-auto">
          <Card car={car} />
        </div>
      ))}
    </div>
  )
}

export default CardList