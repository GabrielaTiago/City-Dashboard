import { Add, Delete, KeyboardReturnRounded, Save } from '@mui/icons-material';
import { Box, Button, Divider, Paper, useTheme } from '@mui/material';

interface IDetailToolProp {
    textNewButton?: string;

    displayNewButton?: boolean;
    displayReturnButton?: boolean;
    displaySaveButton?: boolean;
    displayDeleteButton?:boolean;
    displaySaveAndCloseButton?: boolean;

    clickInNew?: () => void;
    clickInReturn?: () => void;
    clickInSave?: () => void;
    clickInDelete?: () => void;
    clickInSaveAndClose?: () => void;
}

export function DetailTool(
  { 
    textNewButton = 'Novo',

    displayNewButton = true,
    displayReturnButton = true,
    displaySaveButton = true,
    displayDeleteButton = true,
    displaySaveAndCloseButton = false,

    clickInNew,
    clickInReturn,
    clickInSave,
    clickInDelete,
    clickInSaveAndClose,
  }: IDetailToolProp): JSX.Element {
  const theme = useTheme();
  
  return(
    <Box
      marginX={1}
      padding={2}
      gap={1}
      display='flex'
      alignItems='center'
      height={theme.spacing(5)}
      component={Paper}
    >
      {displaySaveButton && (
        <Button
          color='primary'
          variant='contained'
          startIcon={<Save/>}
          disableElevation
          onClick={clickInSave}
        >
            Salvar
        </Button>
      )}
      {displaySaveAndCloseButton && (
        <Button
          color='primary'
          variant='outlined'
          startIcon={<Save />}
          disableElevation
          onClick={clickInSaveAndClose}
        >
          Salvar e Voltar
        </Button>
      )}
      {displayNewButton && (
        <Button
          color='primary'
          variant='outlined'
          startIcon={<Add />}
          disableElevation
          onClick={clickInNew}
        >
          {textNewButton}
        </Button>
      )}
      {displayDeleteButton && (
        <Button
          color='primary'
          variant='outlined'
          startIcon={<Delete />}
          disableElevation
          onClick={clickInDelete}
        >
          Deletar
        </Button>
      )}
      
      <Divider  variant='middle' orientation='vertical' />
      
      {displayReturnButton && (
        <Button
          color='primary'
          variant='outlined'
          startIcon={<KeyboardReturnRounded />}
          disableElevation
          onClick={clickInReturn}
        >
          Voltar
        </Button>
      )}
    </Box>
  );
}
