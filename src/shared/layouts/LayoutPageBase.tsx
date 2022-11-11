import { ReactNode } from 'react';
import { Box, Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useDrawerContext } from '../contexts';

interface ILayoutPageBase {
  children: ReactNode;
  title: string;
}

export function LayoutPageBase({ children, title }: ILayoutPageBase) {
  const { toggleDrawer } = useDrawerContext();
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();

  return(
    <Box height='100%' display='flex' flexDirection='column' gap={1} padding={2}>
      <Box 
        width='100%'
        height={theme.spacing(smDown ? 6 : (mdDown ? 8 : 12))}
        display='flex'
        alignItems='center'
        gap={1}>
        {smDown ?
          <IconButton onClick={toggleDrawer}>
            <Icon>menu</Icon>
          </IconButton> 
          : 
          <></>
        }
        <Typography 
          variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
          whiteSpace='nowrap'
          overflow='hidden'
          textOverflow='ellipsis'
        >
          {title}
        </Typography>
      </Box>
      <Box flex={1} overflow='auto'>
        {children}
      </Box>
    </Box>
  );
}
