export type TCarData = {
  data: TCar[]
  meta: TPagination
} 
export type TCar = {
  images: { image: string[] },
  mark_id: string,
  folder_id: string,
  price: number,
  unique_id: number
}

export type TPagination = {
  limit: number,
  page: number,
  count: number,
  total: number
}