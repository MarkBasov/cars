import CardList from "@/components/CardList/CardList";
import SortList from "@/components/SortList/SortList";
import CardPagination from "@/components/CardPagination/CardPagination";
import { getCarList } from "@/entities/car/api";
import { FIRST_PAGE, LIMIT_PARAMETER, ORDER_PARAMETER, PAGE_LIMIT, PAGE_PARAMETER, SORT_PARAMETER } from "@/shared/utils";

export interface ISearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page(props: Readonly<ISearchParams>) {
  const { searchParams } = props
  const params = await searchParams

  const page = params[PAGE_PARAMETER] || FIRST_PAGE
  const limit = params[LIMIT_PARAMETER] || PAGE_LIMIT
  const order = params[ORDER_PARAMETER]
  const sort = 'price'

  const { cars, pagination } = await getCarList({
    [PAGE_PARAMETER]: page,
    [LIMIT_PARAMETER]: limit,
    [ORDER_PARAMETER]: order,
    ...(ORDER_PARAMETER in params ? {[SORT_PARAMETER]: sort} : {})
  }).then(({ data }) => ({ cars: data.data, pagination: data.meta })).catch(() => ({ cars: null, pagination: null }))

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className='flex flex-col gap-[32px] items-center'>
          <SortList />
          <CardList cars={cars} />
          <CardPagination pagination={pagination} />
        </div>
      </main>
      <footer />
    </div>
  );
}
