import { 
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useAuthContext, useDrawerContext } from '../../contexts';
import { TChildrenProps } from '../../types';
import { MenuItem } from './MenuItem';
import ToggleTheme from './ToggleTheme';

export function Sidebar({ children }: TChildrenProps): JSX.Element{
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { isDrawerOpen, toggleDrawer, drawerOptions } = useDrawerContext();
  const { logout } = useAuthContext();

  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawer}>
        <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column'>
          <Box width='100%' height={theme.spacing(20)} display='flex' alignItems='center' justifyContent='center'>
            <Avatar
              alt= 'avatar'
              src='https://img2.gratispng.com/20180920/yko/kisspng-computer-icons-portable-network-graphics-avatar-ic-5ba3c66df14d32.3051789815374598219884.jpg'
              sx={{ width: theme.spacing(12), height: theme.spacing(12) }}
            >
            </Avatar>
          </Box>
          <Divider />
          <Box flex={1}>
            <List component='nav'>
              {drawerOptions.map((drawerOption, index) => (
                <MenuItem key={index} 
                  to={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  onClick={smDown ? toggleDrawer : undefined}
                />
              ))}
            </List>
          </Box>
          <ListItemButton sx={{ flexGrow: 0 }}>
            <ToggleTheme />
          </ListItemButton>
          <Box>
            <MenuItem to='/login' icon='logout' label='Sair' onClick={logout}/>
          </Box>
        </Box>
      </Drawer>
      <Box height='100vw' marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
}