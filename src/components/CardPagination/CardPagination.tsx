'use client'

import { TPagination } from "@/entities/car/types"
import useParamSetter from "@/hooks/paramSetter"
import { Pagination, Stack } from "@mui/material"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

interface CardPaginationProps {
  pagination: TPagination | null
}

const CardPagination = (props: CardPaginationProps) => {
  const { pagination } = props
  
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { createQueryString } = useParamSetter()

  const currentPage = searchParams?.get('_page') || '1'

  useEffect(() => {
    if (searchParams && !searchParams.has('_page')) {
      router.push(pathname + '?' + createQueryString('_page', '1'))
      router.push(pathname + '?' + createQueryString('_limit', '12'))
    }
  }, [])

  const handlePaginationClick = (e: unknown, page: number) => {
    router.push(pathname + '?' + createQueryString('_page', String(page)))
  }

  return (
    <Stack spacing={2}>
      <Pagination count={pagination?.total && Math.ceil(pagination?.total/pagination?.limit)} page={+currentPage} color="primary" onChange={handlePaginationClick} />
    </Stack>
  )
}

export default CardPagination