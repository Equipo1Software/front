import { Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider, Button, HamburgerIcon } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faRightFromBracket,faUser } from '@fortawesome/free-solid-svg-icons'



const Navbar = () => {
    return (
        <div className="navbar">
            <h1> <b>GRUPO 5 - GASTOS COMUNES</b> </h1>

            <div className='userButton'>
                <Menu>
                    <MenuButton as={Button} variant='outline' rightIcon={<ChevronDownIcon />}>
                        "Nombre de usuario"
                    </MenuButton>
                    <MenuList>
                        <MenuItem> <FontAwesomeIcon icon={faUser} /> Perfil</MenuItem>
                        <MenuItem> <FontAwesomeIcon  icon={faRightFromBracket} /> Cerrar sesión</MenuItem>
                    </MenuList>
                </Menu>
            </div>


        </div>
    )
}

export default Navbar