import { CreateOutlined, DeleteForeverOutlined } from '@mui/icons-material';
import { 
  IconButton,
  Pagination,
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
import { useNavigate } from 'react-router-dom';
import { useCitiesContext } from '../../../shared/contexts';
import { enviroment } from '../../../shared/environments';
import { IListCity, CitiesService } from '../../../shared/services/citiesApi';

export function TableOfCities() {
  const { rows, setRows, isLoading, totalCount, page, setSearchParams } = useCitiesContext();
  const pagination = Math.ceil(totalCount / enviroment.LINE_LIMIT);
  const navigate = useNavigate();

  function handleDelete(id: number) {
    if(confirm('Realmente deseja apagar?')){
      CitiesService.deleteById(id)
        .then( res => {
          
          if(res instanceof Error) {
            alert(res.message);
          } else {
            const oldRows: IListCity[] = [...rows.filter((row) => row.id !== id )];
            setRows(oldRows);
            alert('Registro apagado com sucesso')
          }
        });
    }
  }

  return (
    <TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto', overflowX: 'hidden' }}>
      <Table>

        <TableHead>
            <TableRow>
                <TableCell>Ações</TableCell>
                <TableCell>Cidade</TableCell>
                <TableCell>Estado</TableCell>
            </TableRow>
        </TableHead>

        <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell width={100} align='inherit'>
                  {isLoading ? 
                    <Skeleton animation='wave' width='auto' height='auto' /> 
                    :
                    <>
                      <IconButton size='small' color='error' onClick={() => handleDelete(row.id)}>
                        <DeleteForeverOutlined />
                      </IconButton>
                      <IconButton size='small' color='success' onClick={() => navigate(`/cidades/detalhe/${row.id}`)}>
                        <CreateOutlined />
                      </IconButton>
                    </>
                    }
                </TableCell>

                <TableCell
                  sx={{ 
                    maxWidth: '7rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {isLoading ? <Skeleton animation='wave' width='auto' height='auto' /> : (row.name)}
                </TableCell>

                <TableCell
                  sx={{ 
                    maxWidth: '7rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {isLoading ? <Skeleton animation='wave' width='auto' height='auto' /> : (row.state)}
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

        {(totalCount > 0 && totalCount > enviroment.LINE_LIMIT) && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>
                <Pagination
                  color='primary'
                  sx={{ display:'flex', alignItems: 'center', justifyContent: 'center' }}
                  page={page}
                  count={pagination}
                  onChange={(_, newPage) => setSearchParams({ page: newPage.toString() })}
                />
              </TableCell>              
            </TableRow>
          </TableFooter>
        )}

      </Table>
    </TableContainer>   
  );
}
