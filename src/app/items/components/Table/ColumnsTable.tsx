'use client'

import { ColumnDef } from "@tanstack/react-table"

export type Columns = {
  _id: string,
  name: string,
  description: string,
  price: number,
  img: string,
  qntd: number;
}

export const columns: ColumnDef<Columns>[] = [
  {
    accessorKey: 'name',
    header: 'Nome'
  },
  {
    accessorKey: 'description',
    header: 'Categoria'
  },
  {
    accessorKey: 'price',
    header: 'Preço'
  },
  {
    accessorKey: 'qntd',
    header: 'Quantidade'
  },
]