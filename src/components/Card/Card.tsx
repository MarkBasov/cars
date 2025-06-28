'use client'

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react"
import { Controller, Navigation, Pagination } from "swiper/modules"
import { TCar } from "@/entities/car/types"

import 'swiper/css';
import 'swiper/css/pagination';

import s from './Card.module.scss'

interface CardProps {
  car: TCar
}

const imageStyle = {
  width: '100vw',
  height: 'auto',
}

const Card = (props: CardProps) => {
  const { car } = props

  const [controllerSwiper, setControllerSwiper] = useState<SwiperClass | null>(null)

  const handleMouseEnter = (idx: number) => () => {
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
              <Image style={imageStyle} width={400} height={300} src={image} alt='car-card' objectFit="contain" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={`${s.card__body} px-2.5 h-28 max-h-28 flex flex-col justify-center`}>
        <p className="font-semibold">{car.price} ₽</p>
        <p className={s.card__name}>{car.mark_id} {car.folder_id}</p>
        <div className={`${s.card__footer} flex flex-col text-gray-500 md:flex-row md:gap-2`}>
          <p>Год выпуска: {car.year}</p>
          <p>Пробег: {car.run} км</p>
        </div>
      </div>
    </div>
  )
}

export default Card