import {ItemTable} from "./components/TableItem";
import { ScrollArea } from "@/components/ui/scroll-area"
import ModalItem from "./components/ModalCategory";
import { useQuery } from "react-query";
import fetchData from "./components/Table/data";
import { columns } from "./components/Table/ColumnsTable";
import type { ItemsProps } from "./components/Table/data";

export default async function CreateItem() {

  const { data, isLoading } = useQuery({
    queryFn: fetchData,
    queryKey: ['items']
  })

  return (
    <div className="flex flex-col justify-center items-center w-screen min-h-screen bg-zinc-900">
      <div className=" bg-zinc-700 mt-8 w-[85vw] rounded-xl text-zinc-200">
        <ScrollArea className="h-[80vh] rounded-md p-4">
        {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ItemTable columns={columns} data={[]} />
          )}
        </ScrollArea>
      </div>
      <div className="flex mt-8 text-slate-200 gap-4 ">
        <ModalItem />
      </div>
    </div>
  )
}