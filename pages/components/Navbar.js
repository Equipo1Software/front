import { Menu, MenuButton, MenuList, Avatar, AvatarBadge, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider, Button, HamburgerIcon, VStack } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'



const Navbar = () => {
    return (
        <VStack spacing={4} >
            <div className="navbar">
                <h1> <b>GRUPO 5 - GASTOS COMUNES</b> </h1>

                <div className='userButton'>
                    <Menu >
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