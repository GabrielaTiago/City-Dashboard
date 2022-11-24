import { Add, Delete, KeyboardReturnRounded, Save } from '@mui/icons-material';
import { 
  Box,
  Button,
  Divider,
  Paper,
  Skeleton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme } from '@mui/material';

interface IDetailToolProp {
    textNewButton?: string;

    displayNewButton?: boolean;
    displayReturnButton?: boolean;
    displaySaveButton?: boolean;
    displayDeleteButton?:boolean;
    displaySaveAndCloseButton?: boolean;

    displayLoadingNewButton?: boolean;
    displayLoadingReturnButton?: boolean;
    displayLoadingSaveButton?: boolean;
    displayLoadingDeleteButton?: boolean;
    displayLoadingSaveAndCloseButton?: boolean;

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

    displayLoadingNewButton = false,
    displayLoadingReturnButton = false,
    displayLoadingSaveButton = false,
    displayLoadingDeleteButton = false,
    displayLoadingSaveAndCloseButton = false,

    clickInNew,
    clickInReturn,
    clickInSave,
    clickInDelete,
    clickInSaveAndClose,
  }: IDetailToolProp): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
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
      {(displaySaveButton && !displayLoadingSaveButton) && (
        <Button
          color='primary'
          variant='contained'
          startIcon={<Save/>}
          disableElevation
          onClick={clickInSave}
        >
          <Typography 
            variant='button'
            whiteSpace='nowrap'
            textOverflow='elipses'
            overflow='hidden'
          >
            Salvar
          </Typography>
        </Button>
      )}

      {displayLoadingSaveButton && (
        <Skeleton width={109} height={64} />
      )}

      {
        (
          displaySaveAndCloseButton &&
          !displayLoadingSaveAndCloseButton &&
          !smDown &&
          !mdDown
        ) && (
          <Button
            color='primary'
            variant='outlined'
            startIcon={<Save />}
            disableElevation
            onClick={clickInSaveAndClose}
          >
            <Typography
              variant='button'
              whiteSpace='nowrap'
              textOverflow='elipses'
              overflow='hidden'
            >
              Salvar e Voltar
            </Typography>
          </Button>
        )
      }

      {(displayLoadingSaveAndCloseButton && !smDown && !mdDown) && (
        <Skeleton width={180} height={64} />
      )}

      {(displayNewButton && !displayLoadingNewButton && !smDown) && (
        <Button
          color='primary'
          variant='outlined'
          startIcon={<Add />}
          disableElevation
          onClick={clickInNew}
        >
          <Typography
            variant='button'
            whiteSpace='nowrap'
            textOverflow='elipses'
            overflow='hidden'
          >
            {textNewButton}
          </Typography>
        </Button>
      )}

      {(displayLoadingNewButton && !smDown) && (
        <Skeleton width={97} height={63} />
      )}

      {(displayDeleteButton && !displayLoadingDeleteButton) && (
        <Button
          color='primary'
          variant='outlined'
          startIcon={<Delete />}
          disableElevation
          onClick={clickInDelete}
        >
          <Typography
            variant='button'
            whiteSpace='nowrap'
            textOverflow='elipses'
            overflow='hidden'
          >
           Deletar
          </Typography>
        </Button>
      )}

      {displayLoadingDeleteButton && (
        <Skeleton width={118} height={64} />
      )}
      
      {
        (
          displayReturnButton && 
          (displayNewButton || displayDeleteButton || displayLoadingSaveButton || displayLoadingSaveAndCloseButton)
        ) && (
          <Divider  variant='middle' orientation='vertical' />
        )    
      }
      
      {(displayReturnButton && !displayLoadingReturnButton) && (
        <Button
          color='primary'
          variant='outlined'
          startIcon={<KeyboardReturnRounded />}
          disableElevation
          onClick={clickInReturn}
        >
          <Typography
            variant='button'
            whiteSpace='nowrap'
            textOverflow='elipses'
            overflow='hidden'
          >
            Voltar
          </Typography>
        </Button>
      )}

      {displayLoadingReturnButton && (
        <Skeleton width={110} height={64} />
      )}
    </Box>
  );
}
