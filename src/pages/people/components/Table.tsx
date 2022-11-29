import { 
  Paper,
  Skeleton,
  Table,
  TableBody, 
  TableCell, 
  TableContainer, 
  TableFooter, 
  TableHead, 
  TableRow,
  Typography,
} from '@mui/material';
import { usePeopleContext } from '../../../shared/contexts';
import { enviroment } from '../../../shared/environments';

export function TableOfPeople() {
  const { rows, isLoading } = usePeopleContext();
  
  return (
    <TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto', overflowX: 'hidden' }}>
      <Table>

        <TableHead>
            <TableRow>
                <TableCell>Ações</TableCell>
                <TableCell>Nome Completo</TableCell>
                <TableCell>Email</TableCell>
            </TableRow>
        </TableHead>

        <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{isLoading ? <Skeleton animation='wave' width='auto' height='auto' /> : (index+1)}</TableCell>
                <TableCell
                  sx={{ 
                    maxWidth: '7rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {isLoading ? <Skeleton animation='wave' width='auto' height='auto' /> : (row.fullName)}
                </TableCell>
                <TableCell
                  sx={{ 
                    maxWidth: '7rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {isLoading ? <Skeleton animation='wave' width='auto' height='auto' /> : (row.email)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>

        {(rows.length === 0 && !isLoading) && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} sx={{ textAlign: 'center'}}>
                <Typography variant='caption'>{enviroment.EMPTY_LIST}</Typography>
              </TableCell>              
            </TableRow>
          </TableFooter>
        )}

      </Table>
    </TableContainer>   
  );
}
