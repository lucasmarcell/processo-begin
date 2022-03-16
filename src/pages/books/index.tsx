import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Book } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { RiAddLine, RiDeleteBin3Line, RiEditLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { prisma } from "../../lib/prisma";

type BooksProps = {
  books: Book[],
}



export default function BooksList({ books }: BooksProps) {
  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />


        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Livros</Heading>
            <Link href="/books/create" passHref>
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
                <Th>Status</Th>
                <Th>Estoque</Th>
                <Th width="8"></Th>
                <Th width="8"></Th>
              </Tr>
            </Thead>

            {books.map(book => <Tbody key={book.id}>
              <Tr>
                <Td px="6">
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">{book.name}</Text>
                    <Text fontSize="sm" color="gray.300">{book.year}</Text>
                  </Box>
                </Td>
                <Td>
                  <Text>{book.status}</Text>
                </Td>
                <Td>
                  <Text>{book.inventory}</Text>
                </Td>
                <Td>
                  <Button as="a" size="sm" fontSize="sm" colorScheme="purple" leftIcon={<Icon as={RiEditLine} fontSize="16" />}>
                    <Text>Editar</Text>
                  </Button>
                </Td>
                <Td>
                  <Button as="a" size="sm" fontSize="sm" colorScheme="red" leftIcon={<Icon as={RiDeleteBin3Line} fontSize="16"
                    onClick={() => console.log(book.id)}
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
  const books = await prisma.book.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  const data = books.map(book => {
    return {
      id: book.id,
      name: book.name,
      edition: book.edition,
      year: book.year,
      release: book.release,
      status: book.status,
      inventory: book.inventory,
      institution: book.institution,
    }
  })

  return {
    props: {
      books: data
    }
  }
}