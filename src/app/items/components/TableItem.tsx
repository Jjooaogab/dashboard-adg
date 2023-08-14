'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table"
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function ItemTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className="">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((i) => (
            <TableRow key={i.id}>
              {i.headers.map((I) => {
                return (
                  <TableHead key={I.id}>
                    {I.isPlaceholder
                    ? null
                    : flexRender(
                      I.column.columnDef.header,
                      I.getContext()
                    )} 
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
      </Table>
    </div>
  )
}