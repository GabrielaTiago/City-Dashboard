import { 
    Paper,
    Skeleton,
    Table,
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow 
  } from '@mui/material';
import { usePeopleContext } from '../../../shared/contexts';

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
                <TableCell>{isLoading ? <Skeleton animation='wave' width='auto' height='auto' /> : (row.fullName)}</TableCell>
                <TableCell>{isLoading ? <Skeleton animation='wave' width='auto' height='auto' /> : (row.email)}</TableCell>
            </TableRow>
            ))}
        </TableBody>

      </Table>
    </TableContainer>   
  );
}
