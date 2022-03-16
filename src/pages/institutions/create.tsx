import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { yupResolver } from '@hookform/resolvers/yup';
import { Administrator } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { prisma } from "../../lib/prisma";

type CreateInstitutionFormData = {
  name: string;
  administrator: string;
  cep: number;
  country: string;
  state: string;
  city: string;
  district: string;
  street: string;
  number: string;
  complement: string;
}

const createInstitutionFormSchema = yup.object().shape({
  name: yup.string().required('Nome Obrigatório'),
  administrator: yup.string().required('Administrador Obrigatório'),
  cep: yup.string().required('CEP Obrigatório'),
  country: yup.string().required('País Obrigatório'),
  state: yup.string().required('Estado Obrigatório'),
  city: yup.string().required('Cidade Obrigatório'),
  district: yup.string().required('Bairro Obrigatório'),
  street: yup.string().required('Rua Obrigatório'),
  number: yup.string().required('Número Obrigatório'),
  complement: yup.string().required('Complemento Obrigatório'),
})

type AdministratorProps = {
  administrators: Administrator[]
}


export default function InstitutionsCreate({ administrators }: AdministratorProps) {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createInstitutionFormSchema)
  })

  const handleCreateInstitution: SubmitHandler<CreateInstitutionFormData> = async (values, e) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log(values)
    //e.preventDefault()

    e.target.reset()

    await fetch('http://localhost:3000/api/institutions/create/', {
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

        <Box as="form" flex="1" borderRadius={8} bg="gray.800" p="8" onSubmit={handleSubmit(handleCreateInstitution)}>
          <Heading size="lg" fontWeight="normal">Adicionar Instituição</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Input placeholder="Lucas Institute" name="name" label="Nome Da Instituição" error={errors.name} {...register("name")} />
              <Input as="select" name="administrator" label="Administrador da Instituição" error={errors.administrator} {...register("administrator")}>
                <option style={{ color: '#D53F8C' }} value="null">-</option>
                {administrators.map(administrator =>
                  <option style={{ color: '#D53F8C' }} value={administrator.nome} key={administrator.id}>{administrator.nome}</option>
                )}
              </Input>

            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Input placeholder="72110340" name="cep" label="CEP" error={errors.cep} {...register("cep")} />
              <Input placeholder="Brasil" name="country" label="País" error={errors.country} {...register("country")} />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Input placeholder="Distrito Federal" name="state" label="Estado" error={errors.state} {...register("state")} />
              <Input placeholder="Taguatinga" name="city" label="Cidade" error={errors.city} {...register("city")} />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Input placeholder="Taguatinga Norte" name="district" label="Bairro" error={errors.district} {...register("district")} />
              <Input placeholder="QNA 34" name="street" label="Rua" error={errors.street} {...register("street")} />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Input placeholder="3" name="number" label="Número" error={errors.number} {...register("number")} />
              <Input placeholder="Casa" name="complement" label="Complemento" error={errors.complement} {...register("complement")} />
            </SimpleGrid>

          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/institutions" passHref>
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
  const administrators = await prisma.administrator.findMany()

  const data = administrators.map(administrator => {
    return {
      id: administrator.id,
      nome: administrator.nome,
      email: administrator.email,
    }
  })

  return {
    props: {
      administrators: data
    }
  }
}