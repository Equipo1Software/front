import { Menu, MenuButton, MenuList, Avatar, MenuItem, Button,  VStack, Text , Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'




const Navbar = () => {
    return (
        <VStack h={'100px'}>
            <div className="navbar">
                <div className='title'>
                    <Text> <b>GRUPO 5 - GASTOS COMUNES</b> </Text>
                </div>
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={'../user/home'}>Home</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem>
                            <BreadcrumbLink href={'../resumenes/Stats'}>Registro histórico</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem>
                            <BreadcrumbLink href={'../user/payment'}>Pagar</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink href='#'>Perfil</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className='userButton' >
                    <Menu>

                        <MenuButton as={Button} variant='outline' rightIcon={<ChevronDownIcon />} _expanded={{ bg: '#111B54' }} _hover={{ bg: 'gray.400' }}  >
                            <Avatar size={'xs'}>
                            </Avatar> "Nombre de usuario"
                        </MenuButton>
                        <MenuList bg={'#111B54'}>
                            <MenuItem bg={'#111B54'}> <FontAwesomeIcon icon={faUser} /> Perfil</MenuItem>
                            <MenuItem bg={'#111B54'}> <FontAwesomeIcon icon={faRightFromBracket} /> Cerrar sesión</MenuItem>
                        </MenuList>
                    </Menu>
                </div>


            </div>
        </VStack>

    )
}

export default Navbar