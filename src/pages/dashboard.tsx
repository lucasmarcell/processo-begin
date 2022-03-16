import { Box, Flex, SimpleGrid, Stat, StatGroup, StatLabel, StatNumber, Text } from "@chakra-ui/react";
import { Book, Institution } from "@prisma/client";
import { GetServerSideProps } from "next";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { prisma } from "../lib/prisma";

type Props = {
  institutions: Institution[];
  books: Book[];
}

export default function Dashboard({ institutions, books }: Props) {


  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" >
          <Box p="8" bg="gray.800" borderRadius={8}>
            <Text fontSize="lg" mb="4">GERAL</Text>
            <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
              <StatGroup>
                <Stat>
                  <StatLabel textAlign="center">Livros Cadastrados</StatLabel>
                  <StatNumber textAlign="center" color="pink.400">{JSON.stringify(books)}</StatNumber>
                </Stat>

                <Stat>
                  <StatLabel textAlign="center">Institutos Cadastrados</StatLabel>

                  <StatNumber textAlign="center" color="pink.400">{JSON.stringify(institutions)}</StatNumber>
                </Stat>

              </StatGroup>
            </Box>
          </Box>
        </SimpleGrid>


      </Flex>
    </Flex >
  )
}

/* export async function getStaticProps() {
  const resIns = await fetch('http://localhost:3000/api/institutions/countAll')
  const institutions = await resIns.json()

  return {
    props: {
      institutions,
    },
  }
} */

export const getServerSideProps: GetServerSideProps = async () => {
  const institutions = await prisma.institution.count({})
  const books = await prisma.book.count({})

  return {
    props: {
      institutions,
      books,
    }
  }
}