'use client'

import useParamSetter from "@/hooks/paramSetter"
import { MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

const SortList = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { createQueryString, deleteQueryString } = useParamSetter()

  const [sort, setSort] = useState(searchParams?.get('_order') || '')

  const handleSortSelected = (event: SelectChangeEvent) => {
    setSort(event.target.value)
 
    if (event.target.value === '') {
      router.replace(pathname + '?' + deleteQueryString('_order'))
    } else {
      router.push(pathname + '?' + createQueryString('_order', event.target.value))
    }
  }
 
  return (
    <>
      <Select value={sort} onChange={handleSortSelected}>
        <MenuItem value="">Не выбрана</MenuItem>
        <MenuItem value="asc">Цена по возрастанию</MenuItem>
        <MenuItem value="desc">Цена по убыванию</MenuItem>
      </Select>
    </>
  )
}

export default SortList