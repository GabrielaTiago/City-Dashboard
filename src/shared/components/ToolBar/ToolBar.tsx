import { Add } from '@mui/icons-material';
import { Box, Button, Paper, TextField, useTheme } from '@mui/material';

interface IToolBarProps {
  searchText?: string;
  searchInput?: boolean;
  onChangeSearchText?: (newText: string) => void;
  buttonText?: string;
  displayButton?: boolean;
  onClickButton?: () => void;
}

export function ToolBar(
  { 
    searchText = '',
    searchInput = false,
    onChangeSearchText,
    buttonText = '',
    displayButton = true,
    onClickButton
  }: IToolBarProps) {
  const theme = useTheme();

  return(
    <Box
      marginX={1}
      padding={1}
      paddingX={2}
      gap={1}
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      height={theme.spacing(5)}
      component={Paper}
    >
      {searchInput ? 
        <TextField 
          size='small'
          placeholder='Pesquisar'
          value={searchText}
          onChange={(e) => onChangeSearchText?.(e.target.value)}
        />
        :
        <></>
      }
      {displayButton ? 
        <Button
          color='primary'
          variant='contained'
          endIcon={<Add/>}
          disableElevation
          onClick={onClickButton}
        >{buttonText}</Button>
        :
        <></>
      }
    </Box>
  );
}
