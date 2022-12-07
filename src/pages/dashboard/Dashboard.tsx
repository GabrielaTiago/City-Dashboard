import { useEffect } from 'react';
import { Box, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import { SearchBar } from '../../shared/components';
import { LayoutPageBase } from '../../shared/layouts';
import { CitiesService } from '../../shared/services/citiesApi';
import { useCitiesContext, usePeopleContext } from '../../shared/contexts';
import { PeopleService } from '../../shared/services/personApi';

export function Dashboard() {
  const { 
    isLoading: loadingCities, 
    setIsLoading: setLoadingCities, 
    totalCount: citiesTotalCount, 
    setTotalCount: setCitiesTotalCount
  } = useCitiesContext();
  const { 
    isLoading: loadingPeople, 
    setIsLoading: setLoadingPeople, 
    totalCount: peopleTotalCount, 
    setTotalCount: setPeopleTotalCount
  } = usePeopleContext();
  const page = 1;
  const filter = '';

  useEffect(() => {
    setLoadingCities(true);
    setLoadingPeople(true);

    CitiesService.getAll(page, filter).then((res) => {
      setLoadingCities(false);

      if(res instanceof Error) {
        alert(res.message);
      } else {
        setCitiesTotalCount(res.totalCount);
      }
    });
    
    PeopleService.getAll(page, filter).then((res) => {
      setLoadingPeople(false);

      if(res instanceof Error) {
        alert(res.message);
      } else {
        setPeopleTotalCount(res.totalCount);
      }
    });
  }, []);

  return (
    <LayoutPageBase title='Página Inicial' taskBar={(
      <SearchBar displayButton={false}/>
    )}>
      <Box width='100%' display='flex'>
        <Grid container margin={1}>
          <Grid item container spacing={2}>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de Cidades
                  </Typography>
                  <Box padding={1} display='flex' justifyContent='center' alignItems='center'>
                    {loadingCities 
                      ? 
                        <Typography variant='h1'>
                          <CircularProgress />
                        </Typography>
                      :
                        <Typography variant='h1'>
                          {citiesTotalCount}
                        </Typography>
                    }
                  </Box>
                </CardContent>
              </Card>
            </Grid>


            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de Pessoas
                  </Typography>
                  <Box padding={1} display='flex' justifyContent='center' alignItems='center'>
                  {loadingPeople 
                      ? 
                        <Typography variant='h1'>
                          <CircularProgress />
                        </Typography>
                      :
                        <Typography variant='h1'>
                          {peopleTotalCount}
                        </Typography>
                    }
                  </Box>
                </CardContent>
              </Card>
            </Grid>

          </Grid>
        </Grid>
      </Box>
    </LayoutPageBase>
  );
}
