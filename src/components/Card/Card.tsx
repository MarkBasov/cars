'use client'

import { MouseEvent, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react"
import { Controller, Navigation, Pagination } from "swiper/modules"
import { TCar } from "@/entities/car/types"

import 'swiper/css';
import 'swiper/css/pagination';

interface CardProps {
  car: TCar
}

const Card = (props: CardProps) => {
  const { car } = props

  const [controllerSwiper, setControllerSwiper] = useState<SwiperClass | null>(null)

  const handleMouseEnter = (idx: number) => (e: MouseEvent<HTMLDivElement> | undefined) => {
    controllerSwiper?.slideTo(Number(idx), 0)
  }

  const listLimitedCarImages = car.images.image.slice(0, 5)

  return (
    <div className="card bg-base-100 shadow-xl w-full h-full xl:block xl:w-96 rounded-xl">
      <div className="flex w-full relative">
        <div className="flex absolute top-0 left-0 w-full h-full z-20">
          {listLimitedCarImages.map((val, idx) => (
            <div key={idx} className="flex-auto w-full" onMouseEnter={handleMouseEnter(idx)}></div>
          ))}
        </div>
        <Swiper
          pagination
          className="rounded-tl-xl rounded-tr-xl absolute h-full z-10 w-full"
          modules={[Navigation, Pagination, Controller]}
          onSwiper={setControllerSwiper}
        >
          {listLimitedCarImages.map((image, index) => (
            <SwiperSlide key={index}>
              {/* <Image src={image} alt='car-card' fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" /> */}
              <img src={image} alt='car-card' />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="card-body px-2.5 h-20 max-h-20 text-xs sm:text-sm md:text-md lg:text-lg flex flex-col-reverse justify-center">
        <h2 className="card-title">{car.mark_id} {car.folder_id}</h2>
        <p>{car.price} ₽</p>
      </div>
    </div>
  )
}

export default Card