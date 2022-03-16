import { Flex, Text } from "@chakra-ui/react";

export function Header() {
  return (
    <Flex as="header" w="100%" maxWidth={1480} h="20" mx="auto" mt="4" px="6" align="center">

      <Text as="a" href="/dashboard" fontSize="3xl" fontWeight="bold" letterSpacing="tight" w="64">
        begin
        <Text as="span" color="pink.500" ml="1">.</Text>
      </Text>

    </Flex>
  )
}