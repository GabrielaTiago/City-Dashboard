import React from 'react';
import { Box, Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useDrawerContext } from '../contexts';

interface ILayoutPageBase {
  children: React.ReactNode;
  title: string;
}

export function LayoutPageBase({ children, title }: ILayoutPageBase) {
  const { toggleDrawer } = useDrawerContext();
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const theme = useTheme();

  return(
    <Box height='100%' display='flex' flexDirection='column' gap={1} padding={2}>
      <Box  width='100%' height={theme.spacing(12)} display='flex' alignItems='center' gap={1}>
        {smDown ?
          <IconButton onClick={toggleDrawer}>
            <Icon>menu</Icon>
          </IconButton> 
          : <></>
        }
        <Typography variant='h4'>
          {title}
        </Typography>
      </Box>
      <Box>
        Barra de Ferramentas
      </Box>
      <Box>
        {children}
      </Box>
    </Box>
  );
}
