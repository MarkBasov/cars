'use client'

import { TPagination } from "@/entities/car/types"
import useParamSetter from "@/hooks/paramSetter"
import { FIRST_PAGE, LIMIT_PARAMETER, PAGE_LIMIT, PAGE_PARAMETER } from "@/shared/utils"
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

  const currentPage = searchParams?.get(PAGE_PARAMETER) || FIRST_PAGE

  useEffect(() => {
    if (searchParams && !searchParams.has(PAGE_PARAMETER)) {
      router.push(pathname + '?' + createQueryString(PAGE_PARAMETER, FIRST_PAGE))
      router.push(pathname + '?' + createQueryString(LIMIT_PARAMETER, PAGE_LIMIT))
    }
  }, [])

  const handlePaginationClick = (e: unknown, page: number) => {
    router.push(pathname + '?' + createQueryString(PAGE_PARAMETER, String(page)))
  }

  return (
    <Stack spacing={2}>
      <Pagination count={pagination?.total && Math.ceil(pagination?.total/pagination?.limit)} page={+currentPage} color="primary" onChange={handlePaginationClick} />
    </Stack>
  )
}

export default CardPagination