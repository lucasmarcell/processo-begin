import { Box, Stack } from "@chakra-ui/react";
import { RiAdminLine, RiBook3Line, RiBuildingLine, RiDashboardLine, RiUser3Line } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function Sidebar() {
  return (
    <Box as="aside" w="64" mr="8" >
      <Stack spacing="12" align="flex-start">
        <NavSection title="GERAL">
          <NavLink icon={RiDashboardLine} href="/dashboard">Dashboard</NavLink>
          <NavLink icon={RiBook3Line} href="/books">Livros</NavLink>
          <NavLink icon={RiBuildingLine} href="/institutions">Instituição</NavLink>
        </NavSection>

        <NavSection title="USUÁRIOS">
          <NavLink icon={RiAdminLine} href="/administrators">Administrador</NavLink>
          <NavLink icon={RiUser3Line} href="/client">Cliente</NavLink>
        </NavSection>
      </Stack>
    </Box >
  )
}