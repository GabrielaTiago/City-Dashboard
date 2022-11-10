import { Home } from '@mui/icons-material';
import { Avatar, Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { TChildrenProps } from '../../types';

export function Sidebar({ children }: TChildrenProps): JSX.Element{
  const theme = useTheme();

  return (
    <>
      <Drawer variant='permanent'>
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
              <ListItemButton>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary='Página Inicial'/>
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height='100vw' marginLeft={theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
}