import axios from "axios";
import { useQuery } from "react-query";

export type ItemsProps = {
  _id: string,
  name: string,
  description: string,
  price: number,
  img: string,
  qntd: number;
}

export default async function fetchData() {
  const res = await axios.get<ItemsProps[]>('http://localhost:8000/api/item')
  
  return res.data
}

// No outro arquivo deve ser usado o useQuery.:
// Importanto o fecthData daqui

/* 
    const { data, isLoading } = useQuery({
    queryKey: ['items'],
    queryFn: fetchData
  })

  return (
    console.log(data)
  )
*/