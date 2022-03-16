import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { yupResolver } from '@hookform/resolvers/yup';
import { Institution } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { prisma } from "../../lib/prisma";



enum Status {
  novo = 'Novo',
  usado = 'Usado',
  danificado = 'Danificado',
  null = '',
}


type CreateBookFormData = {
  name: string;
  edition: string;
  year: number;
  release: number;
  status: Status;
  inventory: number;
}

const createBookFormSchema = yup.object().shape({
  name: yup.string().required('Nome Obrigatório'),
  edition: yup.string(),
  year: yup.number(),
  release: yup.number(),
  status: yup.string(),
  inventory: yup.number(),
  institution: yup.string(),
})

type InstitutionProps = {
  institutions: Institution[]
}


export default function BooksCreate({ institutions }: InstitutionProps) {
  const [newBook, setNewBok] = useState('')
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createBookFormSchema)
  })

  const handleCreateBook: SubmitHandler<CreateBookFormData> = async (values, e) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log(values)
    //e.preventDefault()

    e.target.reset()

    await fetch('http://localhost:3000/api/books/create/', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' }
    })

  }



  const { errors } = formState

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box as="form" flex="1" borderRadius={8} bg="gray.800" p="8" onSubmit={handleSubmit(handleCreateBook)}>
          <Heading size="lg" fontWeight="normal">Adicionar Livro</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Input placeholder="Cinco Pontos" name="name" label="Nome do Livro" error={errors.name} {...register("name")} />
              <Input placeholder="1ª Edição" name="edition" label="Edição do Livro" error={errors.edition} {...register("edition")} />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Input placeholder="2013" name="year" label="Ano do Livro" error={errors.year} {...register("year")} />
              <Input placeholder="2014" name="release" label="Ano de Lançamento do Livro" error={errors.release} {...register("release")} />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Input placeholder="Status" as="select" name="status" label="Status" error={errors.status} {...register("status")}>
                <option style={{ color: '#D53F8C' }} value="null">-</option>
                <option style={{ color: '#D53F8C' }} value="novo">Novo</option>
                <option style={{ color: '#D53F8C' }} value="usado">Usado</option>
                <option style={{ color: '#D53F8C' }} value="danificado">Danificado</option>
              </Input>
              <Input placeholder="1" name="inventory" label="Estoque" error={errors.inventory} {...register("inventory")} />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">

              <Input as="select" name="institution" label="Instituição" error={errors.institution} {...register("institution")}>
                <option style={{ color: '#D53F8C' }} value="null">-</option>
                {institutions.map(institution =>
                  <option style={{ color: '#D53F8C' }} value={institution.name} key={institution.id}>{institution.name}</option>
                )}
              </Input>
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/books" passHref>
                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const institutions = await prisma.institution.findMany()

  const data = institutions.map(institution => {
    return {
      id: institution.id,
      name: institution.name,
    }
  })

  return {
    props: {
      institutions: data
    }
  }
}