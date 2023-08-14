import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage, } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import axios from "axios"

const ItemSchema = z.object({
  name: z.string({
    required_error: "Esse campo é obrigatório"
  }).min(
    2,
    "O nome precisa ter ao menos 2 caracteres"
  ),
  category: z
    .string({
      required_error: "Esse campo é obrigatório"
    }),
  price: z.string({
    required_error: "Esse campo é obrigatório"
  }).refine(value => /^(\d+|\d{1,3}(\.\d{3})*)(,\d{1,2})?$/.test(value.toString().replace('.', ',')), {
    message: "Formato inválido."
  }),
  type: z.string({
    required_error: "Esse campo é obrigatório"
  }),
  qntd: z.string({}).refine(value => /^[0-9]+$/.test(value), {
    message: "Digite um número válido"
  }),
  img: z.string({})
})

export default function ModalItem() {

  const form = useForm<z.infer<typeof ItemSchema>>({
    resolver: zodResolver(ItemSchema),
  })

  async function sendItem() {
    const post = await axios.post('http://localhost:8000/api/item')
      .then(function (res) {
        console.log(res)
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  async function onSubmit(data: z.infer<typeof ItemSchema>) {
    const parsedPrice = parseFloat(data.price.replace(',', '.'));
    const parsedQntd = parseInt(data.qntd)
    await axios.post('http://localhost:8000/api/item', {
      name: data.name,
      description: data.category,
      price: parsedPrice,
      qntd: parsedQntd,
      img: data.img
    })
      .then(function (res) {
        console.log(res)
      })
      .catch(function (err) {
        console.log(err)
      })
    console.table({ ...data, price: parsedPrice, qntd: parsedQntd })
  }

  return (
    <div className="">
      <Dialog>
        <DialogTrigger>
          <Button variant={"outline"} className="rounded-xl transition hover:bg-zinc-700 hover:border-none">Novo item</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] lg:max-w-[525px] border-none text-slate-950 bg-zinc-200">
          <DialogHeader>
            <DialogTitle>Criar um novo item</DialogTitle>
            <DialogDescription>
              Preencha todas as informações corretamente.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 w-full">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start">
                        <FormLabel>Nome</FormLabel>
                        <FormControl className="bg-zinc-900 border-none rounded text-zinc-200">
                          <Input placeholder="Digite o nome do item" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start">
                        <FormLabel>Categoria</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl className="bg-zinc-900 border-none rounded text-zinc-200">
                            <SelectTrigger>
                              <SelectValue placeholder="Escolha uma categoria do item" />
                            </SelectTrigger>
                          </FormControl >
                          <SelectContent className="flex flex-col gap-2 bg-zinc-900 border-zinc-950 rounded text-zinc-200">
                            <SelectItem value="Bebidas c/ Alcool">Bebidas c/ Alcool</SelectItem>
                            <Separator className="bg-zinc-800" />
                            <SelectItem value="Destilados">Destilados</SelectItem>
                            <Separator className="bg-zinc-800" />
                            <SelectItem value="Refrigerantes">Refrigerantes</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-center items-center gap-2">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start">
                        <FormLabel>Preço</FormLabel>
                        <FormControl className="bg-zinc-900 border-none rounded text-zinc-200 w-52">
                          <Input placeholder="Ex.: 6.99" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="qntd"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start">
                        <FormLabel>Estoque inicial</FormLabel>
                        <FormControl className="bg-zinc-900 border-none rounded text-zinc-200 w-52">
                          <Input placeholder="Ex.: 6.99" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel>Qual o tipo? </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="bg-zinc-900 border-none rounded text-zinc-200">
                          <SelectTrigger>
                            <SelectValue placeholder="Escolha o tipo do item" />
                          </SelectTrigger>
                        </FormControl >
                        <SelectContent className="flex flex-col gap-2 bg-zinc-900 border-zinc-950 rounded text-zinc-200 w-full">
                          <SelectItem value="600 ml">600 ml</SelectItem>
                          <Separator className="bg-zinc-800" />
                          <SelectItem value="Long Neck">Long Neck</SelectItem>
                          <Separator className="bg-zinc-800" />
                          <SelectItem value="Lata">Lata</SelectItem>
                          <Separator className="bg-zinc-800" />
                          <SelectItem value="2 Litros">2 Litros</SelectItem>
                          <Separator className="bg-zinc-800" />
                          <SelectItem value="1 Litro">1 Litro</SelectItem>
                          <Separator className="bg-zinc-800" />
                          <SelectItem value="Outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="img"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel>Img</FormLabel>
                      <FormControl className="bg-zinc-900 border-none rounded text-zinc-200">
                        <Input placeholder="Cole o link da imagem" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="bg-zinc-950 text-zinc-200 rounded w-full transition hover:bg-zinc-800">Criar</Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
