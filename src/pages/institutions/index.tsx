import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Institution } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { RiAddLine, RiDeleteBin3Line, RiEditLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { prisma } from "../../lib/prisma";

type InstitutionProps = {
  institutions: Institution[],
}



export default function InstitutionList({ institutions }: InstitutionProps) {
  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />


        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Instituição</Heading>
            <Link href="/institutions/create" passHref>
              <Button size="sm" fontSize="sm" colorScheme="pink" leftIcon={<Icon as={RiAddLine} fontSize="20" />}>
                Criar Nova
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
                <Th>Administrador</Th>
                <Th>Cidade</Th>
                <Th width="8"></Th>
                <Th width="8"></Th>
              </Tr>
            </Thead>

            {institutions.map(institution => <Tbody key={institution.id}>
              <Tr>
                <Td px="6">
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">{institution.name}</Text>
                    <Text fontSize="sm" color="gray.300">{institution.state}</Text>
                  </Box>
                </Td>
                <Td>
                  <Text>{institution.administrator}</Text>
                </Td>
                <Td>
                  <Text>{institution.city}</Text>
                </Td>
                <Td>
                  <Button as="a" size="sm" fontSize="sm" colorScheme="purple" leftIcon={<Icon as={RiEditLine} fontSize="16" />}>
                    <Text>Editar</Text>
                  </Button>
                </Td>
                <Td>
                  <Button as="a" size="sm" fontSize="sm" colorScheme="red" leftIcon={<Icon as={RiDeleteBin3Line} fontSize="16"
                    onClick={() => console.log(institution.id)}
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
  const institutions = await prisma.institution.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  const data = institutions.map(institution => {
    return {
      id: institution.id,
      name: institution.name,
      administrator: institution.administrator,
      cep: institution.cep,
      country: institution.country,
      state: institution.state,
      city: institution.city,
      district: institution.district,
      street: institution.street,
      number: institution.number,
      complement: institution.complement,
    }
  })

  return {
    props: {
      institutions: data
    }
  }
}