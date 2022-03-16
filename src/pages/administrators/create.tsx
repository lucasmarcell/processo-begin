import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { yupResolver } from '@hookform/resolvers/yup';
import Link from "next/link";
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";


type CreateAdministratorFormData = {
  nome: string;
  email: string;
  user: string;
  pass: string;
}

const createAdministratorFormSchema = yup.object().shape({
  nome: yup.string().required('Nome Obrigatório'),
  email: yup.string().email('E-mail no formato errado').required('E-mail obrigatório'),
  user: yup.string().required('usuário requerido'),
  pass: yup.string().required('Senha obrigatório').min(8, 'No mínimo 8 caracteres').max(32, 'No máximo 32 caracteres'),
})


export default function AdministratorsCreate() {

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createAdministratorFormSchema)
  })

  const handleCreateAdministrator: SubmitHandler<CreateAdministratorFormData> = async (values, e) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log(values)
    //e.preventDefault()

    e.target.reset()

    await fetch('http://localhost:3000/api/administrators/create/', {
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

        <Box as="form" flex="1" borderRadius={8} bg="gray.800" p="8" onSubmit={handleSubmit(handleCreateAdministrator)}>
          <Heading size="lg" fontWeight="normal">Adicionar Administrador</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Input placeholder="Lucas Marcell" name="nome" label="Nome do Administrador" error={errors.nome} {...register("nome")} />
              <Input placeholder="lucas@email.com" name="email" label="E-mail do Administrador" error={errors.email} {...register("email")} />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Input placeholder="lucasmarcell" name="user" label="Usuário" error={errors.user} {...register("user")} />
              <Input placeholder="senha" type="password" name="pass" label="Senha de acesso" error={errors.pass} {...register("pass")} />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/administrators" passHref>
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