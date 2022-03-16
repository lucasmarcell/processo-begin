import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Administrator } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { RiAddLine, RiDeleteBin3Line, RiEditLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { prisma } from "../../lib/prisma";

type AdministratorsProps = {
  administrators: Administrator[],
}



export default function AdministratorsList({ administrators }: AdministratorsProps) {
  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />


        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Administradores</Heading>
            <Link href="/administrators/create" passHref>
              <Button size="sm" fontSize="sm" colorScheme="pink" leftIcon={<Icon as={RiAddLine} fontSize="20" />}>
                Criar Novo
              </Button>
            </Link>
          </Flex>

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px="6" color="gray.300" width="9">
                  <Checkbox colorScheme="pink" />
                </Th>
                <Th>Nome</Th>
                <Th>E-mail</Th>
                <Th>Usuário</Th>
                <Th width="8"></Th>
                <Th width="8"></Th>
              </Tr>
            </Thead>

            {administrators.map(administrator => <Tbody key={administrator.id}>
              <Tr>
                <Td px="6">
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">{administrator.nome}</Text>
                  </Box>
                </Td>
                <Td>
                  <Text>{administrator.email}</Text>
                </Td>
                <Td>
                  <Text>{administrator.user}</Text>
                </Td>
                <Td>
                  <Button as="a" size="sm" fontSize="sm" colorScheme="purple" leftIcon={<Icon as={RiEditLine} fontSize="16" />}>
                    <Text>Editar</Text>
                  </Button>
                </Td>
                <Td>
                  <Button as="a" size="sm" fontSize="sm" colorScheme="red" leftIcon={<Icon as={RiDeleteBin3Line} fontSize="16"
                    onClick={() => console.log(administrator.id)}
                  />}>
                    <Text>Excluir</Text>
                  </Button>
                </Td>
              </Tr>
            </Tbody>
            )}
          </Table>
        </Box>
      </Flex>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const administrators = await prisma.administrator.findMany({
    orderBy: {
      nome: 'asc'
    }
  })

  const data = administrators.map(administrator => {
    return {
      id: administrator.id,
      nome: administrator.nome,
      email: administrator.email,
      user: administrator.user,
    }
  })

  return {
    props: {
      administrators: data
    }
  }
}