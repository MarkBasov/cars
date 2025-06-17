import Image from "next/image";
import CardList from "@/components/CardList/CardList";
import SortList from "@/components/SortList/SortList";
import CardPagination from "@/components/CardPagination/CardPagination";
import { getCarList } from "@/entities/car/api";

import s from './page.module.scss'

export interface ISearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page(props: Readonly<ISearchParams>) {
  const { searchParams } = props
  const params = await searchParams

  const page = params['_page'] || '1'
  const limit = params['_limit'] || '12'
  const order = params['_order']
  const sort = 'price'

  const { cars, pagination } = await getCarList({
    '_page': page,
    '_limit': limit,
    '_order': order,
    ...('_order' in params ? {'_sort': sort} : {})
  }).then(({ data }) => ({ cars: data.data, pagination: data.meta })).catch(() => ({ cars: null, pagination: null }))

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className={s.container}>
          <SortList />
          <CardList cars={cars} />
          <CardPagination pagination={pagination} />
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
