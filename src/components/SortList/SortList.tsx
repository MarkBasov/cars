'use client'

import { useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FormHelperText, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { ORDER_PARAMETER } from "@/shared/utils"
import useParamSetter from "@/hooks/paramSetter"

const sortOptions = [
  { value: 'none', label: 'Не выбрана' },
  { value: 'asc', label: 'Цена по возрастанию' },
  { value: 'desc', label: 'Цена по убыванию' },
] as const

type TSort = typeof sortOptions[number]['value']

const isTSort = (value: unknown): value is TSort =>
  typeof value === 'string' && ['none', 'asc', 'desc'].includes(value);

const SortList = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const orderParam: TSort = isTSort(searchParams?.get(ORDER_PARAMETER))
    ? searchParams.get(ORDER_PARAMETER) as TSort
    : 'none';

  const { createQueryString, deleteQueryString } = useParamSetter()

  const [selectedSort, setSelectedSort] = useState<TSort>(orderParam)

  const handleSortSelected = (event: SelectChangeEvent<TSort>) => {
    setSelectedSort(event.target.value)
 
    if (event.target.value === 'none') {
      router.replace(pathname + '?' + deleteQueryString(ORDER_PARAMETER))
    } else {
      router.push(pathname + '?' + createQueryString(ORDER_PARAMETER, event.target.value))
    }
  }
 
  return (
    <>
      <div className="flex flex-col gap-2 items-center">
        <FormHelperText>Сортировка по цене</FormHelperText>
        <Select value={selectedSort} onChange={handleSortSelected}>
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </div>
    </>
  )
}

export default SortList